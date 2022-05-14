import React from "react";
import ingredientTypesStyles from "./ingredient-types.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/constants";
export default function IngredientTypes(props) {
  const burgersData = props.burgersData;
  const ingredientsArray = burgersData.filter(
    (ingredient) => ingredient.type === props.type
  );
  return (
    <ul className={ingredientTypesStyles.list}>
      {ingredientsArray.map((ingredient) => {
        return (
          <React.Fragment key={ingredient._id}>
            <li className={ingredientTypesStyles.item}>
              <img
                className={ingredientTypesStyles.image}
                src={ingredient.image}
                alt={ingredient.name}
              ></img>
              <div className={`${ingredientTypesStyles.cost} mb-1`}>
                <p className="text text_type_digits-default mr-2">
                  {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <p
                className={`text text_type_main-default ${ingredientTypesStyles.text}`}
              >
                {ingredient.name}
              </p>
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
}
IngredientTypes.propTypes = {
  type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
  burgersData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};
