import React, {useContext} from "react";
import ingredientTypesStyles from "./ingredient-types.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientsContext } from "../../services/ingredientsContext";
export default function IngredientTypes(props) {
  const { data} = useContext(IngredientsContext)
  const ingredientsArray = data.filter(
    (ingredient) => ingredient.type === props.type
  );
  return (
    <ul className={ingredientTypesStyles.list}>
      {ingredientsArray.map((ingredient) => {
        return (
          <React.Fragment key={ingredient._id}>
            <li className={ingredientTypesStyles.item} onClick={() => props.onIngredientClick(ingredient)}>
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
  onIngredientClick: PropTypes.func.isRequired
};
