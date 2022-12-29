import logo from "../images/logo.svg";
import { Switch, Route, Link } from "react-router-dom";

function Header({ userEmail, onLogOut }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место Россия" />
      <Switch>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-data">
            <p className="header__email">{userEmail}</p>
            <Link className="header__link" to="/sign-in" onClick={onLogOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
