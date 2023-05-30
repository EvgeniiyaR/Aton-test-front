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
import Loader from './Loader';

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
      isError: false,
    };
  }

  //Монтирование пользователей в таблицу посредством обращения к API

  componentDidMount() {
    this.handleGetUsersInfo();
  }

  //Получение данных при первом обовлении страницы

  handleGetUsersInfo = () => {
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

  //Регистрация по API

  handleRegister = (email, password) => {
    const list = this.state.infoList;
    auth.register(email, password)
    .then(() => {
      list.push('Регистрация прошла успешно!');
      this.setState({
        isRegister: true,
        isError: false,
      });
    })
    .catch((err) => {
      this.setState({
        isError: true,
      });
      list.push('Возникла ошибка!');
      console.log(`Возникла ошибка: ${err}`);
    });
  }

  //Аутентификация по API

  handleLogin = (email, password) => {
    const list = this.state.infoList;
    auth.login(email, password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      this.handleGetUsersInfo();
      this.setState({
        isLoggedIn: true,
        isError: false,
      });
      list.push('Добро пожаловать!');
    })
    .catch((err) => {
      this.setState({
        isError: true,
      });
      list.push('Возникла ошибка!');
      console.log(`Возникла ошибка: ${err}`);
    });
  }

  //Выход по API

  handleLogout = () => {
    const list = this.state.infoList;
    auth.logout()
    .then(() => {
      localStorage.removeItem('token');
      this.setState({
        isLoggedIn: false,
        isRegister: false,
        isError: false,
      });
      list.push('До встречи!');
    })
    .catch((err) => {
      this.setState({
        isError: true,
      });
      list.push('Возникла ошибка!');
      console.log(`Возникла ошибка: ${err}`);
    })
  }

  //Проверка токена

  checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        isLoggedIn: true,
      });
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

  //Установка стейта оповещения об ошибке

  setIsError = (isError) => {
    this.setState({ isError });
  }

  //Функция для переключения флага регистрации в значение false

  setIsRegister = () => {
    this.setState({
      isRegister: false,
    });
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
    const list = this.state.infoList;
    api.editUserInfo(this.state.selectedUser.id)
    .then(() => {
      list.push('Данные пользователя обновлены!');
      this.setState({
        isEditUserPopupOpen: false,
        infoList: list,
        isError: false,
      });
    })
    .catch((err) => {
      this.setState({
        isError: true,
      });
      list.push('Возникла ошибка!');
      console.log(`Возникла ошибка: ${err}`);
    });
  }

  //Запрос по API удаления пользователя

  handleDeleteUser = () => {
    const list = this.state.infoList;
    api.deleteUserInfo(this.state.selectedUser.id)
    .then(() => {
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
        isError: false,
      });
    })
    .catch((err) => {
      this.setState({
        isError: true,
      });
      list.push('Возникла ошибка!');
      console.log(`Возникла ошибка: ${err}`);
    });
  }

  //Запрос по API добавления пользователя

  handleAddUser = () => {
    const list = this.state.infoList;
    api.addNewUser()
    .then((res) => {
      list.push(`Пользователь добавлен! ID ${res.id}`);
      this.setState({
        isAddUserPopupOpen: false,
        newId: res.id,
        infoList: list,
        isError: false,
      });
    })
    .catch((err) => {
      this.setState({
        isError: true,
      });
      list.push('Возникла ошибка!');
      console.log(`Возникла ошибка: ${err}`);
    });
  }

  render() {
    return (
      <div className="body">
        <div className="page">
          <Header
            handleLogout={this.handleLogout}
            isLoggedIn={this.state.isLoggedIn}
            setIsRegister={this.setIsRegister} />
          <Routes>
            <Route path="/" element={
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
                  setIsLoading={this.setIsLoading}
                  infoList={this.state.infoList}
                  setInfoList={this.setInfoList}
                  setIsError={this.setIsError} />
                :
                <Loader />
              } isLoggedIn={this.state.isLoggedIn} />} />
            <Route path="/register" element={this.state.isLoggedIn ? <Navigate to="/" replace /> : this.state.isRegister ? <Navigate to="/login" replace /> : <Register handleRegister={this.handleRegister} />} />
            <Route path="/login" element={this.state.isLoggedIn ? <Navigate to="/" replace /> : <Login handleLogin={this.handleLogin} />} />
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
        <InfoTooltip
          infoList={this.state.infoList}
          setInfoList={this.setInfoList}
          isError={this.state.isError} />
      </div>
    );
  }
}

export default App;
