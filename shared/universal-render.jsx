/* eslint react/display-name: 0 */

import Iso from 'iso';
import React from 'react';
import debug from 'debug';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import Router, { RoutingContext, match } from 'react-router';
import AltContainer from 'alt-container';

import intlLoader from 'utils/intl-loader';
import ErrorPage from 'pages/server-error';

const { BROWSER, NODE_ENV } = process.env;

const runRouter = (location, routes) =>
  new Promise((resolve) =>
    match({ routes, location }, (...args) => resolve(args)));

const bootstrap = () =>
  new Promise((resolve) =>
    Iso.bootstrap((initialState, __, container) =>
      resolve({ initialState, __, container })));

export default async function({ flux, history, location }) {
  if (BROWSER) {
    if (NODE_ENV === 'development') require('alt/utils/chromeDebug')(flux);

    const { container, initialState } = await bootstrap();
    flux.bootstrap(initialState);

    // load the intl-polyfill if needed
    // load the correct data/{lang}.json into app
    const { locales: [ locale ] } = flux.getStore('locale').getState();
    const { messages } = await intlLoader(locale);
    flux.getActions('locale').switchLocaleSuccess({ locale, messages });

    const routes = require('routes');

    const element = (
      <AltContainer flux={ flux }>
        <Router
          history={ history }
          routes={ routes } />
      </AltContainer>
    );

    // Render element in the same container as the SSR
    render(element, container);

    // Tell `alt-resolver` we have done the first render
    // next promises will be resolved
    flux.resolver.firstRender = false;
  } else {
    const routes = require('routes');
    const [ error, redirect, renderProps ] = await runRouter(location, routes);

    if (error || redirect) throw ({ error, redirect });

    const element = (
      <AltContainer flux={ flux }>
        <RoutingContext { ...renderProps } />
      </AltContainer>
    );

    let app;
    let fluxSnapshot;
    try {
      // Collect promises with a first render
      debug('dev')('first server render');
      renderToString(element);

      // Resolve them
      await flux.resolver.dispatchPendingActions();

      debug('dev')('second server render');

      fluxSnapshot = flux.takeSnapshot();
      app = renderToString(element);
    } catch (renderErr) {
      // Catch rendering error, render a 500 page
      debug('koa')('rendering error');
      debug('koa')(renderErr);

      fluxSnapshot = flux.takeSnapshot();
      app = renderToString(<ErrorPage />);
    }

    const { title } = flux.getStore('title').getState();
    return { body: Iso.render(app, fluxSnapshot), title };
  }
}
