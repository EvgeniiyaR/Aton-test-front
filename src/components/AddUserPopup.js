import { Component } from 'react';
import PopupWithForm from './PopupWithForm';

class AddUserPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
    };
  }

  //Запись изменений в значениях импутов

  handleChange = (e) => {
    if (e.target.name === 'name') {
      this.setState({
        firstName: e.target.value,
      });
    } else if (e.target.name === 'surname') {
      this.setState({
        lastName: e.target.value,
      });
    } else if (e.target.name === 'email') {
      this.setState({
        email: e.target.value,
      });
    } else if (e.target.name === 'avatar') {
      this.setState({
        avatar: e.target.value,
      });
    }
  }

  //Редактирование данных, сброс стандратного поведения формы, закрытие попапа редактирования и перезапись данных

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddUser();
    this.props.users.unshift({
      id: Number(this.props.id),
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      avatar: this.state.avatar,
    });
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
    });
  }

  render() {
    return (
      <PopupWithForm isOpen={this.props.isOpen} onClose={this.props.onClose} onSubmit={this.handleSubmit} name="add" title="Добавить пользователя" buttonText="Сохранить">
        <label className="popup__input-label">
          <input className="popup__input" type="text" value={this.state.firstName || ''} onChange={this.handleChange} name="name" placeholder="Имя" required minLength="2" maxLength="40" />
        </label>
        <label className="popup__input-label">
          <input className="popup__input" type="text" value={this.state.lastName || ''} onChange={this.handleChange} name="surname" placeholder="Фамилия" required minLength="2" maxLength="40" />
        </label>
        <label className="popup__input-label">
          <input className="popup__input" type="email" value={this.state.email || ''} onChange={this.handleChange} name="email" placeholder="E-mail" required minLength="2" maxLength="40" />
        </label>
        <label className="popup__input-label">
          <input className="popup__input" type="url" value={this.state.avatar || ''} onChange={this.handleChange} name="avatar" placeholder="Ссылка на аватар" required />
        </label>
      </PopupWithForm>
    )
  }
}

export default AddUserPopup;