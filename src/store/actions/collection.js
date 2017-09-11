import { getJSONWebToken } from "../index.js";

export const GET_ALL_DECKS_INITIATED = "GET_ALL_DECKS_ATTEMPT";
export const GET_ALL_DECKS_SUCCESS = "GET_ALL_DECKS_SUCCESS";
export const GET_ALL_DECKS_FAILURE = "GET_ALL_DECKS_FAILURE";
export const CREATE_DECK_INITIATED = "CREATE_DECK_INITIATED";
export const CREATE_DECK_SUCCESS = "CREATE_DECK_SUCCESS";
export const CREATE_DECK_FAILURE = "CREATE_DECK_FAILURE";
export const DELETE_DECK_INITIATED = "DELETE_DECK_INITIATED";
export const DELETE_DECK_SUCCESS = "DELETE_DECK_INITIATED";
export const DELETE_DECK_FAILURE = "DELETE_DECK_INITIATED";

export function getAllDecksSuccess(decksData) {
  return {
    type: GET_ALL_DECKS_SUCCESS,
    payload: decksData 
  };
}

export function getAllDecksFailure(error) {
  return {
    type: GET_ALL_DECKS_FAILURE
  };
}

export function getAllDecksInitiated() {
  return {
    type: GET_ALL_DECKS_INITIATED
  };
}

export function getAllDecksAttempt(jsonWebToken) {
  return dispatch => {
    dispatch(getAllDecksInitiated());

    $.ajax({
      method: "GET",
      url: "http://localhost:5000/api/v0/deck",
      beforeSend: request => {
        request.setRequestHeader("Authorization", "Bearer " + jsonWebToken);
      }
    }).done((response, status, xhr) => {
      dispatch(getAllDecksSuccess(response.data));
    }).fail((xhr, status, error) => {
      dispatch(getAllDecksFailure(error));
    });
  }
}

export function createDeckInitiated() {
  return {
    type: CREATE_DECK_INITIATED
  };
}

export function createDeckSuccess(payload) {
  return {
    type: CREATE_DECK_SUCCESS,
    payload: payload
  };
}

export function createDeckFailure(error) {
  return {
    type: CREATE_DECK_FAILURE,
    error: error
  };
}

export function createDeckAttempt(attributes) {
  return dispatch => {
    dispatch(createDeckInitiated());

    $.ajax({
      method: "POST",
      url: "http://localhost:5000/api/v0/deck",
      contentType: "application/json",
      data: JSON.stringify({
        "data": {
          "type": "deck",
          "attributes": attributes
        }
      }),
      beforeSend: request => {
        request.setRequestHeader("Authorization", "Bearer " + getJSONWebToken());
      }
    }).done((response, status, xhr) => {
      dispatch(createDeckSuccess(response.data));
    }).fail((xhr, status, error) => {
      console.error(error);
      dispatch(createDeckFailure(error));
    });
  };
}

function createAttemptActionSet(actionTypeList) {
  return {
    "initiated": () => {
      return {
        "type": actionTypeList[0]
      };
    },
    "success": (payload) => {
      return {
        "type": actionTypeList[1],
        "payload": payload
      };
    },
    "failure": (error) => {
      return {
        "type": actionTypeList[2],
        "error": error
      };
    }
  };
}

const deleteActionSet = createAttemptActionSet(
  [DELETE_DECK_INITIATED, DELETE_DECK_SUCCESS, DELETE_DECK_FAILURE]);

export const deleteDeckInitiated = deleteActionSet.initiated;
export const deleteDeckSuccess = deleteActionSet.success;
export const deleteDeckFailure = deleteActionSet.failure;

export function deleteDeckAttempt(deckId) {
  return dispatch => {
    dispatch(deleteDeckInitiated);

    $.ajax({
      method: 'DELETE',
      url: `http://localhost:5000/api/v0/deck/${deckId}`,
      beforeSend: request => {
        request.setRequestHeader("Authorization", "Bearer " + getJSONWebToken())
      }
    }).done((response, status, xhr) => {
      dispatch(deleteDeckSuccess(deckId));
    }).fail((error, status, xhr) => {
      console.error(error);
      dispatch(deleteDeckFailure(error));
    });
  };
}
