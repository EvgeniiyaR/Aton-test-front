import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '../utils/Api.js';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import EditUserPopup from './EditUserPopup';
import AddUserPopup from './AddUserPopup';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      pages: null,
      isEditUserPopupOpen: false,
      isAddUserPopupOpen: false,
      selectedUser: {
        id: '',
        first_name: '',
        last_name: '',
        email_name: '',
        avatar_name: '',
      },
      indexUser: null,
      newId: null,
    };
  }

  //Монтирование пользователей в таблицу посредством обращения к API

  componentDidMount() {
    api.getUsersInfo()
    .then((res) => {
      this.setState({
        users: res.data,
        pages: res.total_pages,
      });
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Установка стейта попапа редактирование в открытое состояние

  handleEditUserClick = () => {
    this.setState({
      isEditUserPopupOpen: true,
    });
  }

  //Установка стейта попапа добавления в открытое состояние

  handleAddUserClick = () => {
    this.setState({
      isAddUserPopupOpen: true,
    });
  }

  //Обновление стейта пользователей

  changeUsers = (users) => {
    this.setState({ users });
  }

  //Установка индекса пользователя

  setIndexUser = (indexUser) => {
    this.setState({ indexUser });
  }

  //Закрытие всех попапов

  closeAllPopups = () => {
    this.setState({
      isEditUserPopupOpen: false,
      isAddUserPopupOpen: false,
      selectedUser: {},
    });
  }

  //Обновление стейта пользователя, над которым совершается действие удаление/редактирование

  setStateSelectedUser = (user) => {
    this.setState({
      selectedUser: user,
    });
  }

  //Запрос по API пользователей в зависимости от страницы

  handleGetUsers = (page, perPage) => {
    api.getUsersPageInfo(page, perPage)
    .then((res) => {
      this.setState({
        users: res.data,
        pages: res.total_pages,
      })
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Запрос по API редактирования пользователя

  handleEditUser = () => {
    api.editUserInfo(this.state.selectedUser.id)
    .then(() => {
      this.setState({
        isEditUserPopupOpen: false,
      });
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Запрос по API удаления пользователя

  handleDeleteUser = () => {
    api.deleteUserInfo(this.state.selectedUser.id)
    .then(() => {
      this.setState({
        selectedUser: {},
      });
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Запрос по API добавления пользователя

  handleAddUser = () => {
    api.addNewUser()
    .then((res) => {
      this.setState({
        isAddUserPopupOpen: false,
        newId: res.id,
      });
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  render() {
    return (
      <div className="body">
        <div className="page">
          <Header />
          <Routes>
            <Route path="/" element={<Main
              users={this.state.users}
              pages={this.state.pages}
              onEditUser={this.handleEditUserClick}
              onAddUser={this.handleAddUserClick}
              onSelectedUser={this.setStateSelectedUser}
              selectedUser={this.state.selectedUser}
              onDeleteUser={this.handleDeleteUser}
              changeUsers={this.changeUsers}
              setIndexUser={this.setIndexUser}
              onPage={this.handleGetUsers} />} />
            {/* <Route path="register" element={<Register />}/> */}
            {/* <Route path="login" element={<Login />}/> */}
          </Routes>
          <Footer />
        </div>
        <EditUserPopup
          isOpen={this.state.isEditUserPopupOpen}
          onClose={this.closeAllPopups}
          selectedUser={this.state.selectedUser}
          onSelectedUser={this.setStateSelectedUser}
          onUpdateUser={this.handleEditUser}
          users={this.state.users}
          changeUsers={this.changeUsers}
          indexUser={this.state.indexUser} />
        <AddUserPopup
          onAddUser={this.handleAddUser}
          isOpen={this.state.isAddUserPopupOpen}
          onClose={this.closeAllPopups}
          users={this.state.users}
          id={this.state.newId} />
        {/* <InfoTooltip /> */}
      </div>
    );
  }
}

export default App;
