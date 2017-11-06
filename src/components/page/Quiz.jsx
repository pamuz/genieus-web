/*
 * The <Quiz> page component is the page where users go to take be quizzed on
 * a preselected set of Cards.
 */

import React from 'react';

import { connect } from 'react-redux';

import Panel from '../reusable/Panel.jsx';
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
            <Panel>
              <Panel.Body id="flashcard-body"
                          ref={ elem => this.panelBody = elem }
                          style={{ minHeight: 150, fontSize: '20px' }}>
                { textBeingDisplayed }
              </Panel.Body>
              <Panel.Footer>
                <div className="text-center">
                  <div className="btn-group">
                    <Button bsStyle="white" onClick={() => this.flipCard()}>
                      <span className="fa fa-refresh"></span>&nbsp;Flip
                    </Button>
                    <Button bsStyle="white" onClick={() => this.rateCard()}>
                      <span className="fa fa-frown-o text-danger"
                            style={{ fontSize: '1.25em' }}></span>
                    </Button>
                    <Button bsStyle="white" onClick={() => this.rateCard()}>
                      <span className="fa fa-meh-o text-info"
                            style={{ fontSize: '1.25em' }}></span>
                    </Button>
                    <Button bsStyle="white" onClick={() => this.rateCard()}>
                      <span className="fa fa-smile-o text-success"
                            style={{ fontSize: '1.25em' }}></span>
                    </Button>
                  </div>
                </div>
              </Panel.Footer>
            </Panel>
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

  componentDidUpdate() {
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

      if (flashcardBeingDisplayed.attributes.type === 'math') {
        katex.render($('#flashcard-body').text(), document.getElementById('flashcard-body'), {
          displayMode: true
        });
      }
    }
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
    this.setState({
      currentFlashcardVisibleSide: 'front'
    });
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
