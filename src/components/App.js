import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import api from '../utils/Api.js';
import auth from '../utils/Auth.js';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import EditUserPopup from './EditUserPopup';
import AddUserPopup from './AddUserPopup';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';

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
      isLoadingGlobal: false,
      isLoading: false,
      infoList: [],
      indexInfo: null,
      isLoggedIn: false,
      isRegister: false,
    };
  }

  //Монтирование пользователей в таблицу посредством обращения к API

  componentDidMount() {
    api.getUsersInfo()
    .then((res) => {
      this.setState({
        users: res.data,
        pages: res.total_pages,
        isLoadingGlobal: true,
        isLoading: true,
      });
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
    this.checkToken();
  }

  //Регистрация

  handleRegister = (email, password) => {
    auth.register(email, password)
    .then(() => {
      const list = this.state.infoList;
      list.push('Регистрация прошла успешно!');
      this.setState({
        isRegister: true,
      });
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Аутентификация

  handleLogin = (email, password) => {
    auth.login(email, password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      this.setState({
        isLoggedIn: true,
      })
      const list = this.state.infoList;
      list.push('Добро пожаловать!');
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Выход

  handleLogout = () => {
    auth.logout()
    .then(() => {
      localStorage.removeItem('token');
      this.setState({
        isLoggedIn: false,
        isRegister: false,
      });
      const list = this.state.infoList;
      list.push('До встречи!');
    })
  }

  //Проверка токена

  checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        isLoggedIn: true,
      })
    }
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

  //Установка стейта загрузки

  setIsLoading = (isLoading) => {
    this.setState({ isLoading });
  }

  //Установка стейта списка оповещений

  setInfoList = (infoList) => {
    this.setState({ infoList });
  }

  //Закрытие всех попапов

  closeAllPopups = () => {
    this.setState({
      isEditUserPopupOpen: false,
      isAddUserPopupOpen: false,
      selectedUser: {
        id: '',
        first_name: '',
        last_name: '',
        email_name: '',
        avatar_name: '',
      },
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
        isLoading: true,
      })
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Запрос по API редактирования пользователя

  handleEditUser = () => {
    api.editUserInfo(this.state.selectedUser.id)
    .then(() => {
      const list = this.state.infoList;
      list.push('Данные пользователя обновлены!');
      this.setState({
        isEditUserPopupOpen: false,
        infoList: list,
      });
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Запрос по API удаления пользователя

  handleDeleteUser = () => {
    api.deleteUserInfo(this.state.selectedUser.id)
    .then(() => {
      const list = this.state.infoList;
      list.push('Пользователь удален!');
      this.setState({
        selectedUser: {
          id: null,
          first_name: '',
          last_name: '',
          email_name: '',
          avatar_name: '',
        },
        infoList: list,
      });
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Запрос по API добавления пользователя

  handleAddUser = () => {
    api.addNewUser()
    .then((res) => {
      const list = this.state.infoList;
      list.push(`Пользователь добавлен! ID ${res.id}`);
      this.setState({
        isAddUserPopupOpen: false,
        newId: res.id,
        infoList: list,
      });
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }

  //Переключение флага регистрации

  setIsRegister = () => {
    this.setState({
      isRegister: false,
    })
  }

  render() {
    return (
      <div className="body">
        <div className="page">
          <Header handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} setIsRegister={this.setIsRegister}/>
          <Routes>
            <Route path="/main" element={
              <ProtectedRoute element={
              this.state.isLoadingGlobal ?
                <Main
                  users={this.state.users}
                  pages={this.state.pages}
                  onEditUser={this.handleEditUserClick}
                  onAddUser={this.handleAddUserClick}
                  onSelectedUser={this.setStateSelectedUser}
                  selectedUser={this.state.selectedUser}
                  onDeleteUser={this.handleDeleteUser}
                  changeUsers={this.changeUsers}
                  setIndexUser={this.setIndexUser}
                  onPage={this.handleGetUsers}
                  isLoading={this.state.isLoading}
                  setIsLoading={this.setIsLoading} />
                :
                <div>
                  <h2>Загрузка...</h2>
                </div>
              } isLoggedIn={this.state.isLoggedIn} />} />
            <Route path="/register" element={this.state.isLoggedIn ? <Navigate to="/main" replace /> : this.state.isRegister ? <Navigate to="/login" replace /> : <Register handleRegister={this.handleRegister} />} />
            <Route path="/login" element={this.state.isLoggedIn ? <Navigate to="/main" replace /> : <Login handleLogin={this.handleLogin} />} />
            <Route path="*" element={<NotFound />} />
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
        <InfoTooltip infoList={this.state.infoList} setInfoList={this.setInfoList} />
      </div>
    );
  }
}

export default App;
