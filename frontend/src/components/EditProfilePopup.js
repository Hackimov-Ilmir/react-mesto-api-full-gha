import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='form__input form__input_type_nickname'
        name='input_nickname'
        placeholder='Имя'
        required
        minLength='2'
        maxLength='40'
        id='form__name-input'
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className='form__input-error' id='form__name-input-error'>
        Вы пропустили это поле.
      </span>
      <input
        type='text'
        className='form__input form__input_type_description'
        name='input_description'
        placeholder='Вид деятельности'
        required
        minLength='2'
        maxLength='200'
        id='form__description-input'
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span className='form__input-error' id='form__description-input-error'>
        Вы пропустили это поле.
      </span>
      <button
        className='form__save-button form__save-button_profile-edit'
        type='submit'
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
