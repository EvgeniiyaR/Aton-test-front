import { Component } from 'react';
import Input from './Input';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.signupSchema = Yup.object().shape({
      email: Yup.string()
      .email('Некорректный email')
      .required('Введите email. Это обязательное поле для заполнения'),
      password: Yup.string()
      .required('Введите пароль. Это обязательное поле для заполнения'),
    });
  }

  handleSubmit = (values) => {
    const { email, password } = values;
    this.props.setIsError(false);
    this.props.handleSubmit(email, password);
  }

  render() {
    return (
      <>
        <h1 className="form__heading">{this.props.heading}</h1>
        <Formik initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={this.signupSchema}
        onSubmit={this.handleSubmit}>
          {
            ({ values, errors, touched, handleChange }) => (
              <Form className="form__form" name={this.props.name} noValidate>
                <Input values={values.email} errors={errors.email} touched={touched.email} handleChange={handleChange} isError={this.props.isError} name="email" placeholder="E-mail" type="email" />
                <Input values={values.password} errors={errors.password} touched={touched.password} handleChange={handleChange} isError={this.props.isError} name="password" placeholder="Пароль" type="password" />
                <button className="form__button" type="submit">{this.props.buttonText}</button>
              </Form>
            )
          }
        </Formik>
        {this.props.children}
      </>
    )
  }
}

export default AuthForm;