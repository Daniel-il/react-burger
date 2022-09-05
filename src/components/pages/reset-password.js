import resetStyles from "./reset-password.module.css";
import { useRef, useState } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { resetPassword } from "../../services/actions/password-reset";
import { useDispatch } from "react-redux";

export function ResetPasswordPage() {
  const [passwordValue, setPasswordValue] = useState("");
  const [emailTokenValue, setEmailTokenValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <section className={resetStyles.reset}>
      <h1 className={`${resetStyles.title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <div className={resetStyles.wrapper}>
        <form className={resetStyles.form}>
          <fieldset className={resetStyles.fieldset}>
            <PasswordInput
              type="text"
              placeholder="Введите новый пароль"
              name=""
              onChange={(e) => setEmailTokenValue(e.target.value)}
              value={emailTokenValue}
              onIconClick={onIconClick}
              ref={inputRef}
            />
            <Input
              type="text"
              placeholder="Введите код из письма"
              name=""
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
              onIconClick={onIconClick}
              ref={inputRef}
            />
          </fieldset>
        </form>
        <Button
          type="primary"
          size="medium"
          onClick={(e) => {
            e.preventDefault();
            dispatch(resetPassword(passwordValue, emailTokenValue));
          }}
        >
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
        <Link
          className={`text text_type_main-default ${resetStyles.link}`}
          to="/login"
        >
          {" "}
          Войти
        </Link>
      </p>
    </section>
  );
}
