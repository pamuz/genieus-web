import _ from 'lodash';
import React from 'react';
import Form, { FormInput } from './Form.jsx';

export default class SmartForm extends React.Component {
  render() {
    return (
      <Form>
        { this.renderSpecIntoInputs() }
      </Form>
    );
  }

  renderSpecIntoInputs() {
    return this.props.spec.map( item => {
      let element = null;

      switch(item.type) {
        default:
          // The default is a normal text input
          element = (
            <FormInput { ...item }
                       key={ item.name }
                       ref={ input => this[item.name + 'Input'] = input } />
          );
      }

      return element;
    });
  }

  getValues() {
    const values = {};

    _.forEach(this.props.spec, item => {
      values[item.name] = this[item.name + 'Input'].val();
    });

    return values;
  }

  setValues(newValues) {
    _.forEach(this.props.spec, item => {
      this[item.name + 'Input'].value = newValues[item.name];
    });
  }
}
