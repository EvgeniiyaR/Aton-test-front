import { Component } from 'react';
import { copy } from 'clipboard';
import { Modal } from 'antd';
import { message } from 'antd';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailClick: false,
    };

    message.config({
      duration: 2,
      maxCount: 1,
    });
  }

  //Нажатие на кнопку редактирования, в стейт selectedUser передается информация о выбранном пользователе, открывается соответствующий попап, запоминается индекс пользователя в общем списке

  handleEditSelectedUserClick = () => {
    this.props.onSelectedUser({
      id: this.props.id,
      ...this.props.user,
    });
    this.props.onEditUser();
    const index = this.props.users.findIndex((item) => item.id === this.props.id);
    this.props.setIndexUser(index);
  }

  //Нажатие на кнопку удаления, в стейт selectedUser передается информация о выбранном пользователе, открывается соответствующий попап, пользователь удаляется из общего списка по индексу

  handleDeleteSelectedUserClick = () => {
    this.props.onSelectedUser({
      id: this.props.id,
      ...this.props.user,
    });
    this.props.onDeleteUser();
    const index = this.props.users.findIndex((item) => item.id === this.props.id);
    this.props.users.splice(index, 1);
    this.props.changeUsers(this.props.users);
  }

  //Всплывающее окно для подтверждения удаления

  handleDeleteConfirm = () => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить пользователя?',
      onOk: () => this.handleDeleteSelectedUserClick(),
      cancelText: 'Нет',
      okText: 'Да',
      cancelButtonProps: {
        type: 'text',
        style: { borderColor: "black" },
      },
      okButtonProps: {
        danger: true,
      },
    });
  }

  //Нажатие на кнопку email, которая появляется при max-width: 480px, копирует email и уведомляет пользователя

  handleEmailButtonClick = (e) => {
    const copyEmail = e.target.value;
    this.setState({
      isEmailClick: !this.state.isEmailClick,
    });
    copy(copyEmail);
    this.props.setIsError(false);
    message.success({
      content: `Email ${copyEmail} скопирован!`,
    });
  }

  render() {
    return (
      <>
        <td className="table__cell"><img className="table__photo" src={this.props.user.avatar} alt={`${this.props.user.first_name} ${this.props.user.last_name}`} /></td>
        <td className="table__cell">{this.props.user.first_name}</td>
        <td className="table__cell">{this.props.user.last_name}</td>
        <td className="table__cell table__cell_type_email"><button className="table__copy" title="Скопировать e-mail" type="button" onClick={this.handleEmailButtonClick} value={this.props.user.email}>{this.props.user.email}</button></td>
        <td className="table__cell table__cell_type_btn-email"><button className="table__btn" title="Скопировать e-mail" type="button" onClick={this.handleEmailButtonClick} value={this.props.user.email}>@</button></td>
        <td className="table__cell table__cell_type_edit"><button className="table__btn table__btn_type_edit" title="Редактировать пользователя" onClick={this.handleEditSelectedUserClick} type="button"></button></td>
        <td className="table__cell table__cell_type_delete"><button className="table__btn table__btn_type_delete" title="Удалить пользователя" onClick={this.handleDeleteConfirm} type="button"></button></td>
      </>
    )
  }
}

export default User;