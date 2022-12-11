import profileStyles from "./profile.module.css";
import { useEffect, useState } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../services/types/hooks";
import { changeUserData } from "../services/actions/profile";
import { Navigation } from "../components/navigation/navigation";
export function ProfilePage() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [usernameValue, setUsernameValue] = useState<string>("");
  useEffect(() => {
    if (user) {
      setEmailValue(user.email);
      setUsernameValue(user.name);
    }
  }, [user])
  
 

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
              if (user) {
                setEmailValue(user.email);
                setUsernameValue(user.name);
              }
              setPasswordValue("");
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
