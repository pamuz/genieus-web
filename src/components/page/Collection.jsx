/*
 * The Collection component is a dashboard where users can look at their
 * collection of decks. In it they also can, create, update and delete
 * the decks, as well as following links to a page for each of the decks.
 */

import _ from 'lodash';
import React from 'react';

import { Link } from '@curi/react';

import { connect } from 'react-redux';

import {
  createDeckAttempt,
  deleteDeckAttempt
} from '../../store/actions/collection.js';

function makeDeckCardStyle(deck) {
  return {
    border: '1px solid ' + deck.attributes.color,
    height: '100px'
  }
}

export class _Collection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticating, isInError } = this.props;

    const allDecks = this.props.decks;

    return (
      <div>
        <h1>Deck collection</h1>

        <form onSubmit={ this.deckCreateFormSubmit.bind(this) } action="">
          <label>Name</label>
          <input type="text" ref={ input => this.deckNameInput = input }/>
          <label>Color</label>
          <input type="text" ref={ select => this.deckColorSelect = select }/>
          <input name="" type="submit" value="Save"/>
        </form>

        {
          allDecks.map(deck => {
            return (
              <div className="card" style={{ "width": "20rem" }}>
                <div className="card-body">
                  <h4 className="card-title" style={{ color: deck.attributes.color }}>{ deck.attributes.name }</h4>
                  <Link className="btn btn-primary"
                        to="Deck"
                        params={{ deckId: deck.id }}>Detail</Link>
                <button className="btn btn-danger"
                  onClick={ _.partial(this.deleteDeckBtnClick, _, deck.id).bind(this) }>
                  Trash
                </button>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

  deckCreateFormSubmit(event) {
    event.preventDefault();

    const attributes = {
      name: this.deckNameInput.value,
      color: this.deckColorSelect.value
    };

    this.props.createDeckAttempt(attributes);
  }

  deleteDeckBtnClick(event, deckId) {
    event.preventDefault();
    this.props.deleteDeckAttempt(deckId);
  }
}

function mapStateToProps(state) {
  return state.collection;
}

function mapDispatchToProps(dispatch) {
  return {
    createDeckAttempt: (attributes) => {
      dispatch(createDeckAttempt(attributes));
    },
    deleteDeckAttempt: (deckId) => {
      dispatch(deleteDeckAttempt(deckId));
    }
  };
}

const Collection = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Collection);

export default Collection;
