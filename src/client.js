import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ensureReady, After } from "@jaredpalmer/after";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { determineClientLocale, getLocaleMessages } from "./utils/locale";
import registerServiceWorker from "./utils/service-worker";
import routes from "./routes";
import theme from "./theme";

const localeCode = determineClientLocale();
const messages = getLocaleMessages(localeCode);

// Register the service worker for cache and offline functionality
if (process.env.NODE_ENV !== "development") {
  registerServiceWorker({ localeCode });
}

const appData = window.__INITIAL_APP_DATA || {};

ensureReady(routes).then((data) => {
  return hydrate(
    <IntlProvider locale={localeCode} messages={messages}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App appData={appData} localeCode={localeCode}>
            <After data={data} routes={routes} />
          </App>
        </BrowserRouter>
      </ThemeProvider>
    </IntlProvider>,
    document.getElementById("root")
  );
});

if (module.hot) {
  module.hot.accept();
}
