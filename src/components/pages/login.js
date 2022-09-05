import loginStyles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState} from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../services/actions/login";

export function LoginPage() {
  const dispatch = useDispatch();
  const {isAuth} = useSelector(store => store.auth)
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const loginIntoAccount = (e) => {
    e.preventDefault();
    dispatch(login(usernameValue, passwordValue))
  }
  
   if (isAuth) {
    return <Redirect to='/'/>
   }
   
 
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
              onChange={(e) => setUsernameValue(e.target.value)}
              value={usernameValue}
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
        <Button type="primary" size="medium" onClick={loginIntoAccount}>
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
          <Link
            className={`text text_type_main-default ${loginStyles.link}`}
            to="/forgot-password"
          >
            Восстановить пароль
          </Link>
        </li>
      </ul>
    </section>
  );
}