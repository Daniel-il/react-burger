import registerStyles from "./register.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/actions/register";
import { useDispatch } from "react-redux";
export function RegisterPage() {    
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const registerUser = (e) => {
    e.preventDefault();
    dispatch(register(emailValue, passwordValue, usernameValue))
  }
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
            onChange={(e) => setUsernameValue(e.target.value)}
            value={usernameValue}
            onIconClick={onIconClick}
            ref={inputRef}
            size="default"
          />
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
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
      <Button type="primary" size="medium" onClick={registerUser}>
        Зарегистрироваться
      </Button>
      </div>
       <p className="text text_type_main-default text_color_inactive mt-20">Уже зарегистрированы? <Link className={`text text_type_main-default ${registerStyles.link} `} to='/login'> Войти</Link></p>
    </section>
  );
}
