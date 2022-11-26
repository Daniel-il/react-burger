import feedStyles from "./feed.module.css";
import React from "react";
import { CardOrder } from "../components/card-order/card-order";
import { Stats } from "../components/stats/stats";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/wsActions";
export function FeedPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders, total, totalToday } = useSelector((store) => store.ws);
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <section className={feedStyles.feed}>
      <div className={feedStyles.feed__wrapper}>
        <h1
          className={`${feedStyles.title} text text_type_main-large mt-10 mb-5`}
        >
          Лента Заказов
        </h1>
        <ul className={feedStyles.orders}>
          {orders &&
            orders.map((order) => {
              return (
                <React.Fragment key={order._id}>
                  <Link
                    className={feedStyles.link}
                    to={{
                      pathname: `/feed/${order._id}`,
                      background: location,
                    }}
                  >
                    <CardOrder
                      id={order.number}
                      ingredientsList={order.ingredients}
                      date={order.createdAt}
                      name={order.name}
                    />
                  </Link>
                </React.Fragment>
              );
            })}
        </ul>
      </div>
      <Stats
        totalNumber={total}
        totalTodaynumber={totalToday}
        orders={orders}
      />
    </section>
  );
}
