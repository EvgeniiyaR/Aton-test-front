import { Component } from 'react';
import Input from './Input';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

class Register extends Component {
  constructor(props) {
    super(props);

    this.regSchema = Yup.object().shape({
      email: Yup.string()
      .email('Некорректный email')
      .required('Введите email'),
      password: Yup.string()
      .min(8, 'Минимальная длина пароля 8 символов')
      .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g, 'Пароль должен содержать хотя бы одно число, заглавную и прописную латинские буквы')
      .required('Введите пароль'),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
      .min(8, 'Минимальная длина пароля 8 символов')
      .required('Повторите пароль')
    });
  }

  handleSubmit = (values) => {
    const { email, password } = values;
    this.props.handleRegister(email, password);
  }

  render() {
    return (
      <section className="form">
        <h1 className="form__heading">Регистрация</h1>
        <Formik initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={this.regSchema}
        onSubmit={this.handleSubmit}>
          {
            ({ values, errors, touched, handleChange }) => (
              <Form className="form__form" name="register" noValidate>
                <Input values={values.email} errors={errors.email} touched={touched.email} handleChange={handleChange} isError={this.props.isError} name="email" placeholder="E-mail" type="email" isPopup={false} />
                <Input values={values.password} errors={errors.password} touched={touched.password} handleChange={handleChange} isError={this.props.isError} name="password" placeholder="Пароль" type="password" isPopup={false} />
                <Input values={values.confirmPassword} errors={errors.confirmPassword} touched={touched.confirmPassword} handleChange={handleChange} isError={this.props.isError} name="confirmPassword" placeholder="Повторите пароль" type="password" isPopup={false} />
                <button className="form__button" type="submit">Зарегистрироваться</button>
              </Form>
            )
          }
        </Formik>
        {this.props.children}
      </section>
    )
  }
}

export default Register;