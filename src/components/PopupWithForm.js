function PopupWithForm({isOpen, onClose, onSubmit, title, name, children, button}) {
  
  return (
    <div
      className={isOpen ? "popup popup_show" : "popup"}
    >
      <div className="popup__content">
        <legend className="popup__title">{title}</legend>
        <form
          className={`popup__form popup__form_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__save-button popup__save-button_${name}`}
            name={name}
            type="submit"
          >
            {button}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
