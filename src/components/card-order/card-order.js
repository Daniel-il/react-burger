import cardStyles from "./card-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { nanoid } from "nanoid";
import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
export function CardOrder({ id, ingredientsList, date, name }) {
  const { ingredients } = useSelector((store) => store.ingredients);
  let countingIngredients
  let ingredientsArr;
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    let initialCost = 0;
       countingIngredients = ingredientsList.map((ingredient) => {
        return ingredients.find((el) => el._id === ingredient);
      });
      countingIngredients.map((item) => {
          initialCost += item.price
        
      });
      const totalCost = initialCost;
      setTotalPrice(totalCost);
    
  }, [countingIngredients]);
  
  return (
    <li className={cardStyles.order}>
      <div className={cardStyles.order_id}>
        <p className={`${cardStyles.id} text text_type_main-default`}>#{id}</p>
        <p
          className={`${cardStyles.timestamp} text text_type_main-default text_color_inactive`}
        >
          {date}
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

              return ingredientsArr.map((ingredient) => {
                const ingredientInOrder = ingredients.find(
                  (el) => el._id === ingredient
                );
                return (
                  <React.Fragment key={nanoid()}>
                  <li className={cardStyles.ingredient} key={nanoid()}>
                    <img
                      className={cardStyles.ingredient_image}
                      src={ingredientInOrder.image}
                      alt={ingredientInOrder.name}
                    />
                  </li>
                  </React.Fragment>
                );
              });
            } else {
              return ingredientsList.map((ingredient) => {
                const ingredientInOrder = ingredients.find(
                  (el) => el._id === ingredient
                );
                return (
                  <React.Fragment key={nanoid()}>
                    <li className={cardStyles.ingredient}>
                      <img
                        className={cardStyles.ingredient_image}
                        src={ingredientInOrder.image}
                        alt={ingredientInOrder.name}
                      />
                    </li>
                  </React.Fragment>
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
}
