function InfoTooltip({ title, icon, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_infotooltip ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className='popup__container'>
        <img className='popup__icon' src={icon} alt={icon} />
        <h2 className='popup__title-infotooltip'>{title}</h2>
        <button
          className='popup__close-button'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
