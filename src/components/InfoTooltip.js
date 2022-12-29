import React from "react";
import rejectImg from "../images/LoginReject.svg";
import successImg from "../images/LoginSuccess.svg";

function InfoTooltip({ isOpen, onClose, isSuccessReg }) {
  return (
    <div className={isOpen ? "popup popup_show" : "popup"}>
      <div className="popup__content popup__tooltip">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          src={isSuccessReg ? successImg : rejectImg}
          alt={
            isSuccessReg
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так. Попробуйте еще раз!"
          }
          className="popup__tooltip_image"
        />
        <p className="popup__tooltip_info">
          {isSuccessReg
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так. Попробуйте еще раз!"}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;

{
  /* {isSuccessReg ? (
        <>
          <img
            src={`${successImg}`}
            className="popup__tooltip_image"
            alt="Успешная регистрация"
          />
          <p className="popup__tooltip_info">Вы успешно зарегистрировались!</p>
        </>
      ) : (
        <>
          <img
            src={`${rejectImg}`}
            className="popup__tooltip_image"
            alt="Отказ в регистрации"
          />
          <p className="popup__tooltip_info">
            Что-то пошло не так. Попробуйте еще раз!
          </p>
        </>
      )} */
}
