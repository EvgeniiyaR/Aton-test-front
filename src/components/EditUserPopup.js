import { Component } from 'react';
import Input from './Input';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

class EditUserPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChangeEdit: true,
    }

    this.editSchema = Yup.object().shape({
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

  setIsChange = (isChangeEdit) => {
    this.setState({ isChangeEdit });
  }

  //Редактирование данных, сброс стандратного поведения формы, закрытие попапа редактирования и перезапись данных

  handleSubmit = (values) => {
    this.setState({
      isChangeEdit: true,
    });
    const { name, surname, email, avatar } = values;
    this.props.onUpdateUser();
    this.props.users[this.props.indexUser].first_name = name;
    this.props.users[this.props.indexUser].last_name = surname;
    this.props.users[this.props.indexUser].email = email;
    this.props.users[this.props.indexUser].avatar = avatar || 'https://shkolasam.gosuslugi.ru/netcat_files/9/164/avatar_scaled_19.jpeg';
  }

  handleClosePopup = () => {
    this.props.onClose();
    this.setState({
      isChangeEdit: true,
    });
  }

  render() {
    return (
      <div className={`popup ${this.props.isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button className="popup__exit-button" type="button" onClick={this.handleClosePopup}></button>
          <h2 className="popup__label">Редактировать пользователя</h2>
          <Formik enableReinitialize validateOnChange initialValues={{
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
                  <Input values={values.name} errors={errors.name} touched={touched.name} handleChange={handleChange} name="name" placeholder="Имя" type="text" isPopup={true} setIsChange={this.setIsChange} />
                  <Input values={values.surname} errors={errors.surname} touched={touched.surname} handleChange={handleChange} name="surname" placeholder="Фамилия" type="text" isPopup={true} setIsChange={this.setIsChange} />
                  <Input values={values.email} errors={errors.email} touched={touched.email} handleChange={handleChange} name="email" placeholder="E-mail" type="email" isPopup={true} setIsChange={this.setIsChange} />
                  <Input values={values.avatar} errors={errors.avatar} touched={touched.avatar} handleChange={handleChange} name="avatar" placeholder="Ссылка на аватар" type="url" setIsChange={this.setIsChange} />
                  <button className="popup__button" type="submit" disabled={this.state.isChangeEdit || !!errors.name || !!errors.surname || !!errors.email}>Обновить</button>
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