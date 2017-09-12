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

const browserHistory = Browser();
const config = createConfig(browserHistory, routes);

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
          return response.body
               ? (<div className="container"><Navbar /><response.body /></div>)
               : <p>404</p>;
      }}>
    </Navigator>
  </Provider>
), document.getElementById('root'));
