import { Component } from 'react';
import Input from './Input';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

class EditUserPopup extends Component {
  constructor(props) {
    super(props);

    this.editSchema = Yup.object().shape({
      name: Yup.string()
      .min(2, 'Слишком короткое имя')
      .max(30, 'Слишком длинное имя')
      .required('Обязательное поле для заполнения'),
      surname: Yup.string()
      .min(2, 'Слишком короткая фамилия')
      .max(30, 'Слишком длинная фамилия')
      .required('Обязательное поле для заполнения'),
      email: Yup.string()
      .email('Некорректный e-mail')
      .required('Обязательное поле для заполнения'),
      avatar: Yup.string()
      .url('Некорректный url')
    });
  }

  //Редактирование данных, сброс стандратного поведения формы, закрытие попапа редактирования и перезапись данных

  handleSubmit = (values) => {
    const { name, surname, email, avatar } = values;
    this.props.onUpdateUser();
    this.props.users[this.props.indexUser].first_name = name;
    this.props.users[this.props.indexUser].last_name = surname;
    this.props.users[this.props.indexUser].email = email;
    this.props.users[this.props.indexUser].avatar = avatar || 'https://shkolasam.gosuslugi.ru/netcat_files/9/164/avatar_scaled_19.jpeg';
  }

  render() {
    return (
      <div className={`popup ${this.props.isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button className="popup__exit-button" type="button" onClick={this.props.onClose}></button>
          <h2 className="popup__label">Редактировать пользователя</h2>
          <Formik enableReinitialize initialValues={{
              name: this.props.selectedUser.first_name,
              surname: this.props.selectedUser.last_name,
              email: this.props.selectedUser.email,
              avatar: this.props.selectedUser.avatar,
            }}
            validationSchema={this.editSchema}
            onSubmit={this.handleSubmit}>
            {
              ({ values, errors, touched, handleChange }) => (
                <Form className="popup__form" name="edit" noValidate>
                  <Input values={values.name} errors={errors.name} touched={touched.name} handleChange={handleChange} name="name" placeholder="Имя" type="text" />
                  <Input values={values.surname} errors={errors.surname} touched={touched.surname} handleChange={handleChange} name="surname" placeholder="Фамилия" type="text" />
                  <Input values={values.email} errors={errors.email} touched={touched.email} handleChange={handleChange} name="email" placeholder="E-mail" type="email" />
                  <Input values={values.avatar} errors={errors.avatar} touched={touched.avatar} handleChange={handleChange} name="avatar" placeholder="Ссылка на аватар" type="url" />
                  <button className="popup__button" type="submit">Обновить</button>
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
    )
  }
}

export default EditUserPopup;