import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__avatar-container' onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt='Аватар'
            className='profile__avatar'
          />
        </div>
        <div className='profile__info'>
          <h1 className='profile__info-nickname'>{currentUser.name}</h1>
          <p className='profile__info-description'>{currentUser.about}</p>
          <button
            className='profile__edit-button'
            type='button'
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className='profile__add-button'
          type='button'
          onClick={onAddPlace}
        ></button>
      </section>
      <section className='cards'>
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          ></Card>
        ))}
      </section>
    </main>
  );
}

export default Main;
