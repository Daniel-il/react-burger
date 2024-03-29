import loginStyles from "./login.module.css";
import { useDispatch, useSelector } from "../services/types/hooks";
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { login } from "../services/actions/login";

export function LoginPage() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.auth);
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const loginIntoAccount = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(usernameValue, passwordValue));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <section className={loginStyles.login}>
      <h1 className={`${loginStyles.title} text text_type_main-medium mb-6`}>
        Вход
      </h1>
      <div className={loginStyles.wrapper}>
        <form className={loginStyles.form} onSubmit={loginIntoAccount}>
          <fieldset className={loginStyles.fieldset}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsernameValue(e.target.value)}
              value={usernameValue}
              size="default"
            />
            <PasswordInput
              name="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordValue(e.target.value)}
              value={passwordValue}
              size="default"
            />
          </fieldset>
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>
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
