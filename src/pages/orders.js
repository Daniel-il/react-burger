import ordersStyles from "./orders.module.css";
import { Navigation } from "../components/navigation/navigation";
import { CardOrder } from "../components/card-order/card-order";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import {
  wsInitWithUser,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START_WITH_USER,
} from "../services/actions/wsActions";
import { Link, useLocation } from "react-router-dom";
import { getCookie } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
export function OrdersPage() {
  const token = getCookie("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      wsInitWithUser(`wss://norma.nomoreparties.space/orders?token=${token}`)
    );
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch, token]);
  const location = useLocation();
  const background = location.state && location.state.background;
  const { orders } = useSelector((store) => store.ws);
  
  return (
    <section className={ordersStyles.orders}>
      <Navigation />
      <div className={ordersStyles.ordersboard}>
        <ul className={ordersStyles.orders__list}>
          {orders && 
            orders.map((order) => {
              return (
                <React.Fragment key={order._id}>
                  <Link
                    className={ordersStyles.link}
                    to={{
                      pathname: `/profile/orders/${order._id}`,
                      state: {background: location},
                    }}
                  >
                    <CardOrder
                      ingredientsList={order.ingredients}
                      date={order.createdAt}
                      name={order.name}
                      id={order.number}
                    />
                  </Link>
                </React.Fragment>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
