import { Component } from 'react';
import Input from './Input';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

class AddUserPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChangeAdd: true,
    }

    this.addSchema = Yup.object().shape({
      name: Yup.string()
      .min(2, 'Слишком короткое имя')
      .max(30, 'Слишком длинное имя')
      .required('Введите имя'),
      surname: Yup.string()
      .min(2, 'Слишком короткая фамилия')
      .max(30, 'Слишком длинная фамилия')
      .required('Введите фамилию'),
      email: Yup.string()
      .email('Некорректный e-mail')
      .required('Введите e-mail'),
      avatar: Yup.string()
      .url('Некорректный url')
    });
  }

  setIsChange = (isChangeAdd) => {
    this.setState({ isChangeAdd });
  }

  //Редактирование данных, сброс стандратного поведения формы, закрытие попапа редактирования и перезапись данных

  handleSubmit = (values) => {
    this.props.onAddUser();
    this.props.users.unshift({
      id: Number(this.props.id),
      first_name: values.name,
      last_name: values.surname,
      email: values.email,
      avatar: values.avatar || 'https://shkolasam.gosuslugi.ru/netcat_files/9/164/avatar_scaled_19.jpeg',
    });
  }

  render() {
    return (
      <div className={`popup ${this.props.isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button className="popup__exit-button" type="button" onClick={this.props.onClose}></button>
          <h2 className="popup__label">Добавить пользователя</h2>
      <Formik enableReinitialize validateOnChange validateOnBlur initialValues={{
        name: '',
        surname: '',
        email: '',
        avatar: '',
      }}
      validationSchema={this.addSchema}
      onSubmit={this.handleSubmit}>
      {
        ({ values, errors, touched, handleChange }) => (
          <Form className="popup__form" name="add" noValidate>
            <Input values={values.name} errors={errors.name} touched={touched.name} handleChange={handleChange} name="name" placeholder="Имя" type="text" isPopup={true} setIsChange={this.setIsChange} />
            <Input values={values.surname} errors={errors.surname} touched={touched.surname} handleChange={handleChange} name="surname" placeholder="Фамилия" type="text" isPopup={true} setIsChange={this.setIsChange} />
            <Input values={values.email} errors={errors.email} touched={touched.email} handleChange={handleChange} name="email" placeholder="E-mail" type="email" isPopup={true} setIsChange={this.setIsChange} />
            <Input values={values.avatar} errors={errors.avatar} touched={touched.avatar} handleChange={handleChange} name="avatar" placeholder="Ссылка на аватар" type="url" setIsChange={this.setIsChange} />
            <button className="popup__button" type="submit" disabled={!!errors.name || !!errors.surname || !!errors.email || this.state.isChangeAdd}>Сохранить</button>
          </Form>
        )
      }
    </Formik>
      </div>
    </div>
    )
  }
}

export default AddUserPopup;