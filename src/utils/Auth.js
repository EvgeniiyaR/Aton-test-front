class Auth {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
      return res.json();
		}
    return Promise.reject(`Ошибка: ${res.status}`);
	}

	register(email, password) {
		return fetch(`${this._url}/register`, {
			method: 'POST',
			headers: this._headers,
      body: JSON.stringify({ email, password}),
		}).then((res) => this._checkResponse(res));
	}

	login(email, password) {
		return fetch(`${this._url}/login`, {
			method: 'POST',
			headers: this._headers,
      body: JSON.stringify({ email, password}),
		}).then((res) => this._checkResponse(res));
	}

  logout() {
		return fetch(`${this._url}/logout`, {
			method: 'POST',
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
	}
}

const auth = new Auth({
  url: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default auth;