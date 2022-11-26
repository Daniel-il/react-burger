import profileStyles from "./profile.module.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { changeUserData } from "../services/actions/profile";
import { Navigation } from "../components/navigation/navigation";
export function ProfilePage() {
  const location = useLocation();
  const { email, name } = useSelector((store) => store.auth.user);
  const [emailValue, setEmailValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState(name);
  const dispatch = useDispatch();
  const history = useHistory();
  
  return (
    <section className={profileStyles.profile}>
      <Navigation />  
      <article className={profileStyles.edit}>
        <form className={profileStyles.form}>
          <fieldset className={profileStyles.fieldset}>
            <Input
              type="text"
              icon="EditIcon"
              placeholder="Имя"
              onChange={(e) => setUsernameValue(e.target.value)}
              value={usernameValue}
              size="default"
            />
            <Input
              type="email"
              icon="EditIcon"
              placeholder="Логин"
              onChange={(e) => setEmailValue(e.target.value)}
              value={emailValue}
              size="default"
            />
            <PasswordInput
              type="password"
              placeholder="Пароль"
              name="mt-6"
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
              size="default"
            />
          </fieldset>
        </form>
        <div className={profileStyles.actions}>
          <Button
            type="secondary"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              setEmailValue(email);
              setUsernameValue(name);
              setPasswordValue('');
            }}
          >
            Отмена
          </Button>
          <Button
            type="primary"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                changeUserData(emailValue, usernameValue, passwordValue)
              );
            }}
          >
            Сохранить
          </Button>
        </div>
      </article>
    </section>
  );
}
