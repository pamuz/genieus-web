/*
 * The <Quiz> page component is the page where users go to take be quizzed on
 * a preselected set of Cards.
 */

import React from 'react';

import { connect } from 'react-redux';

import Card from '../reusable/Card.jsx';
import Button from '../reusable/Button.jsx';

export class _Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFlashcardVisibleSide: 'front'
    };
  }

  /* 
   * The render method has two possible things it can render. If 
   * `state.isFinished` is true it means that the user has gone through 
   * all the cards in the quiz, and so, a message is displayed to indicate this.  
   * In the future we will want to display links to other suggested quizzes. 
   * The other thing render can display is a card.   
   */
  render() {
    const {
      flashcards,
      currentFlashcardIndex,
      isFinished
    } = this.props;

    const {
      currentFlashcardVisibleSide
    } = this.state;

    if (flashcards.length && !isFinished) {
      const flashcardBeingDisplayed = flashcards[currentFlashcardIndex];
      const textBeingDisplayed = (
        flashcardBeingDisplayed.attributes[currentFlashcardVisibleSide].text);

      return <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <Card>
                <Card.Body style={{ minHeight: 150 }}>
                  <Card.Text className="text-center" style={{ marginTop: "50px" }}>
                    {textBeingDisplayed}
                  </Card.Text>
                </Card.Body>
              </Card>
              <div className="text-center" style={{ marginTop: "40px" }}>
                <Button bsStyle="default mr-3" style={{ padding: "10px 20px" }} onClick={() => this.flipCard()}>
                  Flip
                </Button>
                <Button bsStyle="danger mr-3" style={{ padding: "10px 30px" }} onClick={() => this.rateCard()}>
                  :(
                </Button>
                <Button bsStyle="primary mr-3" style={{ padding: "10px 30px" }} onClick={() => this.rateCard()}>
                  -.-
                </Button>
                <Button bsStyle="success mr-3" style={{ padding: "10px 30px" }} onClick={() => this.rateCard()}>
                  :)
                </Button>
              </div>
            </div>
          </div>
        </div>;
    } else if(isFinished) {
      return (
        <div className="gn-quiz-page">
          <div className="gn-quiz-container text-center">
            <p>You've completed this quiz.</p>
          </div>
        </div>
      );
    }

    return null;
  }

  flipCard() {
    const nextSide = this.state.currentFlashcardVisibleSide === 'front'
                   ? 'back' : 'front';
    this.setState({
      currentFlashcardVisibleSide: nextSide
    });
  }

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
      dispatch({
        type: 'RATE_FLASHCARD_REVIEW'
      });
    }
  }
};

const Quiz = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Quiz);

export default Quiz;
