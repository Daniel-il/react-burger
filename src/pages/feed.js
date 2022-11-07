import feedStyles from "./feed.module.css";
import { CardOrder} from "../components/card-order/card-order";
export function FeedPage() {
  return (
    <section className={feedStyles.feed}>
      <h1
        className={`${feedStyles.title} text text_type_main-large mt-10 mb-5`}
      >
        Лента Заказов
      </h1>
      <ul className={feedStyles.orders}>
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
        
      </ul>
    </section>
  );
}
