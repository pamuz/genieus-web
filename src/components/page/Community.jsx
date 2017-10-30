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

import Deck from '../reusable/Deck2.jsx';
import Button from '../reusable/Button.jsx';
import Panel from '../reusable/Panel.jsx';
import { action } from '../../store/actions/api.js';

const API_ACTIONS = [
  'searchPublicDecks',
];


class _CommunityDeck extends Deck {
  renderDeckFooter() {
    const { data } = this.props;

    return (
      <Panel.Footer>
      <Button
        className="btn btn-white btn-xs"
        onClick={ () => this.props.addPublicDeckToUserCollection({
            payload: { id: data.id }
        }) }
        style={{
          color: data.attributes.color
        }}>Add to collection</Button>
      </Panel.Footer>
    );
  }
}

const CommunityDeck = connect(
  (state) => ({}),
  (dispatch) => ({
    addPublicDeckToUserCollection: (options) => {
      dispatch(action('attemptAddPublicDeckToUserCollection')(options))
    }
  }))(_CommunityDeck);

export class _Community extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { decks } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={ this.handleSearchFormSubmit.bind(this) }>
            <div className="form-group">
              <div className="input-group">
                <input ref={ input => this.searchInput = input } className="form-control" type="text"/>
                <span className="input-group-addon">Search</span>
              </div>
            </div>
          </form>
          { _.chunk(decks, 3).map( (deckRow, i) => (
            <div key={i} className="row">
              { deckRow.map( (aDeck) => (
                <div key={ aDeck.id } className="col-md-4">
                  <CommunityDeck key={ aDeck.id } data={ aDeck } />
                </div>
              ) ) }
            </div>
          ) ) }
        </div>
      </div>
    );
  }

  handleSearchFormSubmit(event) {
    event.preventDefault();
    const { params, history } = this.props;
    const search = $(this.searchInput).val();
    history.replace(`/community?q=${encodeURIComponent(search)}`);
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
