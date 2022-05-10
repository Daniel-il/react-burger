import React from "react";
import headerStyles from "./AppHeader.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}>
        <nav className={headerStyles.header__navigation}>
          <div className={headerStyles.header__item}>
            <BurgerIcon type="primary" />
            <a
              href="#"
              style={{ textDecoration: "none", color: "white" }}
              className="text text_type_main-default ml-2"
            >
              Конструктор
            </a>
          </div>
          <div className={headerStyles.header__item}>
            <ListIcon type="secondary" />
            <a
              href="#"
              style={{ textDecoration: "none" }}
              className="text text_type_main-default text_color_inactive ml-2"
            >
              Лента заказов
            </a>
          </div>
        </nav>
        <Logo />
        <div className={headerStyles.header__item}>
            <ProfileIcon type="secondary" />
            <a
              href="#"
              style={{ textDecoration: "none" }}
              className="text text_type_main-default text_color_inactive ml-2"
            >
              Личный кабинет
            </a>
          </div>
      </header>
    );
  }
}
export default AppHeader;
