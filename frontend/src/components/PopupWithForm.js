import React from 'react';

function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <h2 className='popup__title'>{title}</h2>
        <form className='form' name={name} noValidate onSubmit={onSubmit}>
          {children}
        </form>
        <button
          className='popup__close-button'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
