import feedStyles from "./feed.module.css";

export function FeedPage() {
  return (
    <section className={feedStyles.feed}>
      <h1
        className={`${feedStyles.title} text text_type_main-large mt-10 mb-5`}
      >
        Лента Заказов
      </h1>
      <ul className={feedStyles.orders}>
        <li className={feedStyles.order}>
          <div className={feedStyles.order_id}>
            <p className={`${feedStyles.id} text text_type_main-default`}>
              #2112
            </p>
            <p
              className={`${feedStyles.timestamp} text text_type_main-default text_color_inactive`}
            >
              Завтра, 15:00
            </p>
          </div>
          <div className={feedStyles.order_info}>
            <h2 className={`${feedStyles.info} text text_type_main-medium`}>
              Название бэргера
            </h2>
          </div>
          <div className={feedStyles.order_info}>
            <ul className={feedStyles.order_ingredients}>
                <li className={feedStyles.ingredient}></li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  );
}
