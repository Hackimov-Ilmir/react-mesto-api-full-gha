import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className='card'>
      <img
        src={card.link}
        alt={card.name}
        className='card__image'
        onClick={handleClick}
      />
      <div className='card__bottom'>
        <h2 className='card__description'>{card.name}</h2>
        <div>
          <button
            className={`card__button ${isLiked && 'card__button_active'}`}
            type='button'
            onClick={handleLikeClick}
          ></button>
          <p className='card__like-count'>{card.likes.length}</p>
        </div>
      </div>
      <button
        className={`card__delete-button ${
          isOwn && 'card__delete-button_visible'
        }`}
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
