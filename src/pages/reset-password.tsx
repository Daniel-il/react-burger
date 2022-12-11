import resetStyles from "./reset-password.module.css";
import { useState } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, Redirect } from "react-router-dom";
import { resetPassword } from "../services/actions/password-reset";
import { useDispatch } from "../services/types/hooks";

export function ResetPasswordPage() {
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [emailTokenValue, setEmailTokenValue] = useState<string>("");
  const dispatch = useDispatch();
  const location = useLocation<{ from: { pathname: string } }>();
  if (
    location.state === undefined ||
    location.state.from.pathname !== "/forgot-password"
  ) {
    return <Redirect to={"/"} />;
  }
  return (
    <section className={resetStyles.reset}>
      <h1 className={`${resetStyles.title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <div className={resetStyles.wrapper}>
        <form
          className={resetStyles.form}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(resetPassword(emailTokenValue, passwordValue));
          }}
        >
          <fieldset className={resetStyles.fieldset}>
            <PasswordInput
              name="password"
              onChange={(e) => setEmailTokenValue(e.target.value)}
              value={emailTokenValue}
            />
            <Input
              type="text"
              placeholder="Введите код из письма"
              name=""
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
            />
          </fieldset>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </form>
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
