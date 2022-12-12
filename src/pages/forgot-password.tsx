import forgotStyles from "./forgot-password.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "../services/types/hooks";
import { recoverPassword } from "../services/actions/password-recover";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState<string>("");
  const history = useHistory();
  const location = useLocation();
  return (
    <section className={forgotStyles.forgot}>
      <h1 className={`${forgotStyles.title} text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <div className={forgotStyles.wrapper}>
        <form
          className={forgotStyles.form}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            dispatch(recoverPassword(emailValue));
            history.replace({
              pathname: "/reset-password",
              state: { from: location },
            });
          }}
        >
          <fieldset className={forgotStyles.fieldset}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailValue(e.target.value)}
              value={emailValue}
              size="default"
            />
          </fieldset>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </form>
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
