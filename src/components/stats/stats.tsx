import statsStyles from "./stats.module.css";
import React from "react";
import { FC, TOrderItem } from "../../services/types/utils";

type TStateProps = {
  totalNumber: number | null;
  totalTodaynumber: number | null;
  orders: ReadonlyArray<TOrderItem>;
};

export const Stats: FC<TStateProps> = ({
  totalNumber,
  totalTodaynumber,
  orders,
}) => {
  return (
    <article className={statsStyles.stats}>
      <div className={statsStyles.orders}>
        <div className={statsStyles.done}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={statsStyles.done__list}>
            {orders.map((order: TOrderItem) => {
              return (
                <React.Fragment key={order._id}>
                  <li className={statsStyles.done__item}>
                    {order.status === "done" && (
                      <p
                        className={`${statsStyles.done__digits} text text_type_digits-default`}
                      >
                        {order.number}
                      </p>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <div className={statsStyles.done}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={statsStyles.inWork__list}>
            {orders.map((order: TOrderItem) => {
              <React.Fragment key={order._id}>
                <li className={statsStyles.done__item}>
                  {order.status !== "done" && (
                    <p className={`text text_type_digits-default`}>
                      {order.number}
                    </p>
                  )}
                </li>
              </React.Fragment>;
            })}
          </ul>
        </div>
      </div>
      <div className={`${statsStyles.completed} mb-15`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{totalNumber}</p>
      </div>
      <div className={statsStyles.completed}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalTodaynumber}</p>
      </div>
    </article>
  );
};
