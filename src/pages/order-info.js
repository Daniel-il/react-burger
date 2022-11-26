import orderInfoStyles from "./order-info.module.css";
import React, {useEffect, useState}from "react";
import { burgersData } from "../utils/constants";
import { OrderIngredient } from "../components/order-ingredient/order-ingredient";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
export function OrderInfo() {
  const { orders } = useSelector((store) => store.ws);
  const { ingredients } = useSelector((store) => store.ingredients);
  const location = useLocation();
  let countingIngredients
  const { id } = useParams();
  const orderInModal = orders.find((order) => id === order._id);
  const orderIngredients = orderInModal.ingredients;
  const [totalPrice, setTotalPrice] = useState();
  const background = location.state && location.state.background;
  useEffect(() => {
    let initialCost = 0;
       countingIngredients = orderIngredients.map((ingredient) => {
        return ingredients.find((el) => el._id === ingredient);
      });
      countingIngredients.map((item) => {
          initialCost += item.price
        
      });
      const totalCost = initialCost;
      setTotalPrice(totalCost);
    
  }, [countingIngredients]);


  if (!background)
    return (
      <div className={orderInfoStyles.orderInfo}>
        <div className={orderInfoStyles.orderInfo__card}>
          <p
            className={`${orderInfoStyles.orderInfo__id} text text_type_digits-default mb-10`}
          >
            #{orderInModal.number}
          </p>
          <h1 className="text text_type_main-medium mb-3">
            {orderInModal.name}
          </h1>
          <p
            className={`${orderInfoStyles.orderInfo__status} text text_type_main-default mb-10`}
          >
            {orderInModal.status}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <ul className={orderInfoStyles.orderInfo__list}>
            {orderIngredients.map((ingredient) => {
              const ingredientInOrder = ingredients.find(
                (el) => el._id === ingredient
              );
              return (
                <React.Fragment key={nanoid()}>
                  <OrderIngredient
                    image={ingredientInOrder.image}
                    name={ingredientInOrder.name}
                    cost={ingredientInOrder.price}
                  />
                </React.Fragment>
              );
            })}
          </ul>
          <div className={orderInfoStyles.orderInfo__info}>
            <p
              className={`${orderInfoStyles.timestamp} text text_type_main-default text_color_inactive`}
            >
              {orderInModal.createdAt}
            </p>
            <div className={orderInfoStyles.order_price}>
              <p className="text text_type_digits-default mr-2">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    );
}
