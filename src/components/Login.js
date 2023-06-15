import { Component } from 'react';
import AuthForm from './AuthForm';

class Login extends Component {
  render() {
    return (
      <section className="form">
        <AuthForm heading="Вход" buttonText="Войти" name="login" handleSubmit={this.props.handleLogin} isError={this.props.isError} setIsError={this.props.setIsError} />
      </section>
    )
  }
}

export default Login;