import { Component } from 'react';

class PopupWithForm extends Component {

  render() {
    return (
      <div className={`popup ${this.props.isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button className="popup__exit-button" type="button" onClick={this.props.onClose}></button>
          <h2 className="popup__label">{this.props.title}</h2>
          <form className="popup__form" name={this.props.name} onSubmit={this.props.onSubmit}>
            {this.props.children}
            <button className="popup__button" type="submit">{this.props.buttonText}</button>
          </form>
        </div>
      </div>
    )
  }
}

export default PopupWithForm;