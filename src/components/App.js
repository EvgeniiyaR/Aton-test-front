import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import api from '../utils/Api.js';
import auth from '../utils/Auth.js';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import EditUserPopup from './EditUserPopup';
import AddUserPopup from './AddUserPopup';
// import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';
import Loader from './Loader';
import { notification, message } from 'antd';

class App extends Component {
  constructor(props) {
    notification.config({
      maxCount: 5,
      placement: "bottomLeft",
      duration: 5,
      closeIcon: (
        <span className="ant-notification-close-x">
          <span role="img" aria-label="close" className="anticon anticon-close ant-notification-close-icon">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1.3em" height="1.3em" fill="white" aria-hidden="true">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
            </svg>
          </span>
        </span>
      ),
      style: { backgroundColor: "black" },
    });

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
        email: '',
        avatar: '',
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
      notification.success({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Регистрация прошла успешно!
          </div>
        ),
      });
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
      notification.error({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Возникла ошибка!
          </div>
        ),
        description: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Этот логин уже занят!
          </div>
        )
      });
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
      message.info({
        content: 'Добро пожаловать!',
      });
    })
    .catch((err) => {
      this.setState({
        isError: true,
      });
      list.push('Возникла ошибка!');
      notification.error({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Возникла ошибка!
          </div>
        ),
        description: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Пароль или логин не верны. Проверьте введенные данные!
          </div>
        )
      });
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
      message.info({
        content: 'До встречи!',
      });
    })
    .catch((err) => {
      this.setState({
        isError: true,
      });
      list.push('Возникла ошибка!');
      notification.error({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Возникла ошибка!
          </div>
        ),
      });
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
        email: '',
        avatar: '',
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
      notification.success({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Данные пользователя обновлены!
          </div>
        ),
      });
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
      notification.error({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Возникла ошибка!
          </div>
        ),
      });
      console.log(`Возникла ошибка: ${err}`);
    });
  }

  //Запрос по API удаления пользователя

  handleDeleteUser = () => {
    const list = this.state.infoList;
    api.deleteUserInfo(this.state.selectedUser.id)
    .then(() => {
      list.push('Пользователь удален!');
      notification.success({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Пользователь удален!
          </div>
        ),
      });
      this.setState({
        selectedUser: {
          id: null,
          first_name: '',
          last_name: '',
          email: '',
          avatar: '',
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
      notification.error({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Возникла ошибка!
          </div>
        ),
      });
      console.log(`Возникла ошибка: ${err}`);
    });
  }

  //Запрос по API добавления пользователя

  handleAddUser = () => {
    const list = this.state.infoList;
    api.addNewUser()
    .then((res) => {
      list.push(`Пользователь добавлен! ID ${res.id}`);
      notification.success({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Пользователь добавлен! ID {res.id}
          </div>
        ),
      });
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
      notification.error({
        message: (
          <div style={{ color: "rgb(255, 255 ,255)" }}>
            Возникла ошибка!
          </div>
        ),
      });
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
            <Route path="/login" element={this.state.isLoggedIn ? <Navigate to="/" replace /> : <Login isError={this.state.isError} setIsError={this.setIsError} handleLogin={this.handleLogin} />} />
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
        {/* <InfoTooltip
          infoList={this.state.infoList}
          setInfoList={this.setInfoList}
          isError={this.state.isError} /> */}
      </div>
    );
  }
}

export default App;
