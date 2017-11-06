import React, { PropTypes } from 'react';

import { Link } from '@curi/react';
import Button from './Button.jsx';
import Panel from './Panel.jsx';

export default class Deck2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const DeckHeader = this.renderDeckHeader();
    const DeckBody = this.renderDeckBody();
    const DeckFooter = this.renderDeckFooter();

    return (
      <Panel>
        { DeckHeader }
        { DeckBody }
        { DeckFooter }
      </Panel>
    );
  }

  renderDeckHeader() {
    const { data } = this.props;

    return (
      <Panel.Header style={{ color: data.attributes.color, fontSize: '1.5em' }}>
        { this.props.header || data.attributes.name }
      </Panel.Header>
    );
  }

  renderDeckBody() {
    const { data } = this.props;

    return (
      <Panel.Body style={{ }}>
        { this.props.body || data.attributes.description || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut leo
        semper, tempor quam et, facilisis tortor. Duis quis ipsum lorem. Sed
        tempor vehicula dolor, et scelerisque urna rhoncus eu. Sed ac orci
        eget nisl ullamcorper porttitor. Nam lacinia dui non pellentesque
        convallis. Integer feugiat, neque sit amet maximus tincidunt, est dui
        elementum mauris, sit amet venenatis eros sem ac eros. Vestibulum id
        convallis elit.` }
      </Panel.Body>
    );
  }

  renderDeckFooter() {
    const { data } = this.props;

    return (
      <Panel.Footer style={{ color: data.attributes.color }}>
        { this.props.footer ||
        <div className="btn-group">
          <Link className="btn btn-white btn-xs" to="DeckDetail"
                params={{ deckId: data.id }}>
            <span className="fa fa-edit"></span>&nbsp;Edit
          </Link>
          <Link className="btn btn-white btn-xs" to="QuizOfDeck"
                params={{ deckId: data.id }}>
            <span className="fa fa-trophy"></span>&nbsp;Take quiz
          </Link>
          <Button className="btn btn-danger btn-xs">
            <span className="fa fa-trash-o"></span>&nbsp;Delete
          </Button>
        </div>
        }
      </Panel.Footer>
    );
  }
}

Deck2.propTypes = {
  data: PropTypes.object.isRequired,
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  body: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
