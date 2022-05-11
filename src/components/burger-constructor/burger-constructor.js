import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/constants";

export default function BugerConstructor(props) {
  const burgersData = props.burgersData;
  const bun = burgersData.find((ingredient) => ingredient.type === "bun");
  const mainIngredients = burgersData.filter(
    (ingredient) => ingredient.type !== "bun"
  );
  return (
    <section className={`mt-25 ${constructorStyles.section}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
      />
      <ul className={`${constructorStyles.list}`}>
        {mainIngredients.map((ingredient, index) => {
          return (
            <React.Fragment key={index}>
              <li className={`${constructorStyles.item}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
      />
      <article className={`${constructorStyles.info} mt-6`}>
        <div className={`${constructorStyles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">12121</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </article>
    </section>
  );
}
BugerConstructor.propTypes = {
  burgersData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};
ConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
}