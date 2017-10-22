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
import Community from "./components/page/Community.jsx";

import { store } from "./store/index.js";

import { initiateQuiz } from "./store/actions/quiz.js";
import { getAllDecksAttempt } from "./store/actions/collection.js";
import { getDeckDetailAttempt, } from "./store/actions/deck-detail.js";

import { action } from "./store/actions/api.js";

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const routes = [
  {
    name: "Home",
    path: "", // matches /
    body: () => Home
  },
  {
    name: "QuizOfDeck",
    path: "quiz/:id",
    body: () => Quiz,
    load: (params, modifiers) => {
      const id = params.id;

      return store.dispatch(action('attemptRetrieveQuizOfDeckFlashcards')({
        pathSubstitutions: {
          id,
        }
      }));
    }
  },
  {
    name: "Quiz",
    path: "quiz",
    body: () => Quiz,
    load: (params, modifiers) => {
      return store.dispatch(action('attemptRetrieveQuizFlashcards')({
        pathSubstitutions: {
          id: '88d3fc06-ef4d-42c1-b78f-56e28b125b79',
        }
      }));
    }
  },
  {
    name: "Collection",
    path: "collection",
    body: () => Collection,
    load: (params, modifiers) => {
      console.log(action);
      return store.dispatch(action('attemptListDecks')({}));
    }
  },
  {
    name: "Deck",
    path: "deck/:deckId",
    body: () => Deck,
    load: (params, modifiers) => {
      return store.dispatch(action('attemptRetrieveDeck')({
        pathSubstitutions: {
          id: params.deckId
        },
        query: {
          include: 'flashcard'
        }
      }));
    }
  },
  {
    name: "Community",
    path: "community",
    body: () => Community,
    load: (params, modifiers) => {
      const q = getParameterByName('q');
      console.log('q: ' + q);

      return store.dispatch(action('attemptSearchPublicDecks')({
        query: {
          q
        }
      }));
    }
  }
];

export {
  routes,
};
