import { Component } from 'react';

class User extends Component {

  //Нажатие на кнопку редактирования, в стейт selectedUser передается информация о выбранном пользователе, открывается соответствующий попап, запоминается индекс пользователя в общем списке

  handleEditSelectedUserClick = () => {
    this.props.onSelectedUser({
      ...this.props.user,
      id: this.props.id,
    });
    this.props.onEditUser();
    const index = this.props.users.findIndex((item) => item.id === this.props.id);
    this.props.setIndexUser(index);
  }

  //Нажатие на кнопку удаления, в стейт selectedUser передается информация о выбранном пользователе, открывается соответствующий попап, пользователь удаляется из общего списка по индексу

  handleDeleteSelectedUserClick = () => {
    this.props.onSelectedUser({
      ...this.props.user,
      id: this.props.id,
    });
    this.props.onDeleteUser();
    const index = this.props.users.findIndex((item) => item.id === this.props.id);
    this.props.users.splice(index, 1);
    this.props.changeUsers(this.props.users);
  }

  render() {
    return (
      <>
        <td><img className="table__photo" src={this.props.user.avatar} alt={`${this.props.user.first_name} ${this.props.user.last_name}`} /></td>
        <td className="table__row">{this.props.user.first_name}</td>
        <td className="table__row">{this.props.user.last_name}</td>
        <td className="table__row">{this.props.user.email}</td>
        <td><button className="table__btn table__btn_type_edit" onClick={this.handleEditSelectedUserClick} type="button"></button></td>
        <td><button className="table__btn table__btn_type_delete" onClick={this.handleDeleteSelectedUserClick} type="button"></button></td>
      </>
    )
  }
}

export default User;