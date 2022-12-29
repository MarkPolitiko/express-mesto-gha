import { useRef, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {

  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef();

  return (
    <>
    <div className="content">
      <section className="profile">
        <div className="profile__description">
          <div className="profile__image-content" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              className="profile__image"
              alt="Аватар пользователя"
              ref={avatarRef}
            />
          </div>
          <div className="profile__status">
            <div className="profile__naming">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </div>
    </>
  );
}

export default Main;