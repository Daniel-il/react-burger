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

export default function BurgerConstructor(props) {
  const buns = props.burgersData.filter((ingredient) => ingredient.type === "bun");
  const mainIngredients = props.burgersData.filter(
    (ingredient) => ingredient.type !== "bun"
  );
  return (
    <section className={`mt-25 ${constructorStyles.section}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${buns[0].name} (верх)`}
        price={buns[0].price}
        thumbnail={buns[0].image}
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
        text={`${buns[0].name} (низ)`}
        price={buns[0].price}
        thumbnail={buns[0].image}
      />
      <article className={`${constructorStyles.info} mt-6`}>
        <div className={`${constructorStyles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">12121</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={props.openModal}>
          Оформить заказ
        </Button>
      </article>
    </section>
  );
}
BurgerConstructor.propTypes = {
  burgersData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  openModal: PropTypes.func
};
ConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
}