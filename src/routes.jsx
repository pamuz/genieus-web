/* 
 * This is the routes file. It exports an array of objects, each 
 * of which contains properties that describe a route. For each
 * of the objects in the routes array the `body` property is of
 * particular importance, it is a function that returns the class
 * of a React.Component, the component returned by that function
 * will be the one rendered when the browser is on that route.
 */

import Home from './components/page/Home.jsx';
import Login from './components/page/Login.jsx';
import Quiz from './components/page/Quiz.jsx';

import { store, getJSONWebToken } from './store/index.js';
import { initiateQuiz } from './store/actions/quiz.js';

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
  },
  {
    name: 'Quiz',
    path: 'quiz',
    body: () => Quiz,
    load: (params, modifiers) => {
      return store.dispatch(initiateQuiz(getJSONWebToken()));
    }
  },
];

export {
  routes,
};
