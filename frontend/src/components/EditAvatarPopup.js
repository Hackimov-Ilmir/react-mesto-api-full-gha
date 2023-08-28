import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='update-avatar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='url'
        className='form__input form__input_type_url'
        name='input_url_avatar'
        placeholder='Ссылка на аватар'
        required
        id='form__avatar-url-input'
        ref={ref}
      />
      <span className='form__input-error' id='form__avatar-url-input-error'>
        Введите адрес сайта.
      </span>
      <button
        className='form__save-button form__save-button_update-avatar'
        type='submit'
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
