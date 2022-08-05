import ingredientStyles from "./ingredient-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function IngredientDetails(props) {
  return (
    <>
      <div className={`${ingredientStyles.wrapper}`}>
        <h3 className="text text_type_main-large">Детали ингредиента</h3>
        <CloseIcon type="primary" onClick={props.onClick} />
      </div>
      <img
        className={`${ingredientStyles.img}`}
        src={props.ingredientData.image}
        alt={props.ingredientData.image}
      ></img>
      <div className={`${ingredientStyles.info}`}>
        <h4
          className={`text text_type_main-medium ${ingredientStyles.text} mb-8`}
        >
          {props.ingredientData.name}
        </h4>
        <ul className={`${ingredientStyles.list} `}>
          <li className={`${ingredientStyles.item}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Калории, ккал
            </p>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              {props.ingredientData.calories}
            </p>
          </li>
          <li className={`${ingredientStyles.item}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Белки, г
            </p>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              {props.ingredientData.proteins}
            </p>
          </li>
          <li className={`${ingredientStyles.item}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Жиры, г
            </p>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              {props.ingredientData.fat}
            </p>
          </li>
          <li className={`${ingredientStyles.item}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Углеводы, г
            </p>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              {props.ingredientData.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
    onClick: PropTypes.func.isRequired
}
export { IngredientDetails };
