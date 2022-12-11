import orderInfoStyles from "./order-info.module.css";
import { useEffect } from "react";
import { OrderIngredient } from "../components/order-ingredient/order-ingredient";
import { useDispatch, useSelector } from "../services/types/hooks";
import { useParams } from "react-router-dom";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  wsInitWithUser,
} from "../services/actions/wsActions";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../utils/utils";
import { DateTime } from "luxon";
import { FC, TIngredientItem, TOrderItem } from "../services/types/utils";
import { RootState } from "../services/types";

type TOrderInfoProps = {
  type: string;
  size: string;
};

export const OrderInfo: FC<TOrderInfoProps> = ({ type, size }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const token = getCookie("token");

  useEffect(() => {
    if (type === "profile") {
      dispatch(
        wsInitWithUser(`wss://norma.nomoreparties.space/orders?token=${token}`)
      );
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };
    } else {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };
    }
  }, [dispatch]);

  const countingIngredients: Array<number> = [];
  const { orders } = useSelector((store: RootState) => store.ws);

  const { ingredients } = useSelector((store: RootState) => store.ingredients);
  if (!orders) return null;
  if (!ingredients) return null;
  const orderInModal: TOrderItem | undefined = orders.find(
    (order: TOrderItem) => order._id === id
  );
  if (!orderInModal) return null;

  const date = DateTime.fromISO(orderInModal.createdAt);
  const dt = date.toLocaleString(DateTime.DATETIME_MED);
  console.log(dt);

  console.log(date);
  orderInModal.ingredients.map((ingredient: string) => {
    const ingredientInOrder = ingredients.find(
      (element: TIngredientItem) => element._id === ingredient
    )!;
    countingIngredients.push(ingredientInOrder.price);
  });

  const cost = countingIngredients.reduce(
    (acc: number, value: number) => acc + value,
    0
  );

  console.log(orderInModal);

  const countItems: {
    [key: string]: number;
  } = {};

  {
    orderInModal.ingredients.map((ingredient: string) => {
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
          className={
            size === "full"
              ? `${orderInfoStyles.orderInfo__id} text text_type_digits-default mb-8`
              : `${orderInfoStyles.orderInfo__id_small} text text_type_digits-default mb-8`
          }
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
              (el: TIngredientItem) => el._id === ingredient[0]
            )!;
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
            {dt}
          </p>
          <div className={orderInfoStyles.order_price}>
            <p className="text text_type_digits-default mr-2">{cost}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
