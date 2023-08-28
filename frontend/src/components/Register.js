import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          className='auth__input'
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
        ></input>
        <input
          className='auth__input'
          type='password'
          name='password'
          placeholder='Пароль'
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <button className='auth__button' type='submit'>
          Зарегистрироваться
        </button>
      </form>
      <Link className='auth__link' to='/sign-in'>
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
