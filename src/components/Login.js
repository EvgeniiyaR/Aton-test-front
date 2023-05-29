import { Component } from 'react';
import AuthForm from './AuthForm';

class Login extends Component {
  render() {
    return (
      <section className="form">
        <AuthForm heading="Вход" buttonText="Войти" name="login" handleSubmit={this.props.handleLogin} />
      </section>
    )
  }
}

export default Login;