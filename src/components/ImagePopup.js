function ImagePopup({ card, onClose }) {
  return (
    <div
      className={
        Object.keys(card).length !== 0
          ? "popup popup_show popup_image_open"
          : "popup"
      }
      onClose={onClose}
    >
      <div className="popup__image-opened">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img src={card.link} className="popup__image" alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup;
