import React, { PropTypes } from 'react';

import Button from './Button.jsx';

import classnames from 'classnames';

export default class ButtonRow extends React.Component {
  render() {
    const { spec, tight } = this.props;

    <div className={ classNames({ "btn-group": !!tight }) }>
    { spec.map( (item) => {

      return (
        <Button bsStyle={ item.style }
                bsSize={ item.size }
                onClick={ item.onClick }>
          { item.content }
        </Button>
      );

    }) }
    </div>
  }
}

ButtonRow.propTypes = {
  spec: PropTypes.array.isRequired,
}
