import orderInfoStyles from "./order-info.module.css";
import React, { useMemo, useState, useEffect } from "react";
import { OrderIngredient } from "../components/order-ingredient/order-ingredient";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../services/actions/wsActions";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
export function OrderInfo() {
  const location = useLocation();
  const [totalPrice, setTotalPrice] = useState();
  const background = location.state && location.state.background
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    
   dispatch({type: WS_CONNECTION_START});
   return () => {
      dispatch({type: WS_CONNECTION_CLOSED});
    };
  }, [dispatch])
  const countingIngredients = [];
  const { orders } = useSelector((store) => store.ws);
  const { ingredients } = useSelector((store) => store.ingredients);
  const orderInModal = orders.find((order) => order._id === id);
  if (!orderInModal) return null

  orderInModal.ingredients.map((ingredient) => {
    const ingredientInOrder = ingredients.find((element) => element._id === ingredient);
    countingIngredients.push(ingredientInOrder.price);
  })

  const cost = countingIngredients.reduce((acc, value) => acc + value, 0);

   
  console.log(orderInModal)
   
 
  
  const countItems = {};
{

  orderInModal.ingredients.map((ingredient) => {
  if (!countItems[ingredient]) {
    countItems[ingredient] = 1;
  } else {
    countItems[ingredient] += 1;
  }
});
}
  
  const uniqueItems = Object.entries(countItems);
  
  
    
  
return (
    <div className={orderInfoStyles.orderInfo}>
      <div className={orderInfoStyles.orderInfo__card}>
        <p
          className={`${orderInfoStyles.orderInfo__id} text text_type_digits-default mb-10`}
        >
          #{orderInModal.number}
        </p>
        <h1 className="text text_type_main-medium mb-3">{orderInModal.name}</h1>
        <p
          className={`${orderInfoStyles.orderInfo__status} text text_type_main-default mb-10`}
        >
          {orderInModal.status}
        </p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <ul className={orderInfoStyles.orderInfo__list}>
          {uniqueItems.map((ingredient) => {
            const ingredientInOrder = ingredients.find(
              (el) => el._id === ingredient[0]
            );
            return (
              <OrderIngredient
                image={ingredientInOrder.image}
                name={ingredientInOrder.name}
                cost={ingredientInOrder.price}
                key={ingredientInOrder._id}
                quantity={ingredient[1]}
              />
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
            <p className="text text_type_digits-default mr-2">{cost}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
