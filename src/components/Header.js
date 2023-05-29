import { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav>
          <ul className="header__list">
            <Routes>
              {
              this.props.isLoggedIn ?
              <>
                <Route path="/main" element={<li><Link className="header__link" to="/login" onClick={this.props.handleLogout}>Выйти</Link></li>} />
                <Route path="*" element={<li><Link className="header__link" to="/main">Главная</Link></li>} />
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