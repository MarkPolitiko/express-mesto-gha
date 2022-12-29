import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={"Редактировать профиль"}
      button={"Сохранить"}
    >
      <div className="popup__input-container">
        <input
          value={name}
          onChange={handleChangeName}
          className="popup__input popup__input_type_name"
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          title="Длина поля должна быть 2 и более символов и менее или равно 40"
          required
        />
        <span className="popup__input-error nameInput-error popup__input-error_field_name"></span>
      </div>
      <div className="popup__input-container">
        <input
          value={description}
          onChange={handleChangeDescription}
          className="popup__input popup__input_type_description"
          id="descriptionInput"
          name="about"
          type="text"
          placeholder="Род деятельности"
          minLength="2"
          maxLength="200"
          title="Длина поля должна быть 2 и более символов и менее или равно 200"
          required
        />
        <span className="popup__input-error descriptionInput-error popup__input-error_field_description"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
