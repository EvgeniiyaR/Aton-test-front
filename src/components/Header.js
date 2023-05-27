import { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav>
            <ul className="header__list">
                <li><Link className="header__link" to="/register">Регистрация</Link></li>
                <li><Link className="header__link" to="/login">Войти</Link></li>
                <li><Link className="header__link" to="/login">Выйти</Link></li>
            </ul>
          </nav>
      </header>
    )
  }
}

export default Header;