import resetStyles from "./reset-password.module.css";
import { useRef, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function ResetPasswordPage() {
    const [loginValue, setLoginValue] = useState("");
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
              <Input
                type="email"
                placeholder="E-mail"
                onChange={(e) => setLoginValue(e.target.value)}
                value={loginValue}
                onIconClick={onIconClick}
                ref={inputRef}
                size="default"
              />
            </fieldset>
          </form>
          <Button type="primary" size="medium">
            Восстановить
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