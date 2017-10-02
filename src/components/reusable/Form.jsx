import React from 'react';

export class FormInput extends React.Component {
  render() {
    const { label, type, placeholder, help } = this.props;

    return (
      <div className="form-group">
        { label ? <label>{ label }</label> : null }
        <input className="form-control"
               type={ type }
               placeholder={ placeholder }
               ref={ input => this.input = input } />
        { help ? <small className="form-text text-muted">{ help }</small> : null }
      </div>
    );
  }

  val(newVal) {
    if (newVal !== undefined) {
      $(this.input).val(newVal);
    } else {
      return $(this.input).val();
    }
  }
}

export default class Form extends React.Component {
  render() {
    return (
      <form { ...this.props }>{ this.props.children }</form>
    );
  }
}
