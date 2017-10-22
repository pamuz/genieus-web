/* 
 * The <Community> page component is the page where users go to
 * search for public decks created by others and add them to their
 * collection. 
 *
 * For now, the component retrieves the "decks" it will show as
 * search results from the user collection but this is of course
 * temporary while an endpoint for this is created.
 */

import _ from 'lodash';
import React from 'react';

import { connect } from 'react-redux';

import Deck from '../reusable/Deck.jsx';
import Button from '../reusable/Button.jsx';
import { action } from '../../store/actions/api.js';

const API_ACTIONS = [
  'searchPublicDecks',
  'attemptAddPublicDeckToUserCollection'
];

export class _Community extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { decks } = this.props;

    return (
      <div>
        <form onSubmit={ this.handleSearchFormSubmit.bind(this) }>
          <div className="form-group">
            <div className="input-group">
              <input ref={ input => this.searchInput = input } className="form-control" type="text"/>
              <span className="input-group-addon">Search</span>
            </div>
          </div>
        </form>
        <ul>
      { _.chunk(decks, 2).map( (deckRow, i) => (
        <div key={i} className="row">
          { deckRow.map( oneDeck => (
            <div className="col-md-4">
              <Deck key={ oneDeck.id } attributes={ oneDeck.attributes }></Deck>
              <Button
                onClick={ () => this.addPublicDeckToUserCollection(oneDeck.id) }
                style={{
                  color: oneDeck.attributes.color
                }}>Add to collection</Button>
            </div>
          ) ) }
        </div>
      ) ) }
      
        </ul>
      </div>
    );
  }

  handleSearchFormSubmit(event) {
    event.preventDefault();
    const { params, history } = this.props;
    const search = $(this.searchInput).val();
    history.replace(`/community?q=${encodeURIComponent(search)}`);
  }

  addPublicDeckToUserCollection(deckId) {
    console.log(this.props);

    this.props.attemptAddPublicDeckToUserCollection({
      payload: {
        id: deckId
      }
    });
  }
}

const mapStateToProps = state => {
  return state.community;
};

const mapDispatchToProps = dispatch => {
  const mapper = {};

  API_ACTIONS.forEach( actionName => {
    mapper[actionName] = (options) => {
      dispatch(action(actionName)(options));
    }
  });

  return mapper;
};

const Community = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Community);

export default Community;
