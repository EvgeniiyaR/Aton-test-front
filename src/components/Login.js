import { Component } from 'react';
import Input from './Input';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

class Login extends Component {
  constructor(props) {
    super(props);

    this.loginSchema = Yup.object().shape({
      email: Yup.string()
      .email('Некорректный email')
      .required('Введите email'),
      password: Yup.string()
      .required('Введите пароль'),
    });
  }

  handleSubmit = (values) => {
    const { email, password } = values;
    this.props.handleLogin(email, password);
  }

  render() {
    return (
      <section className="form">
        <h1 className="form__heading">Вход</h1>
        <Formik initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={this.loginSchema}
        onSubmit={this.handleSubmit}>
          {
            ({ values, errors, touched, handleChange }) => (
              <Form className="form__form" name="login" noValidate>
                <Input values={values.email} errors={errors.email} touched={touched.email} handleChange={handleChange} isError={this.props.isError} name="email" placeholder="E-mail" type="email" isPopup={false} />
                <Input values={values.password} errors={errors.password} touched={touched.password} handleChange={handleChange} isError={this.props.isError} name="password" placeholder="Пароль" type="password" isPopup={false} />
                <button className="form__button" type="submit">Войти</button>
              </Form>
            )
          }
        </Formik>
        {this.props.children}
      </section>
    )
  }
}

export default Login;