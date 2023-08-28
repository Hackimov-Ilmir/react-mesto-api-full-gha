import React from 'react';

function Login({ onLogin }) {
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
    onLogin(password, email);
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
