import React, { PropTypes } form 'react';

export default class ConditionalElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.when ? this.props.children : null;
  }
}

ConditionalElement.propTypes = {
  when: PropTypes.bool
}
