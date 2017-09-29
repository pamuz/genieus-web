/* 
 * This is the routes file. It exports an array of objects, each 
 * of which contains properties that describe a route. For each
 * of the objects in the routes array the `body` property is of
 * particular importance, it is a function that returns the class
 * of a React.Component, the component returned by that function
 * will be the one rendered when the browser is on that route.
 * 
 * For more information of what the elements do visit the 
 * curi documentation.
 */

import Home from "./components/page/Home.jsx";
import Quiz from "./components/page/Quiz.jsx";
import Collection from "./components/page/Collection.jsx";
import Deck from "./components/page/Deck.jsx";

import { store, getJSONWebToken } from "./store/index.js";
import { initiateQuiz } from "./store/actions/quiz.js";
import { getAllDecksAttempt } from "./store/actions/collection.js";
import { getDeckDetailAttempt, } from "./store/actions/deck-detail.js";

const routes = [
  {
    name: "Home",
    path: "", // matches /
    body: () => Home
  },
  {
    name: "Quiz",
    path: "quiz",
    body: () => Quiz,
    load: (params, modifiers) => {
      return store.dispatch(initiateQuiz(getJSONWebToken()));
    }
  },
  {
    name: "Collection",
    path: "collection",
    body: () => Collection,
    load: (params, modifiers) => {
      return store.dispatch(getAllDecksAttempt(getJSONWebToken()));
    }
  },
  {
    name: "Deck",
    path: "deck/:deckId",
    body: () => Deck,
    load: (params, modifiers) => {
      return store.dispatch(getDeckDetailAttempt(getJSONWebToken(), params.deckId));
    }
  }
];

export {
  routes,
};
