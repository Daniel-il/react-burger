import profileStyles from "./profile.module.css";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
export function ProfilePage() {
  const {pathname} = useLocation();
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const {email, name} = useSelector(store => store.auth.user)
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <section className={profileStyles.profile}>
      <div className={profileStyles.wrapper}>
        <ul className={profileStyles.links}>
          <li className={`${profileStyles.item}`}>
            <Link
              className={ pathname === '/profile' ? `${profileStyles.link_active} text text_type_main-medium` : `${profileStyles.link} text text_type_main-medium text_color_inactive`}
            >
              Профиль
            </Link>
          </li>
          <li className={`${profileStyles.item}`}>
            <Link
              className={`text text_type_main-medium text_color_inactive ${profileStyles.link} `}
            >
              История заказов
            </Link>
          </li>
          <li className={`${profileStyles.item}`}>
            <Link
              className={`text text_type_main-medium text_color_inactive ${profileStyles.link} `}
            >
              Выход
            </Link>
          </li>
        </ul>
      </div>
      <article className={profileStyles.edit}>
        <form className={profileStyles.form}>
          <fieldset className={profileStyles.fieldset}>
            <Input
              type="text"
              icon="EditIcon"
              placeholder="Имя"
              onChange={(e) => setUsernameValue(e.target.value)}
              value={name}
              onIconClick={onIconClick}
              ref={inputRef}
              size="default"
            />
            <Input
              type="email"
              icon="EditIcon"
              placeholder="Логин"
              onChange={(e) => setUsernameValue(e.target.value)}
              value={email}
              onIconClick={onIconClick}
              ref={inputRef}
              size="default"
            />
            <Input
              type="password"
              icon="EditIcon"
              placeholder="Пароль"
              name="mt-6"
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
              onIconClick={onIconClick}
              ref={inputRef}
              size="default"
            />
          </fieldset>
        </form>
      </article>
      <div className={profileStyles.actions}>
        <Button type="secondary" size="medium">
          Отмена
        </Button>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </section>
  );
}
