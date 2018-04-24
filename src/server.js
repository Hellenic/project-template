import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { render } from '@jaredpalmer/after';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Document from './Document';
import { IntlProvider, addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import enMessages from './i18n/en.json';
import routes from './routes';

addLocaleData(enLocaleData);
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server.use(compression());
server.use(helmet());
server.disable('x-powered-by');
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

server.get('/*', async (req, res) => {
  try {
    const customRenderer = node => {
      const appNode = (
        <IntlProvider locale="en" messages={enMessages}>
          {node}
        </IntlProvider>
      );
      const html = renderToString(appNode);
      return { html };
    };
    const html = await render({
      req,
      res,
      document: Document,
      routes,
      assets,
      customRenderer,
      // Anything else you add here will be made available
      // within getInitialProps(ctx)
      // e.g a redux store...
      customThing: 'thing'
    });
    res.send(html);
  } catch (error) {
    console.error('Error occurred on server-rendering', error);
    res.status(500).json({
      message: 'Error occurred. See server log for details.',
      error
    });
  }
});

export default server;
