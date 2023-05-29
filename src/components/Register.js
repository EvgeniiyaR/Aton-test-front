import { Component } from 'react';
import AuthForm from './AuthForm';

class Register extends Component {
  render() {
    return (
      <section className="form">
        <AuthForm heading="Регистрация" buttonText="Зарегистрироваться" name="register" handleSubmit={this.props.handleRegister} />
      </section>
    )
  }
}

export default Register;