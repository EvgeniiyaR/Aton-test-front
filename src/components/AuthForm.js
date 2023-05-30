import { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  //Обновление стейтов при пользовательском вводе

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  //Запрос к API для регистрации/авторизации

  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    this.props.handleSubmit(email, password);
  }

  render() {
    return (
      <>
        <h1 className="form__heading">{this.props.heading}</h1>
        <form className="form__form" onSubmit={this.handleSubmit} name={this.props.name}>
          <input className="form__input" type="email" value={this.state.email || ''} onChange={this.handleChange} name="email" placeholder="Email"></input>
          <input className="form__input" type="password" value={this.state.password || ''} onChange={this.handleChange} name="password" placeholder="Пароль"></input>
          <button className="form__button" type="submit">{this.props.buttonText}</button>
        </form>
        {this.props.children}
      </>
    )
  }
}

export default AuthForm;