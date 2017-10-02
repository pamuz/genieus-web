/*
 * The Deck component 
 */

import _ from 'lodash';
import React from 'react';

import { connect } from 'react-redux';
import { action } from '../../store/actions/api.js';

const API_ACTIONS = ['attemptCreateFlashcard', 'attemptDeleteFlashcard', 'attemptPatchFlashcard'];

export class _Deck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onEditorSaveAction: this.onEditorModalSaveCreate
    }
  }

  render() {
    const {
      isFetching,
      isInError,
      error,
      deck,
      flashcards
    } = this.props;

    if (isFetching) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <div>
        <h1 style={{ color: deck.attributes.color }}>{ deck.attributes.name }</h1>

        <div className="card">
          <div className="card-body" style={{ padding: 10 }}>
            <button className="btn btn-default"
                    onClick={ this.showEditorModal.bind(this) }>+</button>
          </div>
        </div>

        {/* toolbar  */}
        <div className="modal" ref={ (modal) => this.editorModal = modal }>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Flashcard Editor</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <input name="" type="hidden" ref={ input => this.editorFlashcardIdInput = input }/>
                  <div className="form-group">
                    <textarea className="form-control" rows="5"
                              ref={ (element) => this.editorFrontInput = element }></textarea>
                    <label>Front</label>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" rows="5"
                              ref={ (element) => this.editorBackInput = element }></textarea>
                    <label>Back</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button"
                        className="btn btn-primary"
                        onClick={ this.state.onEditorSaveAction.bind(this) }>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          { flashcards.map(this.renderFlashcard.bind(this)) }
        </div>
      </div>
    );
  }

  renderFlashcard(flashcard) {
    return (
      <div className="card" style={{ "width": "20rem" }}>
        <div className="card-body">
          <h4 className="card-title">{ flashcard.attributes.front.text }</h4>
          <h4 className="card-title">{ flashcard.attributes.back.text }</h4>
          <button className="btn btn-danger"
                  onClick={ _.partial(this.handleDeleteFlashcardClick.bind(this), flashcard.id) }>
            Trash
          </button>
          <button className="btn btn-info"
                  ref={ element => this.saveChangesButton = element }
                  onClick={ _.partial(this.showEditorModalPrefilled, flashcard).bind(this) }>
            Edit
          </button>
        </div>
      </div>
    );
  }

  showEditorModal() {
    $(this.editorModal).modal('show');

    this.setState({
      onEditorSaveAction: this.onEditorModalSaveCreate.bind(this)
    });

    // Set the action of the save button to be for flashcard creation
  }

  showEditorModalPrefilled(flashcard) {
    this.showEditorModal();
    console.log(flashcard);
    this.editorFlashcardIdInput.value = flashcard.id;
    this.editorFrontInput.value = flashcard.attributes.front.text;
    this.editorBackInput.value = flashcard.attributes.back.text;

    this.setState({
      onEditorSaveAction: this.onEditorModalSaveEdit.bind(this)
    });

    // Set the action of the save button to be for flashcard edition
  }

  handleDeleteFlashcardClick(flashcardId) {
    this.props.attemptDeleteFlashcard({
      pathSubstitutions: {
        id: flashcardId
      }
    });
  }

  onEditorModalSaveCreate() {
    const attributes = {
      "deck_id": this.props.deck.id,
      "type": "text",
      "front": {
        "text": this.editorFrontInput.value
      },
      "back": {
        "text": this.editorBackInput.value
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

  onEditorModalSaveEdit() {
    const attributes = {
      "id": this.editorFlashcardIdInput.value,
      "deck_id": this.props.deck.id,
      "type": "text",
      "front": {
        "text": this.editorFrontInput.value
      },
      "back": {
        "text": this.editorBackInput.value
      }
    };

    this.props.attemptPatchFlashcard({
      pathSubstitutions: {
        id: this.editorFlashcardIdInput.value,
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
}

function mapStateToProps(state) {
  console.log(state.deckDetail);
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

const Deck = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Deck);

export default Deck;
