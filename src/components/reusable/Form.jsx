import React, { PropTypes } from 'react';


class FormInput extends React.Component {
  constructor(props) {
    super(props);
  }

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


class FormSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, spec, help } = this.props;

    return (
      <div className="form-group">
        { label ? <label>{ label }</label> : null }
        <select className="form-control" ref={ input => this.input = input }>
          { spec.map( (item, i) => {
              return (
                <option key={i} value={ item.value }>{ item.label }</option>
              );
          }) }
        </select>
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

FormSelect.propTypes = {
  label: PropTypes.string,
  spec: PropTypes.array,
  help: PropTypes.string,
};


export default class Form extends React.Component {
  render() {
    return (
      <form { ...this.props }>{ this.props.children }</form>
    );
  }
}

Form.Input = FormInput;
Form.Select = FormSelect;
