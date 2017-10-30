import React from 'react';

function sanitizeProps(props) {
  return _.omit(props, ['children']);
}

class Panel extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="panel" { ...sanitizeProps(this.props) }>
        { this.props.children }
      </div>
    );
  }
}

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header className="panel-heading" { ...sanitizeProps(this.props) }>
        { this.props.children }
      </header>
    );
  }
}

class Body extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="panel-body slim-scroll" { ...sanitizeProps(this.props) }>
        { this.props.children }
      </div>
    );
  }
}

Panel.Header = Header;
Panel.Body = Body;
Panel.Footer = Body;

export default Panel;
