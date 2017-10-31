/*
 * The Collection component is a dashboard where users can look at their
 * collection of decks. In it they also can, create, update and delete
 * the decks, as well as following links to a page for each of the decks.
 */

import _ from 'lodash';
import React from 'react';
import createReactClass from 'create-react-class';

import { Link } from '@curi/react';

import { connect } from 'react-redux';
import { action } from '../../store/actions/api.js';
import SmartForm from '../reusable/SmartForm.jsx';
import Modal from '../reusable/Modal.jsx';
import Button from '../reusable/Button.jsx';
import ButtonRow from '../reusable/Button.jsx';
import Card from '../reusable/Card.jsx';
import Panel from '../reusable/Panel.jsx';
import Deck from '../reusable/Deck2.jsx';

const API_ACTIONS = ['attemptCreateDeck', 'attemptDeleteDeck', 'attemptPatchDeck'];

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

    // Closure for inner class
    const attemptDeleteDeck = this.attemptDeleteDeck.bind(this);
    const attemptMarkDeckAsPublic = this.attemptMarkDeckAsPublic.bind(this);

    this.DeckComponent = createReactClass({
      getDefaultProps() {
        return {
          data: {}
        }
      },

      render() {
        const { data } = this.props;

        const DeckFooter = (
          <div className="btn-group">
            <Link className="btn btn-white btn-xs" to="DeckDetail"
                  params={{ deckId: data.id }}>
              <span className="fa fa-edit"></span>&nbsp;Edit
            </Link>
            <Link className="btn btn-white btn-xs" to="QuizOfDeck"
                  params={{ deckId: data.id }}>
              <span className="fa fa-trophy"></span>&nbsp;Take quiz
            </Link>
            <Button className="btn btn-white btn-xs"
                    onClick={ () => attemptMarkDeckAsPublic(data) }>
              <span className="fa fa-users"></span>&nbsp;Make public
            </Button>
            <Button className="btn btn-danger btn-xs"
                    onClick={ () => attemptDeleteDeck(data.id) }>
              <span className="fa fa-trash-o"></span>&nbsp;Delete
            </Button>
          </div>
        );

        return (
          <Deck footer={ DeckFooter } { ...this.props }></Deck>
        );
      }
    });
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
        {/* A modal with a form to create a new deck */}
        <Modal bsSize="small"
               show={createDeckModalShown} onHide={() => this.setState({
                   createDeckModalShown: false
               })}>
          <Modal.Header>
            <Modal.Title>Create Deck</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SmartForm ref={form => (this.createDeckForm = form)}
                       spec={[
                         {
                           name: "name",
                           type: "text",
                           label: "Name"
                         },
                         {
                           name: "color",
                           type: "select",
                           spec: [
                             { value: "red", label: "Red" },
                             { value: "orange", label: "Orange" },
                             { value: "yellow", label: "Yellow" },
                             { value: "green", label: "Green" },
                             { value: "blue", label: "Blue" },
                             { value: "indigo", label: "Indigo" },
                             { value: "violet", label: "Violet" },
                             { value: "black", label: "Black" },
                           ],
                           label: "Color"
                         },
                         {
                           name: "description",
                           type: "textarea",
                           label: "Description",
                           rows: 5
                         }
                       ]} />
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-group">
            <Button bsStyle="primary" onClick={() => this.attemptCreateDeck()}>
              Create
            </Button>
            <Button bsStyle="danger">Cancel</Button>
</div>
          </Modal.Footer>
        </Modal>

        <div className="row">
          <div className="col-md-12">
            <div className="btn-group">
              <Button bsStyle="primary" onClick={() => this.setState({
                  createDeckModalShown: true
              })}>
                +
              </Button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "25px" }}>
          <div className="row">
            { allDecks.map( (aDeck) => (
              <div key={ aDeck.id } className="col-md-4">
                <this.DeckComponent data={ aDeck } />
              </div>
            )) }
          </div>
        </div>
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
    this.props.attemptDeleteDeck({
      pathSubstitutions: {
        id: deckId
      }
    });
  }

  attemptMarkDeckAsPublic(deck) {
    this.props.attemptPatchDeck({
      pathSubstitutions: {
        id: deck.id,
      },
      payload: {
        data: {
          type: "deck",
          attributes: Object.assign({}, deck.attributes, { is_public: 1 })
        }
      }
    });
  }
}

/* Styles */
const modalHeaderStyle = {
  backgroundColor: "#AB2EE6",
  color: "white"
};

const cancelBtnStyle = {
  color: "#AB2EE6",
  backgroundColor: "white",
  border: "1.4px solid #AB2EE6"
};


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
