import navigationStyles from "./navigation.module.css";
import { useDispatch } from "../../services/types/hooks";
import { logout } from "../../services/actions/profile";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className={navigationStyles.wrapper}>
      <ul className={navigationStyles.links}>
        <li className={`${navigationStyles.item}`}>
          <Link
            className={
              location.pathname === "/profile"
                ? `${navigationStyles.link_active} text text_type_main-medium`
                : `${navigationStyles.link} text text_type_main-medium text_color_inactive`
            }
            to="/profile"
          >
            Профиль
          </Link>
        </li>
        <li className={`${navigationStyles.item}`}>
          <Link
            className={
              location.pathname === "/profile/orders"
                ? `${navigationStyles.link_active} text text_type_main-medium`
                : `${navigationStyles.link} text text_type_main-medium text_color_inactive`
            }
            to="/profile/orders"
          >
            История заказов
          </Link>
        </li>
        <li className={`${navigationStyles.item}`}>
          <Link
            className={`text text_type_main-medium text_color_inactive ${navigationStyles.link} `}
            onClick={() => {
              dispatch(logout());
            }}
            to="/"
          >
            Выход
          </Link>
        </li>
      </ul>
      <p
        className={`${navigationStyles.caption} text text_type_main-small text_color_inactive`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}
