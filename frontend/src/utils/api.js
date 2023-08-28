class Api {
  #url;
  #headers;
  #authorization;

  constructor(options) {
    this.#url = options.baseUrl;
    this.#headers = options.headers;
  }

  #checkServerStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this.#checkServerStatus(res));
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this.#checkServerStatus(res));
  }

  updateUserInfo({ name, about }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this.#checkServerStatus(res));
  }

  addNewCard({ name, link }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this.#checkServerStatus(res));
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  putCardLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this.#checkServerStatus(res));
  }

  deleteCardLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this.#checkServerStatus(res));
  }

  updateAvatar({ avatar }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
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
});

export { api };
