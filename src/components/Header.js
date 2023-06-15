import { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Modal } from 'antd';

class Header extends Component {
  handleLogoutConfirm = () => {
    Modal.confirm({
      title: 'Вы уверены, что хотите выйти из аккаунта?',
      onOk: () => this.props.handleLogout(),
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

  render() {
    return (
      <header className="header">
        <nav>
          <ul className="header__list">
            <Routes>
              {
              this.props.isLoggedIn ?
              <>
                <Route path="/" element={<li><Link className="header__link" to="/login" onClick={this.handleLogoutConfirm}>Выйти</Link></li>} />
                <Route path="*" element={<li><Link className="header__link" to="/">Главная</Link></li>} />
              </>
              :
              <>
                <Route path="/login" element={<li><Link className="header__link" to="/register" onClick={this.props.setIsRegister}>Регистрация</Link></li>} />
                <Route path="/register" element={<li><Link className="header__link" to="/login">Войти</Link></li>} />
                <Route path="*" element={
                  <>
                    <li><Link className="header__link" to="/register" onClick={this.props.setIsRegister}>Регистрация</Link></li>
                    <li><Link className="header__link" to="/login">Войти</Link></li>
                  </>
                } />
              </>
              }
            </Routes>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;