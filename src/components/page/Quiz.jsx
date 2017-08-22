/*
 * The <Quiz> page component is the page where users go to take be quizzed on
 * a preselected set of Cards.
 */

import React from 'react';

import { connect } from 'react-redux';

import Card from '../property/Card.jsx';

export class _Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinished: false,
      // All this is dummy data for now
      currentCardId: 0, // Right now, for this dummy data, the id is the index
      cards: [
        {
          promptContent: "What is the capital of USA?",
          answerContent: "Washington D.C."
        },
        {
          promptContent: "What is the capital of France?",
          answerContent: "Paris"
        },
        {
          promptContent: "What is the capital of Japan?",
          answerContent: "Tokyo"
        }
      ]
    };
  }

  /* 
   * The render method has two possible things it can render. If 
   * `state.isFinished` is true it means that the user has gone through 
   * all the cards in the quiz, and so, a message is displayed to indicate this.  
   * In the future we will want to display links to other suggested quizzes. 
   * The other thing render can display is a card. This is based on
   * `state.currentCardId`.
   */
  render() {
    const { cards, currentCardId, isFinished } = this.state;
    const cardBeingDisplayed = cards[currentCardId];

    return (
      <div className="gn-quiz-page">
        <div className="gn-quiz-container">
          { isFinished
            ?
            <p>You're done, interested in a new quiz?</p>
            :
            <div>
              <Card
                key={ currentCardId } // Key is being used to trigger re-init on change
                ref={ (card) => this.card = card }
                { ... cardBeingDisplayed } />
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
  }

  /* 
   * Call onto the flip public method of the Card component that is currently
   * being displayed.
   */
  flipCard() {
    this.card.flip();
  }

  /*
   * Check if the user is at the last card that the quiz contains, in which case
   * sets `state.isFinished` to true, otherwise, calculates the id of the card
   * that should be displayed next to the current one and sets it in the state.
   */
  advanceCard() {
    const { currentCardId, cards } = this.state;
    const allCardsWereRated = currentCardId === cards.length - 1;

    if (allCardsWereRated) {
      this.setState({
        isFinished: true
      });
    } else {
      const nextCardId = currentCardId + 1;
      this.setState({
        currentCardId: nextCardId
      });
    }

  }

  /*
   * In the future this will make an API call to notify the server that a card
   * was reviewed, and with what performance. Then it will advance the card.
   */
  rateCard() {
    this.advanceCard();
  }

}

export default _Quiz;
