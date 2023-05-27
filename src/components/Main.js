import { Component } from 'react';

class Main extends Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <main className="main">
        <table className="table">
          <thead>
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
            <tr>
              <td><img className="table__photo" src="https://reqres.in/img/faces/2-image.jpg" alt="George Bluth"/></td>
              <td className="table__row">George</td>
              <td className="table__row">Bluth</td>
              <td className="table__row">janet.weaver@reqres.in</td>
              <td><button className="table__btn table__btn_type_edit" type="button"></button></td>
              <td><button className="table__btn table__btn_type_delete" type="button"></button></td>
            </tr>
          </tbody>
        </table>
      </main>
    )
  }
}

export default Main;