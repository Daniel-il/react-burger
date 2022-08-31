import loginStyles from "./login.module.css";
import { useRef, useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
export function LoginPage() {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <section className={loginStyles.login}>
      <h1 className={`${loginStyles.title} text text_type_main-medium mb-6`}>
        Вход
      </h1>
      <div className={loginStyles.wrapper}>
      <form className={loginStyles.form}>
        <fieldset className={loginStyles.fieldset}>
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setLoginValue(e.target.value)}
            value={loginValue}
            onIconClick={onIconClick}
            ref={inputRef}
            size="default"
          />
          <PasswordInput
            type="text"
            placeholder="Пароль"
            name="mt-6"
            onChange={(e) => setPasswordValue(e.target.value)}
            value={passwordValue}
            onIconClick={onIconClick}
            ref={inputRef}
            size="large"
          />
        </fieldset>
      </form>
      <Button type="primary" size="medium">
        Войти
      </Button>
      </div>
      <ul className={loginStyles.actions}>
        <li
          className={`${loginStyles.item} text text_type_main-default text_color_inactive`}
        >
          Вы — новый пользователь?{" "}
          <Link
            className={`text text_type_main-default ${loginStyles.link}`}
            to="/register"
          >
            Зарегистрироваться
          </Link>
        </li>
        <li
          className={`${loginStyles.item} text text_type_main-default text_color_inactive`}
        >
          Забыли пароль?{" "}
          <Link className={`text text_type_main-default ${loginStyles.link}`} to='/forgot-password'>
            Восстановить пароль
          </Link>
        </li>
      </ul>
    </section>
  );
}
