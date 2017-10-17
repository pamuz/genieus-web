/* 
 * The <Community> page component is the page where users go to
 * search for public decks created by others and add them to their
 * collection. 
 *
 * For now, the component retrieves the "decks" it will show as
 * search results from the user collection but this is of course
 * temporary while an endpoint for this is created.
 */

import React from 'react';

import { connect } from 'react-redux';

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
        { decks.map( oneDeck => {
            return (
                <li key={ oneDeck.id }>{ oneDeck.attributes.name }</li>
            );
        }) }
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
}

const mapStateToProps = state => {
  return state.collection;
};

const mapDispatchToProps = dispatch => {
  return {};
};

const Community = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Community);

export default Community;
