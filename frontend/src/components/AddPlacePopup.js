import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title='Новое место'
      name='new-place'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='form__input form__input_type_place-name'
        name='input_placename'
        placeholder='Название'
        required
        minLength='2'
        maxLength='30'
        id='form__place-name-input'
        value={name}
        onChange={handleNameChange}
      />
      <span className='form__input-error' id='form__place-name-input-error'>
        Вы пропустили это поле.
      </span>
      <input
        type='url'
        className='form__input form__input_type_url'
        name='input_url'
        placeholder='Ссылка на картинку'
        required
        id='form__url-input'
        value={link}
        onChange={handleLinkChange}
      />
      <span className='form__input-error' id='form__url-input-error'>
        Введите адрес сайта.
      </span>
      <button
        className='form__save-button form__save-button_new-place'
        type='submit'
      >
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
