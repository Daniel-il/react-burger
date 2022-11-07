import headerStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
export default function AppHeader() {
  const { isAuth } = useSelector((store) => store.auth);
  const { pathname } = useLocation();
  return (
    <header className={headerStyles.header}>
      <article className={headerStyles.header__wrapper}>
        <nav className={headerStyles.header__navigation}>
          <div className={headerStyles.header__item}>
            <BurgerIcon type="primary" />
            <Link
              className={
                pathname === "/"
                  ? `${headerStyles.header__link_active} text text_type_main-default  ml-2`
                  : `${headerStyles.header__link} text text_type_main-default text_color_inactive ml-2`
              }
              to="/"
            >
              Конструктор
            </Link>
          </div>
          <div className={headerStyles.header__item}>
            <ListIcon type="secondary" />
            <Link
              className={
                pathname === "/feed"
                  ? `${headerStyles.header__link_active} text text_type_main-default  ml-2`
                  : `${headerStyles.header__link} text text_type_main-default text_color_inactive ml-2`
              }
              to="/feed"
            >
              Лента заказов
            </Link>
          </div>
        </nav>
        <Logo />
        <div className={headerStyles.header__profile}>
          <ProfileIcon type="secondary" />
          <Link
            to={isAuth ? "/profile" : "/login"}
            className={
              pathname === "/profile" || pathname === '/login'
                ? `${headerStyles.header__link_active} text text_type_main-default  ml-2`
                : `${headerStyles.header__link} text text_type_main-default text_color_inactive ml-2`
            }
          >
            Личный кабинет
          </Link>
        </div>
      </article>
    </header>
  );
}
