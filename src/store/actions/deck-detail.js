import { getJSONWebToken } from "../index.js";
import { createAttemptActionSet } from "../utils.js";

export const GET_DECK_DETAIL_INITIATED = "GET_DECK_DETAIL_INITIATED";
export const GET_DECK_DETAIL_SUCCESS = "GET_DECK_DETAIL_SUCCESS";
export const GET_DECK_DETAIL_FAILURE = "GET_DECK_DETAIL_FAILURE";

export const CREATE_FLASHCARD_INITIATED = "CREATE_FLASHCARD_INITIATED";
export const CREATE_FLASHCARD_SUCCESS = "CREATE_FLASHCARD_SUCCESS";
export const CREATE_FLASHCARD_FAILURE = "CREATE_FLASHCARD_FAILURE";

export const DELETE_FLASHCARD_INITIATED = "DELETE_FLASHCARD_INITIATED";
export const DELETE_FLASHCARD_SUCCESS = "DELETE_FLASHCARD_SUCCESS";
export const DELETE_FLASHCARD_FAILURE = "DELETE_FLASHCARD_FAILURE";

export const UPDATE_FLASHCARD_INITIATED = "UPDATE_FLASHCARD_INITIATED";
export const UPDATE_FLASHCARD_SUCCESS = "UPDATE_FLASHCARD_SUCCESS";
export const UPDATE_FLASHCARD_FAILURE = "UPDATE_FLASHCARD_FAILURE";


export const [
  getDeckDetailInitiated,
  getDeckDetailSuccess,
  getDeckDetailFailure
] = createAttemptActionSet([
  GET_DECK_DETAIL_INITIATED,
  GET_DECK_DETAIL_SUCCESS,
  GET_DECK_DETAIL_FAILURE
]);

export function getDeckDetailAttempt(jsonWebToken, deckId) {
  return dispatch => {
    dispatch(getDeckDetailInitiated());

    $.ajax({
      method: "GET",
      url: `http://ec2-34-216-13-174.us-west-2.compute.amazonaws.com:5000/api/v0/deck/${deckId}?include=flashcard`,
      beforeSend: request => {
        request.setRequestHeader("Authorization", "Bearer " + jsonWebToken);
      }
    }).done((response, status, xhr) => {
      dispatch(getDeckDetailSuccess(response));
    }).fail((xhr, status, error) => {
      dispatch(getDeckDetailFailure(error));
    });
  }
}

export const [
  createFlashcardInitiated,
  createFlashcardSuccess,
  createFlashcardFailure
] = createAttemptActionSet([
  CREATE_FLASHCARD_INITIATED,
  CREATE_FLASHCARD_SUCCESS,
  CREATE_FLASHCARD_FAILURE
]);

export function createFlashcardAttempt(attributes) {
  return dispatch => {
    dispatch(createFlashcardInitiated());

    $.ajax({
      method: "POST",
      url: "http://ec2-34-216-13-174.us-west-2.compute.amazonaws.com:5000/api/v0/flashcard",
      contentType: "application/json",
      data: JSON.stringify({
        "data": {
          "type": "flashcard",
          "attributes": attributes
        }
      }),
      beforeSend: request => {
        request.setRequestHeader("Authorization", "Bearer " + getJSONWebToken());
      }
    }).done((response, status, xhr) => {
      dispatch(createFlashcardSuccess(response));
    }).fail((xhr, status, error) => {
      console.error(error);
      dispatch(createFlashcardFailure(error));
    });
  };
}

export const [
  deleteFlashcardInitiated,
  deleteFlashcardSuccess,
  deleteFlashcardFailure
] = createAttemptActionSet([
  DELETE_FLASHCARD_INITIATED,
  DELETE_FLASHCARD_SUCCESS,
  DELETE_FLASHCARD_FAILURE
]);

export function deleteFlashcardAttempt(flashcardData) {
  return dispatch => {
    dispatch(deleteFlashcardInitiated());

    const flashcardId = flashcardData.id;

    $.ajax({
      method: "DELETE",
      url: `http://ec2-34-216-13-174.us-west-2.compute.amazonaws.com:5000/api/v0/flashcard/${flashcardId}`,
      beforeSend: request => {
        request.setRequestHeader("Authorization", "Bearer " + getJSONWebToken());
      }
    }).done((response, status, xhr) => {
      dispatch(deleteFlashcardSuccess({ "id": flashcardId }));
    }).fail((xhr, status, error) => {
      console.error(error);
      dispatch(deleteFlashcardFailure(error));
    });
  };
}

export const [
  updateFlashcardInitiated,
  updateFlashcardSuccess,
  updateFlashcardFailure
] = createAttemptActionSet([
  UPDATE_FLASHCARD_INITIATED,
  UPDATE_FLASHCARD_SUCCESS,
  UPDATE_FLASHCARD_FAILURE
]);

export function updateFlashcardAttempt(attributes) {
  return dispatch => {
    dispatch(updateFlashcardInitiated());

    const flashcardId = attributes.id;

    $.ajax({
      method: "PUT",
      url: `http://ec2-34-216-13-174.us-west-2.compute.amazonaws.com:5000/api/v0/flashcard/${flashcardId}`,
      contentType: 'application/json',
      data: JSON.stringify({
        "data": {
          "id": flashcardId,
          "type": "flashcard",
          "attributes": _.omit(attributes, 'id')
        }
      }),
      beforeSend: request => {
        request.setRequestHeader("Authorization", "Bearer " + getJSONWebToken());
      }
    }).done((response, status, xhr) => {
      dispatch(updateFlashcardSuccess(response));
    }).fail((xhr, status, error) => {
      console.error(error);
      dispatch(updateFlashcardFailure(error));
    });
  };
}
