import { Component } from 'react';

class Input extends Component {
  handleChange = (e) => {
    this.props.handleChange(e);
    if (!!this.props.setIsChange) this.props.setIsChange(false);
  }

  render() {
    return (
      <label className={`popup__input-label ${this.props.isPopup && "popup__input-label_required"}`}>
        <input className={`form__input ${this.props.errors && "form__input_error"}`} type={this.props.type} value={this.props.values} onChange={this.handleChange} name={this.props.name} placeholder={this.props.placeholder}></input>
        <span className="form__input-error">{this.props.errors ? this.props.errors || this.props.touched : ""}</span>
      </label>
   )
  }
}

export default Input;