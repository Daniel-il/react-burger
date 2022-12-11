import cardStyles from "./card-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, FunctionComponent, useEffect } from "react";
import { useSelector } from "../../services/types/hooks";
import { DateTime } from "luxon";
import { TIngredientItem } from "../../services/types/utils";
type FC<P = {}> = FunctionComponent<P>;
type TCardOrderProps = {
  id: number;
  ingredientsList: ReadonlyArray<string>;
  date: string;
  name: string;
};
export const CardOrder: FC<TCardOrderProps> = ({
  id,
  ingredientsList,
  date,
  name,
}) => {
  const { ingredients } = useSelector((store) => store.ingredients);

  let countingIngredients;
  let ingredientsArr;
  const [totalPrice, setTotalPrice] = useState<number>();
  useEffect(() => {
    let initialCost = 0;
    countingIngredients = ingredientsList.map((ingredient) => {
      return ingredients.find((el) => el._id === ingredient);
    });
    countingIngredients.map((item: any) => {
      initialCost += item.price;
    });
    const totalCost = initialCost;
    setTotalPrice(totalCost);
  }, [countingIngredients]);
  const newDate = DateTime.fromISO(date);
  const dt = newDate.toLocaleString(DateTime.DATETIME_MED);
  return (
    <li className={cardStyles.order}>
      <div className={cardStyles.order_id}>
        <p className={`${cardStyles.id} text text_type_main-default`}>#{id}</p>
        <p
          className={`${cardStyles.timestamp} text text_type_main-default text_color_inactive pr-4`}
        >
          {dt}
        </p>
      </div>
      <div className={cardStyles.order_info}>
        <h2 className={`${cardStyles.info} text text_type_main-medium`}>
          {name}
        </h2>
      </div>
      <div className={cardStyles.order_info}>
        <ul className={cardStyles.order_ingredients}>
          {(() => {
            if (ingredientsList.length > 5) {
              ingredientsArr = ingredientsList.slice(0, 5);
              const uniqueItems = Array.from(new Set(ingredientsArr));
              return uniqueItems.map((ingredient) => {
                const ingredientInOrder = ingredients.find(
                  (el) => el._id === ingredient
                )!;
                return (
                  <li
                    className={cardStyles.ingredient}
                    key={ingredientInOrder._id}
                  >
                    <img
                      className={cardStyles.ingredient_image}
                      src={ingredientInOrder.image}
                      alt={ingredientInOrder.name}
                    />
                  </li>
                );
              });
            } else {
              const uniqueItems = Array.from(new Set(ingredientsList));
              return uniqueItems.map((ingredient) => {
                const ingredientInOrder = ingredients.find(
                  (el) => el._id === ingredient
                )!;
                return (
                  <li
                    className={cardStyles.ingredient}
                    key={ingredientInOrder._id}
                  >
                    <img
                      className={cardStyles.ingredient_image}
                      src={ingredientInOrder.image}
                      alt={ingredientInOrder.name}
                    />
                  </li>
                );
              });
            }
          })()}
          {ingredientsList.length > 5 && (
            <li className={cardStyles.ingredient}>
              <p className="text text_type_digits-default p-4">
                +{ingredientsList.length - 5}
              </p>
            </li>
          )}
        </ul>

        <div className={cardStyles.order_price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};
