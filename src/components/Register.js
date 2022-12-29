import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({email, password});
  }

  function handleEmail(evt) {
    setEmail(evt.target.value)
  }

  function handlePassword(evt) {
    setPassword(evt.target.value)
  }

  return (
    <>
      <div className="auth">
        <form onSubmit={handleSubmit} className="auth__content">
          <h3 className="auth__title">Регистрация</h3>
          <input
            value={email}
            className="auth__data"
            onChange={handleEmail}
            name="email"
            type="email"
            placeholder="E-mail"
            minLength="2"
            maxLength="200"
            title="Длина поля должна быть 2 и более символов и менее или равно 200"
            required
          />
          <input
            value={password}
            className="auth__data"
            onChange={handlePassword}
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="30"
            title="Длина поля должна быть 2 и более символов и менее или равно 30"
            required
          />
          <button className="auth__button">Зарегистрироваться</button>
          <Link to="/sign-in" className="auth__signup-ask">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </>
  );
}

export default Register;
