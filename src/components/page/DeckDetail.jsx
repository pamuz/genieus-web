/*
 * The Deck component 
 */

import _ from 'lodash';
import React from 'react';

import { connect } from 'react-redux';
import { action } from '../../store/actions/api.js';
import Card from '../reusable/Card.jsx';
import Panel from '../reusable/Panel.jsx';
import Button from '../reusable/Button.jsx';

const SPECIAL_NEW_FLASHCARD_ID = 'special';

const API_ACTIONS = [
  'attemptCreateFlashcard',
  'attemptDeleteFlashcard',
  'attemptPatchFlashcard'
];

export class _Deck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onEditorSaveAction: this.onEditorModalSaveCreate,
      idOfFlashcardBeingEdited: undefined
    }
  }

  componentDidMount(){
    document.addEventListener("keydown",
                              this.clearFlashcardBeingEdited.bind(this),
                              false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown",
                                 this.clearFlashcardBeingEdited.bind(this),
                                 false);
  }

  render() {
    const {
      isFetching,
      isInError,
      error,
      deck,
      flashcards
    } = this.props;

    if (isFetching || deck === undefined) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <div>
        <h1 style={{ color: deck.attributes.color }}>{ deck.attributes.name }</h1>
        { flashcards.map(this.renderFlashcard.bind(this)) }

        {/* A special "flashcard" that can be used to create new flashcards */}
        { this.renderSpecialCreateFlashcard() }
      </div>
    );
  }

  attemptCreateFlashcard() {
    const attributes = {
      "deck_id": this.props.deck.id,
      "type": "text",
      "front": {
        "text": this.flashcardBeingEditedFrontTextarea.value
      },
      "back": {
        "text": this.flashcardBeingEditedBackTextarea.value
      }
    };

    this.props.attemptCreateFlashcard({
      pathSubstitutions: {
        id: this.props.deck.id
      },
      payload: {
        data: {
          type: 'flashcard',
          attributes,
        }
      }
    });
    $(this.editorModal).modal('hide');
  }

  attemptPatchFlashcard(flashcard) {
    const attributes = {
      "deck_id": this.props.deck.id,
      "type": "text",
      "front": {
        "text": this.flashcardBeingEditedFrontTextarea.value
      },
      "back": {
        "text": this.flashcardBeingEditedBackTextarea.value
      }
    };

    this.props.attemptPatchFlashcard({
      pathSubstitutions: {
        id: flashcard.id
      },
      payload: {
        data: {
          type: 'flashcard',
          attributes
        }
      }
    });
    $(this.editorModal).modal('hide');
  }

  // Renders a flashcard inside a card element. If the flashcard
  // is currently being edited, e.g. this.state.idOfFlashcardBeingEdited
  // === flashcard.id, the front and back text are shown in textareas
  // instead.
  renderFlashcard(flashcard) {
    const isBeingEdited = this.state.idOfFlashcardBeingEdited === flashcard.id;

    const firstButtonAction = (
      isBeingEdited
      ? () => this.attemptPatchFlashcard(flashcard)
          : () => this.setState({ idOfFlashcardBeingEdited: flashcard.id })
    );

    const frontText = flashcard.attributes.front.text;
    const backText = flashcard.attributes.back.text;

    return (
      <div className="row" key={ flashcard.id } style={{}}>
        <div className="col-md-4">
          <Panel>
            <Panel.Body>
              { isBeingEdited
                ? <textarea
                    className="form-control" rows="2"
                    ref={ textarea =>
                      this.flashcardBeingEditedFrontTextarea = textarea }
                    defaultValue={ frontText }></textarea>
                : frontText }
            </Panel.Body>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel>
            <Panel.Body>
              { isBeingEdited
                ? <textarea
                    className="form-control" rows="2"
                    ref={ textarea =>
                      this.flashcardBeingEditedBackTextarea = textarea }
                    defaultValue={ backText }></textarea>
                : backText }
            </Panel.Body>
          </Panel>
        </div>
        <div className="btn-group col-md-2">
          <Button
            bsStyle="white"
            onClick={ firstButtonAction }>
            { isBeingEdited ? <span className="fa fa-save"></span> : <span className="fa fa-edit"></span> }
          </Button>
          <Button
            bsStyle="danger"
            onClick={
            () => {
              this.props.attemptDeleteFlashcard({
                pathSubstitutions: { id: flashcard.id }
              })}}>
            <span className="fa fa-trash-o"></span>
          </Button>
        </div>
      </div>
    );
  }

  renderSpecialCreateFlashcard() {
    const isBeingEdited = (this.state.idOfFlashcardBeingEdited
      === SPECIAL_NEW_FLASHCARD_ID);

    const firstButtonAction = (
      isBeingEdited
      ? this.attemptCreateFlashcard.bind(this)
      : () => this.setState({ idOfFlashcardBeingEdited: SPECIAL_NEW_FLASHCARD_ID })
    );

    return (
      <div className="row justify-content-around" style={{ marginTop: 15 }}>
        <div className="col-md-4">
          <Panel>
            <Panel.Body>
              { isBeingEdited
                ? <textarea
                    className="form-control" rows="2"
                    ref={ textarea =>
                      this.flashcardBeingEditedFrontTextarea = textarea } >
                </textarea>
                : 'Front' }
            </Panel.Body>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel>
            <Panel.Body>
              { isBeingEdited
                ? <textarea
                    className="form-control" rows="2"
                    ref={ textarea =>
                      this.flashcardBeingEditedBackTextarea = textarea } >
                </textarea>
                : 'Back' }
            </Panel.Body>
          </Panel>
        </div>
        <div className="col-md-2">
          <Button
            bsStyle="white"
            onClick={ firstButtonAction }>
            { isBeingEdited ? <span className="fa fa-save"></span> : <span className="fa fa-edit"></span> }
          </Button>
        </div>
      </div>
    );
  }

  clearFlashcardBeingEdited(event) {
    if (event.keyCode === 27) { // Escape
      this.setState({
        idOfFlashcardBeingEdited: undefined
      });
    }
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state.deckDetail);
}

function mapDispatchToProps(dispatch) {
  const mapper = {};
  
  API_ACTIONS.forEach( actionName => {
    mapper[actionName] = (options) => {
      dispatch(action(actionName)(options));
    }
  });
  
  return mapper;
}

const DeckDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Deck);

export default DeckDetail;
