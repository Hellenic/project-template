import React from "react";
import { ServerStyleSheet } from "styled-components";
import { AfterRoot, AfterData, AfterScripts } from "@jaredpalmer/after";
import serialize from "serialize-javascript";
import theme from "./theme";

export default class Document extends React.Component {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = await renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    const { helmet, initialAppData, styleTags } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content={theme.colors.primary} />

          {helmet.base.toComponent()}
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}

          <style>
            {`
              body {
                margin: 0;
                padding: 0;
                font-family: Roboto, sans-serif;
              }
            `}
          </style>
          {styleTags}
          {/*
            This can be used to Polyfill Intl on browsers to support Internationalization. Only needed on older browsers.
            See more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Browser_compatibility
            <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en,Intl.~locale.fi" />
          */}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData />
          <AfterScripts />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_APP_DATA=${serialize(initialAppData)};`,
            }}
            charSet="UTF-8"
          />
        </body>
      </html>
    );
  }
}
