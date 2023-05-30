import { Component } from 'react';
import User from './User';
import Page from './Page';
import Loader from './Loader';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 1,
      isDisabledNextButton: false,
      isDisabledPrevButton: true,
      perPage: 5,
    };
  }

  //Установка выбранной страницы

  setSelectedPage = (page) => {
    this.setState({
      selectedPage: page,
    });
  }

  //Установка кнопок в состояние disabled true/false

  setDisabledNextButton = (isDisabled) => {
    this.setState({
      isDisabledNextButton: isDisabled,
    });
  }

  setDisabledPrevButton = (isDisabled) => {
    this.setState({
      isDisabledPrevButton: isDisabled,
    });
  }

  //Рендер таблицы по API (серверная пагинация) по нажатию на след и пред кнопки

  handleSelectedNextPageClick = () => {
    let page = this.state.selectedPage;
    if (page === 1) {
      page += 1;
      if (this.props.pages === 2) {
        this.setState({
          isDisabledPrevButton: false,
          isDisabledNextButton: true,
          selectedPage: page,
        });
      } else {
        this.setState({
          isDisabledPrevButton: false,
          selectedPage: page,
        });
      }
    } else if (page + 1 === this.props.pages) {
      page += 1;
      this.setState({
        isDisabledNextButton: true,
        selectedPage: page,
      });
    } else if (page < this.props.pages) {
      page += 1;
      this.setState({
        isDisabledPrevButton: false,
        selectedPage: page,
      });
    }
    this.props.setIsLoading(false);
    this.props.onPage(page, this.state.perPage);
  }

  handleSelectedPrevPageClick = () => {
    let page = this.state.selectedPage;
    if (page === this.props.pages) {
      page -= 1;
      if (this.props.pages === 2) {
        this.setState({
          isDisabledPrevButton: true,
          isDisabledNextButton: false,
          selectedPage: page,
        });
      } else {
        this.setState({
          isDisabledNextButton: false,
          selectedPage: page,
        });
      }
    } else if (page - 1 === 1) {
      page -= 1;
      this.setState({
        isDisabledPrevButton: true,
        selectedPage: page,
      });
    } else if (page < this.props.pages) {
      page -= 1;
      this.setState({
        isDisabledPrevButton: false,
        selectedPage: page,
      });
    }
    this.props.setIsLoading(false);
    this.props.onPage(page, this.state.perPage);
  }

  //Функция отслеживает изменение value в select и рендерит страницу по API c 1 страницы

  handleChange = (e) => {
    this.setState({
      perPage: Number(e.target.value),
      selectedPage: 1,
      isDisabledPrevButton: true,
      isDisabledNextButton: false,
    });
    this.props.setIsLoading(false);
    this.props.onPage(1, Number(e.target.value));
  }

  render() {
    return (
      <main className="main">
        {this.props.isLoading ?
        <table className="table">
          <thead className="table__head">
            <tr>
              <th></th>
              <th className="table__heading table__heading_type_name">Имя</th>
              <th className="table__heading table__heading_type_surname">Фамилия</th>
              <th className="table__heading table__heading_type_email">E-mail</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.props.users.map(({ id, ...props }) => (
            <tr className="table__row" key={id}>
              <User
                user={props}
                id={id}
                onEditUser={this.props.onEditUser}
                onSelectedUser={this.props.onSelectedUser}
                selectedUser={this.props.selectedUser}
                onDeleteUser={this.props.onDeleteUser}
                users={this.props.users}
                changeUsers={this.props.changeUsers}
                setIndexUser={this.props.setIndexUser}
                infoList={this.props.infoList}
                setInfoList={this.props.setInfoList}
                setIsError={this.props.setIsError} />
            </tr>
          ))}
          </tbody>
        </table>
        :
        <Loader />
        }
        <button className="table__button" onClick={this.props.onAddUser} type="button">Добавить пользователя</button>
        <div className="table__page-container">
          <ul className="table__page-list">
            <li><button className="table__button-page" onClick={this.handleSelectedPrevPageClick} disabled={this.state.isDisabledPrevButton}>❮</button></li>
          {[...Array(this.props.pages).keys()].map((i) => (
            <li key={i + 1} >
              <Page
                onPage={this.props.onPage}
                id={i + 1}
                setSelectedPage={this.setSelectedPage}
                selectedPage={this.state.selectedPage}
                pages={this.props.pages}
                setDisabledNextButton={this.setDisabledNextButton}
                setDisabledPrevButton={this.setDisabledPrevButton}
                perPage={this.state.perPage}
                setIsLoading={this.props.setIsLoading} />
            </li>
          ))}
            <li><button className="table__button-page" onClick={this.handleSelectedNextPageClick} disabled={this.state.isDisabledNextButton}>❯</button></li>
          </ul>
          <label className="table__page-label">Элементов на странице
            <select onChange={this.handleChange} name="per-page">
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
          </label>
        </div>
      </main>
    )
  }
}

export default Main;