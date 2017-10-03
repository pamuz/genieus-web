import React from 'react';
import classnames from 'classnames';

class CardTitle extends React.Component {
  render() {
    return (
      <h4 className="card-title" { ...this.props }>
        { this.props.children }
      </h4>
    );
  }
}

class CardBody extends React.Component {
  render() {
    const classes = classnames({
      [this.props.className || '']: true,
      'card-body': true
    });

    return (
      <div className={ classes } { ...this.props }>
        { this.props.children }
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    const classes = classnames({
      [this.props.className || '']: true,
      'card': true
    });

    return (
      <div className={ classes } { ..._.omit(this.props, 'className') }>
        { this.props.children }
      </div>
    );
  }
}

Card.Body = CardBody;
Card.Title = CardTitle;

export default Card;
