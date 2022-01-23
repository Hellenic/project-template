import express from "express";
import compression from "compression";
import helmet from "helmet";
import React from "react";
import { render } from "@jaredpalmer/after";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import Document from "./Document";
import App from "./App";
import { determineLocale, getLocaleMessages } from "./utils/locale";
import routes from "./routes";
import theme from "./theme";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST);
const scrollToTop = false;
const isProduction = process.env.NODE_ENV !== "development";

const server = express();
server.disable("x-powered-by");
server.use(compression());
server.use(
  helmet({
    contentSecurityPolicy: false, // TODO Configure CSP
    crossOriginEmbedderPolicy: isProduction,
    crossOriginResourcePolicy: { policy: "same-site" },
  })
);
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

// NOTE Add / load static data here. This will be passed to the application
// e.g. a header and footer from CMS could be loaded here
const initialAppData = { hello: "world!" };

server.get("/*", async (req, res) => {
  try {
    const localeCode = determineLocale(req, res);
    if (!localeCode) {
      return;
    }
    // TODO Might need to add polyfill on server-side to have locale data present
    const messages = getLocaleMessages(localeCode);

    const context = {};
    const isFrontpage = req.url === `/${localeCode}/`;
    // Pass all initial data here
    // Note, that we pass it to our App here (for server-side render)
    // And also to the Document, where client will pick it up
    const customRenderer = (node) => {
      const appNode = (
        <IntlProvider locale={localeCode} messages={messages}>
          <ThemeProvider theme={theme}>
            <StaticRouter location={req.url} context={context}>
              <App
                appData={initialAppData}
                localeCode={localeCode}
                isFrontpage={isFrontpage}
              >
                {node}
              </App>
            </StaticRouter>
          </ThemeProvider>
        </IntlProvider>
      );
      const html = renderToString(appNode);
      return { html, initialAppData };
    };

    const html = await render({
      req,
      res,
      routes,
      assets,
      chunks,
      customRenderer,
      document: Document,
      scrollToTop,
      // Anything else you add here will be made available
      // within getInitialProps(ctx)
      // e.g a redux store...
      customThing: "thing",
    });

    res.send(html);
  } catch (error) {
    console.error("Error occurred on server-rendering", error);
    res.status(500).json({
      message: "Error occurred. See server log for details.",
      error,
    });
  }
});

export default server;
