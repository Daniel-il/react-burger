import React from "react";
import ingredientTypesStyles from "./ingredient-types.module.css";
import PropTypes from "prop-types";
import { DraggableFilling } from "../draggable-filling/draggable-filling";
import { FC, TIngredientItem } from "../../services/types/utils";
import { RootState } from "../../services/types";
import { useSelector } from "../../services/types/hooks";

type TIngredientsTypesProps = {
  ingredientsRef: React.RefObject<HTMLUListElement>;
  type: string;
};

export const IngredientTypes: FC<TIngredientsTypesProps> = ({
  ingredientsRef,
  type,
}) => {
  const { ingredients} = useSelector((state) => state.ingredients);
  console.log(ingredients)
  const { bun, filling } = useSelector(
    (store) =>
      store.burgerConstructorIngredients.constructorIngredients
  );

  const ingredientsArray = ingredients.filter(
    (ingredient: TIngredientItem) => ingredient.type === type
  );

  function startCount() {
    const amount: {
      [key: string]: number;
    } = {};

    if (bun) {
      amount[bun._id] = 2;
    }
    if (filling) {
      filling.map((item: TIngredientItem) => {
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
      {ingredientsArray.map((ingredient: TIngredientItem) => {
        return (
          <React.Fragment key={ingredient._id}>
            <DraggableFilling
              ingredient={ingredient}
              counter={allAmount[ingredient._id]}
            />
          </React.Fragment>
        );
      })}
    </ul>
  );
};
IngredientTypes.propTypes = {
  type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
};
