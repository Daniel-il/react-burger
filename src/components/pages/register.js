import registerStyles from "./register.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export function RegisterPage() {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <section className={registerStyles.registration}>
      <h1 className={`${registerStyles.title} text text_type_main-medium mb-6`}>
        Регистрация
      </h1>
      <div className={registerStyles.wrapper}>
      <form className={registerStyles.form}>
        <fieldset className={registerStyles.fieldset}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setLoginValue(e.target.value)}
            value={loginValue}
            onIconClick={onIconClick}
            ref={inputRef}
            size="default"
          />
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
            onChange={(e) => setPasswordValue(e.target.value)}
            value={passwordValue}
            onIconClick={onIconClick}
            ref={inputRef}
            size="default"
          />
        </fieldset>
      </form>
      <Button type="primary" size="medium">
        Зарегистрироваться
      </Button>
      </div>
       <p className="text text_type_main-default text_color_inactive mt-20">Уже зарегистрированы? <Link className={`text text_type_main-default ${registerStyles.link} `} to='/login'> Войти</Link></p>
    </section>
  );
}
