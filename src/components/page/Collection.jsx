/*
 * The Collection component is a dashboard where users can look at their
 * collection of decks. In it they also can, create, update and delete
 * the decks, as well as following links to a page for each of the decks.
 */

import _ from 'lodash';
import React from 'react';

import { Link } from '@curi/react';

import { connect } from 'react-redux';
import { action } from '../../store/actions/api.js';
import SmartForm from '../reusable/SmartForm.jsx';
import Modal from '../reusable/Modal.jsx';
import Button from '../reusable/Button.jsx';
import Card from '../reusable/Card.jsx';

const API_ACTIONS = ['attemptCreateDeck', 'attemptDeleteDeck'];

function makeDeckCardStyle(deck) {
  return {
    border: '1px solid ' + deck.attributes.color,
    height: '100px'
  }
}

export class _Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createDeckModalShown: false
    };
  }

  render() {
    const {
      isAuthenticating,
      isInError
    } = this.props;

    const {
      createDeckModalShown
    } = this.state;

    const allDecks = this.props.decks;

    return (
      <div>
        <h1>Deck collection</h1>

        {/* A modal with a form to create a new deck */}
        <Modal show={ createDeckModalShown }
               onHide={ () => this.setState({ createDeckModalShown: false }) }>
          <Modal.Header>
            <Modal.Title>Create Deck</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SmartForm ref={ form => this.createDeckForm = form }
                       spec={[
                         {
                           'name': 'name',
                           'type': 'text',
                           'label': 'Name'
                         },
                         {
                           'name': 'color',
                           'type': 'text',
                           'label': 'Color'
                         }
                       ]} />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary"
                    onClick={ () => this.attemptCreateDeck() }>Create</Button>
            <Button>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Button bsStyle="success"
                onClick={ () => this.setState({ createDeckModalShown: true }) }>
          +
        </Button>

        {
          allDecks.map(deck => {
            return (
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: deck.attributes.color }}>
                    { deck.attributes.name }
                  </Card.Title>
                  <Link className="btn btn-primary"
                        to="Deck"
                        params={{ deckId: deck.id }}>Detail</Link>
                  <Button bsStyle="danger"
                          onClick={ () => this.attemptDeleteDeck(deck.id) }>X</Button>
                </Card.Body>
              </Card>
            );
          })
        }
      </div>
    );
  }

  attemptCreateDeck() {
    const attributes = this.createDeckForm.getValues();

    this.props.attemptCreateDeck({
      payload: {
        data: {
          type: 'deck',
          attributes
        }
      }
    });
  }

  attemptDeleteDeck(deckId) {
    event.preventDefault();
    this.props.attemptDeleteDeck({
      pathSubstitutions: {
        id: deckId
      }
    });
  }
}

function mapStateToProps(state) {
  return state.collection;
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

const Collection = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Collection);

export default Collection;
