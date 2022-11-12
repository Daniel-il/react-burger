import statsStyles from "./stats.module.css";

export function Stats() {
  return (
    <article className={statsStyles.stats}>
      <div className={statsStyles.orders}>
        <div className={statsStyles.done}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={statsStyles.done__list}>
            <li className={statsStyles.done__item}>
            <p className={`${statsStyles.done__digits} text text_type_digits-default`}>1234567890</p>
            </li>
            <li className={statsStyles.done__item}>
            <p className={`${statsStyles.done__digits} text text_type_digits-default`}>1234567890</p>
            </li>
            <li className={statsStyles.done__item}>
            <p className={`${statsStyles.done__digits} text text_type_digits-default`}>1234567890</p>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
