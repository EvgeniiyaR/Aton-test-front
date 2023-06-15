import { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <label className="popup__input-label">
        <input className={`form__input ${this.props.errors && "form__input_error"}`} type={this.props.type} value={this.props.values} onChange={this.props.handleChange} name={this.props.name} placeholder={this.props.placeholder}></input>
        <span className="form__input-error">{this.props.errors && this.props.touched && this.props.errors}</span>
      </label>
   )
  }
}

export default Input;