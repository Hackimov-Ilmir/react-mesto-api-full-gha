function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className='popup__image-container'>
        <img
          src={card && card.link}
          alt={card && card.name}
          className='popup__image'
        />
        <p className='popup__image-description'>{card && card.name}</p>
        <button
          className='popup__close-button'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
