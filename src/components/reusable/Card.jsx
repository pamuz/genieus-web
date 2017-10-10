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

class CardHeader extends React.Component {
  render() {
    const classes = classnames({
      [this.props.className || ""]: true,
      "card-header": true
    });

    return (
      <h4 className={classes} {..._.omit(this.props, "className")}>
        {this.props.children}
      </h4>
    );
  }
}

class CardFooter extends React.Component {
  render() {
    const classes = classnames({
      [this.props.className || ""]: true,
      'card-footer': true,
    });

    return (
      <div className={classes} {..._.omit(this.props, "className")}>
        {this.props.children}
      </div>
    );
  }
}

class CardText extends React.Component {
  render() {
    const classes = classnames({
      [this.props.className || ""]: true,
      'card-text': true
    });

    return (
      <div className={classes} {..._.omit(this.props, "className")}>
        {this.props.children}
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
Card.Text = CardText;
Card.Header = CardHeader;
Card.Footer = CardFooter;

export default Card;
