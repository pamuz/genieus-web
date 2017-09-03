/*
 * The <Quiz> page component is the page where users go to take be quizzed on
 * a preselected set of Cards.
 */

import React from 'react';

import { connect } from 'react-redux';

import Card from '../property/Card.jsx';

import { rateFlashcardReview } from '../../store/actions/quiz.js'

export class _Quiz extends React.Component {
  constructor(props) {
    super(props);
  }

  /* 
   * The render method has two possible things it can render. If 
   * `state.isFinished` is true it means that the user has gone through 
   * all the cards in the quiz, and so, a message is displayed to indicate this.  
   * In the future we will want to display links to other suggested quizzes. 
   * The other thing render can display is a card.   
   */
  render() {
    const { flashcards, currentFlashcardIndex, isFinished } = this.props;
    const cardBeingDisplayed = flashcards[currentFlashcardIndex];
    console.log(cardBeingDisplayed);

    if (flashcards.length) {
      return (
        <div className="gn-quiz-page">
          <div className="gn-quiz-container">
            { isFinished
              ?
              <p>You're done, interested in a new quiz?</p>
              :
              <div>
                <Card
                  key={ currentFlashcardIndex } // Key is being used to trigger re-init on change
                  ref={ (card) => this.card = card }
                  flashcardData={ cardBeingDisplayed } />
                <button onClick={ () => this.flipCard() }>Flip</button>
                <button
                  className="gn-rate-bad"
                  onClick={ () => this.rateCard() }>&#9785;</button>
                  <button
                    className="gn-rate-neutral"
                    onClick={ () => this.rateCard() }>-.-</button>
                  <button
                    className="gn-rate-happy"
                    onClick={ () => this.rateCard() }>&#9786;</button>
              </div>
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className="gn-quiz-page">
          <div className="gn-quiz-container">
            <p>There doesn't seem to be any flashcards in this quiz.</p>
          </div>
        </div>
      );
    }
  }

  /* 
   * Call onto the flip public method of the Card component that is currently
   * being displayed.
   */
  flipCard() {
    this.card.flip();
  }

  /*
   * In the future this will make an API call to notify the server that a card
   * was reviewed, and with what performance. Then it will advance the card.
   */
  rateCard() {
    this.props.rateFlashcardReview();
  }

}

const mapStateToProps = state => {
  return state.quiz;
};

const mapDispatchToProps = dispatch => {
  return {
    rateFlashcardReview: () => {
      // TODO dispatch should send the numeric value of the review score
      dispatch(rateFlashcardReview());
    }
  }
};

const Quiz = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Quiz);

export default Quiz;
