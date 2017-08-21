/* 
 * This is the routes file. It exports an array of objects, each 
 * of which contains properties that describe a route. For each
 * of the objects in the routes array the `body` property is of
 * particular importance, it is a function that returns the class
 * of a React.Component, whenver the SPA is in the route indicated
 * by the `path` property that component will be rendered.
 */

import Home from './components/page/Home.jsx';
import Login from './components/page/Login.jsx';

const routes = [
  {
    name: 'Home',
    path: '', // matches /
    body: () => Home
  },
  {
    name: 'Login',
    path: 'login',
    body: () => Login
  }
];

export {
  routes,
};
