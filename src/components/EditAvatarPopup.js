import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={"Обновить аватар"}
      button={"Сохранить"}
    >
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_type_link"
          id="avatar"
          name="avatar"
          type="url"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          required
        />
        <span className="popup__input-error avatarInput-error popup__input-error_field_link"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
