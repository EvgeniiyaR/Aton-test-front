import { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <a className="footer__link" href="https://github.com/EvgeniiyaR" target="_blank" rel="noopener noreferrer">Романченко Евгения</a>
      </footer>
    )
  }
}

export default Footer;