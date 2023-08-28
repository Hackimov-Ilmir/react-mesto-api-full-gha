class Api {
  #url;
  #headers;
  #authorization;

  constructor(options) {
    this.#url = options.baseUrl;
    this.#headers = options.headers;
    this.#authorization = this.#headers.authorization;
  }

  #checkServerStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.#url}/cards`, {
      headers: {
        authorization: this.#authorization,
      },
    }).then((res) => this.#checkServerStatus(res));
  }

  getUserInfo() {
    return fetch(`${this.#url}/users/me`, {
      headers: {
        authorization: this.#authorization,
      },
    }).then((res) => this.#checkServerStatus(res));
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this.#checkServerStatus(res));
  }

  addNewCard({ name, link }) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this.#checkServerStatus(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.#url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
    });
  }

  putCardLike(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
    }).then((res) => this.#checkServerStatus(res));
  }

  deleteCardLike(cardId) {
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
    }).then((res) => this.#checkServerStatus(res));
  }

  updateAvatar({ avatar }) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.#authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this.#checkServerStatus(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.hackimov.mesto.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
