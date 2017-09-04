export const QUIZ_INITIATED = 'QUIZ_INITIATED';
export const QUIZ_INITIATED_SUCCESS = 'QUIZ_INITIATED_SUCCESS';
export const QUIZ_INITIATED_FAILURE = 'QUIZ_INITIATED_ERROR';
export const RATE_FLASCHARD_REVIEW = 'RATE_FLASCHARD_REVIEW';

export function initiateQuiz(token) {
  return dispatch => {
    dispatch({
      type: QUIZ_INITIATED
    });

    $.ajax('http://localhost:5000/api/v0/flashcard', {
      method: 'GET',
      beforeSend: request => {
        request.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done((response, status, xhr) => {
      dispatch(initiateQuizSuccess(response));
    }).fail((xhr, status, error) => {
      dispatch(initiateQuizFailure(error));
    });
  }
}

function initiateQuizSuccess(response) {
  return {
    'type': QUIZ_INITIATED_SUCCESS,
    'flashcardsToShowInQuiz': response.data
  };
}

function initiateQuizFailure(error) {
  return {
    'type': QUIZ_INITIATED_FAILURE,
    'reasons': error
  };
}

export function rateFlashcardReview() {
  return {
    'type': RATE_FLASCHARD_REVIEW,
  };
}
