import _ from 'lodash';
import React from 'react';

import Card from './Card.jsx';
import Button from './Button.jsx';

export default class Deck extends React.Component {
  render() {
    const { attributes } = this.props;
    const { name } = attributes;
    const description = `
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Perferendis ex quibusdam quos sed.
                  Perferendis, quo sequi praesentium illo quidem
                  tempore deserunt neque reiciendis, id, fugiat
                  dignissimos omnis optio explicabo beatae.`;


    return (
      <Card style={ this.makeCardStyle() }>
        <Card.Header style={ this.makeCardHeaderStyle() }>
          { name }
        </Card.Header>
        <Card.Body>
          <Card.Text>{ description }</Card.Text>
        </Card.Body>
        <Card.Footer style={{backgroundColor: 'white' }}>
        </Card.Footer>
      </Card>
    );
  }

  makeCardStyle() {
    const { attributes } = this.props;

    return {
      border: '1.5px solid ' + attributes.color,
      borderColor: attributes.color,
      width: '30rem',
      marginRight: '50px',
    }
  }

  makeCardHeaderStyle() {
    const { attributes } = this.props;

    return {
      backgroundColor: attributes.color,
      marginTop: "0px",
      color: "white"
    }
  }

}
