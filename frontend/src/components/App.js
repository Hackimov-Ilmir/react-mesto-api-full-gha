import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { register, authorize, checkTokenValid } from '../utils/auth';
import success from '../images/success.png';
import fail from '../images/fail.png';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [tooltipTitle, setTooltipTitle] = React.useState('');
  const [tooltipIcon, setTooltipIcon] = React.useState('');
  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function openSuccessTooltip() {
    setIsInfoTooltipPopupOpen(true);
    setTooltipTitle('Вы успешно зарегистрировались!');
    setTooltipIcon(success);
  }

  function openFailTooltip() {
    setIsInfoTooltipPopupOpen(true);
    setTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
    setTooltipIcon(fail);
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkTokenValid(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleLogin(password, email) {
    authorize(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate('/');
        setEmail(email);
      })
      .catch((err) => {
        openFailTooltip();
        console.log(err);
      });
  }

  function handleRegister(password, email) {
    register(password, email)
      .then(() => {
        navigate('/sign-in');
        openSuccessTooltip();
      })
      .catch((err) => {
        openFailTooltip();
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <div className='page'>
          <div className='page__narrow'>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Header
                      link={`/sign-up`}
                      text={`Выйти`}
                      email={email}
                      signOut={signOut}
                    />
                    <ProtectedRoute
                      element={Main}
                      loggedIn={loggedIn}
                      cards={cards}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path='/sign-up'
                element={
                  <>
                    <Header link={`/sign-in`} text={`Войти`} />
                    <Register onRegister={handleRegister} />
                  </>
                }
              />
              <Route
                path='/sign-in'
                element={
                  <>
                    <Header link={`/sign-up`} text={`Регистрация`} />
                    <Login onLogin={handleLogin} />
                  </>
                }
              />
              <Route
                path='/*'
                element={
                  loggedIn ? (
                    <Navigate to='/' replace />
                  ) : (
                    <Navigate to='/sign-in' replace />
                  )
                }
              />
            </Routes>
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip
              title={tooltipTitle}
              icon={tooltipIcon}
              isOpen={isInfoTooltipPopupOpen}
              onClose={closeAllPopups}
            />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
