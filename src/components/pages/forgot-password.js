import forgotStyles from "./forgot-password.module.css";
import { useRef, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recoverPassword } from "../../services/actions/password-recover";
export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <section className={forgotStyles.forgot}>
      <h1 className={`${forgotStyles.title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <div className={forgotStyles.wrapper}>
        <form className={forgotStyles.form}>
          <fieldset className={forgotStyles.fieldset}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmailValue(e.target.value)}
              value={emailValue}
              onIconClick={onIconClick}
              ref={inputRef}
              size="default"
            />
          </fieldset>
        </form>
        <Button type="primary" size="medium" onClick={(e) => {
            e.preventDefault();
            dispatch(recoverPassword(emailValue))
        }}>
          Восстановить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
        <Link
          className={`text text_type_main-default ${forgotStyles.link}`}
          to="/login"
        >
          {" "}
          Войти
        </Link>
      </p>
    </section>
  );
}
