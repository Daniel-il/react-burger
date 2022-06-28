import React, { useContext, useEffect, useState } from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes, ingredientsUrl } from "../../utils/constants";
import { IngredientsContext } from "../../services/ingredientsContext";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
export default function BurgerConstructor() {
  let ingredientsIds;
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const getIds = () => {
    ingredientsIds = mainIngredients.map((ingredient) => ingredient._id);
    const bunId = buns[0]._id;
    ingredientsIds.push(bunId);
    return ingredientsIds;
  };
  const postIngredientsToServer = () => {
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: getIds(),
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .then((res) => setOrderNumber(res.order.number))
      .catch((err) => console.log(err));
  };
  const openOrderModal = () => {
    setIsOrderDetailsOpened(true);
    postIngredientsToServer();
  };
  const closeOrderModal = () => {
    setIsOrderDetailsOpened(false);
  };
  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeOrderModal();
  };
  const { data } = useContext(IngredientsContext);
  const buns = data.filter((ingredient) => ingredient.type === "bun");
  const mainIngredients = data.filter(
    (ingredient) => ingredient.type !== "bun"
  );
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    let initialCost = 0;
    mainIngredients.map((item) => (initialCost += item.price));
    const bunCost = buns[0].price * 2;
    const totalCost = bunCost + initialCost;
    setTotalPrice(totalCost);
  });

  return (
    <>
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
            <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={openOrderModal}>
            Оформить заказ
          </Button>
        </article>
      </section>
      {isOrderDetailsOpened && (
        <Modal onOverlayClick={closeOrderModal} onEscKeydown={handleEscKeydown}>
          <OrderDetails onClick={closeOrderModal} orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}
BurgerConstructor.propTypes = {
  openModal: PropTypes.func,
};
ConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
