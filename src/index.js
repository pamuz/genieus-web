/*
 * This is the main script of the SPA. It is the entrypoint to the
 * app and mainly deals with setting up a <Navigator> component (which
 * comes from * the curi routing library). The <Navigator> comopnent
 * knows about each route * because it is fed the `config` variable,
 * which in turn is created from the * array of routes defined in the
 * routes.jsx file. The <Navigator> component is told to render whatever
 * component class the current route has in it's `body` property.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createConfig from 'curi';
import { Navigator, Link } from '@curi/react';
import { Browser } from 'hickory';
import { routes } from './routes.jsx';
import { store } from './store/index.js';
import Navbar from './components/nav/Navbar.jsx'
import createQueryMiddleware from 'curi-middleware-query';
import { parse, stringify } from 'qs';

const queryMiddleware = createQueryMiddleware(parse);

const browserHistory = Browser({
  query: { parse, stringify }
});
const config = createConfig(browserHistory, routes, {
  middleware: [queryMiddleware]
});

ReactDOM.render((
  <Provider store={store}>
    <Navigator
      config={config}
      render={(response, config) => {
          if (!response) {
            return (
              <div>
                <Navbar />
                <p>404</p>
              </div>
            );
          }

          const { location, params } = response;
          return response.body
               ? (<div className="container"><Navbar /><response.body params={params} history={config.history} location={location} /></div>)
               : <p>404</p>;
      }}>
    </Navigator>
  </Provider>
), document.getElementById('root'));
