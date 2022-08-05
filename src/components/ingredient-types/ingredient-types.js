import React from "react";
import ingredientTypesStyles from "./ingredient-types.module.css";
import PropTypes from "prop-types";
import { useSelector} from "react-redux";
import DraggableFilling from "../draggable-filling/draggable-filling";

export default function IngredientTypes({ ingredientsRef, type }) {
  const { ingredients } = useSelector((state) => state.ingredients);
  const { bun, filling } = useSelector(
    (store) => store.burgerConstructorIngredients.constructorIngredients
  );

  const ingredientsArray = ingredients.filter(
    (ingredient) => ingredient.type === type
  );

  function startCount() {
    const amount = {};
    if (bun) {
      amount[bun._id] = 2;
    }
    if (filling) {
      filling.map((item) => {
        if (amount[item._id] === undefined) {
          amount[item._id] = 0;
        }
        return (amount[item._id] += 1);
      });
    }
    return amount;
  }
  const allAmount = startCount();
  return (
    <ul className={ingredientTypesStyles.list} ref={ingredientsRef}>
      {ingredientsArray.map((ingredient) => {
        return (
          <React.Fragment key={ingredient._id}>
            <DraggableFilling ingredient={ingredient} counter={allAmount[ingredient._id]} />
          </React.Fragment>
        );
      })}
    </ul>
  );
}
IngredientTypes.propTypes = {
  type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
};
