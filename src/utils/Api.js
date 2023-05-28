class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      }
		} else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
	}

	getUsersInfo() {
		return fetch(`${this._url}/users/?page=1&per_page=5`, {
			method: "GET",
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
	}

	getUsersPageInfo(page, perPage) {
		return fetch(`${this._url}/users?page=${page}&per_page=${perPage}`, {
			method: "GET",
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
	}

	editUserInfo(id) {
		return fetch(`${this._url}/users/${id}`, {
			method: "PATCH",
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
	}

  deleteUserInfo(id) {
		return fetch(`${this._url}/users/${id}`, {
			method: "DELETE",
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
	}

	addNewUser() {
		return fetch(`${this._url}/users`, {
			method: "POST",
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
	}
}

const api = new Api({
  url: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default api;