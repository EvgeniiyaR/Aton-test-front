import { Component } from 'react';
import PopupWithForm from './PopupWithForm';

class EditUserPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
    };
  }

  //Обновление данных в значениях импутов в зависимости от изменения пропсов и текущих стейтов

  componentDidUpdate(prevState, prevProps) {
    if (prevProps === this.state && this.props.isOpen) {
      this.setState({
        firstName: this.props.selectedUser.first_name,
        lastName: this.props.selectedUser.last_name,
        email: this.props.selectedUser.email,
        avatar: this.props.selectedUser.avatar,
      });
    }
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
    this.props.onUpdateUser();
    this.props.users[this.props.indexUser].first_name = this.state.firstName;
    this.props.users[this.props.indexUser].last_name = this.state.lastName;
    this.props.users[this.props.indexUser].email = this.state.email;
    this.props.users[this.props.indexUser].avatar = this.state.avatar;
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
    });
  }

  render() {
    return (
      <PopupWithForm isOpen={this.props.isOpen} onClose={this.props.onClose} onSubmit={this.handleSubmit} name="edit" title="Редактировать пользователя" buttonText="Обновить">
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

export default EditUserPopup;