import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ link, text, signOut, email }) {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Лого' />
      <div className='header__menu'>
        {email && <p className='header__link'>{email}</p>}
        <Link className='header__link' to={link} onClick={signOut}>
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
