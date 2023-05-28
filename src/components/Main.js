import { Component } from 'react';
import User from './User';

class Main extends Component {
  render() {
    console.log()
    return (
      <main className="main">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className="table__heading table__heading_type_name">Имя</th>
              <th className="table__heading table__heading_type_surname">Фамилия</th>
              <th className="table__heading table__heading_type_email">E-mail</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.props.users.map(({ id, ...props }) => (
            <tr key={id}>
              <User user={props} id={id} onEditUser={this.props.onEditUser} onSelectedUser={this.props.onSelectedUser} selectedUser={this.props.selectedUser} onDeleteUser={this.props.onDeleteUser} users={this.props.users} changeUsers={this.props.changeUsers} setIndexUser={this.props.setIndexUser} />
            </tr>
          ))}
          </tbody>
        </table>
        <button className="table__button" onClick={this.props.onAddUser} type="button">Добавить пользователя</button>
      </main>
    )
  }
}

export default Main;