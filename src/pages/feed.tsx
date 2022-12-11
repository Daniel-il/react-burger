import feedStyles from "./feed.module.css";
import { CardOrder } from "../components/card-order/card-order";
import { Stats } from "../components/stats/stats";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/types/hooks";
import { Link, useLocation } from "react-router-dom";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/wsActions";
import { RootState } from "../services/types";
import { TOrderItem } from "../services/types/utils";
export function FeedPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const { orders, total, totalToday } = useSelector(
    (store: RootState) => store.ws
  );
  if (!orders) return null;

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
            orders.map((order: TOrderItem) => {
              return (
                <Link
                  className={feedStyles.link}
                  to={{
                    pathname: `/feed/${order._id}`,
                    state: { background: location },
                  }}
                  key={order.number}
                >
                  <CardOrder
                    id={order.number}
                    ingredientsList={order.ingredients}
                    date={order.createdAt}
                    name={order.name}
                  />
                </Link>
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
