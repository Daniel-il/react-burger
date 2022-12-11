import React, { useState, useMemo } from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDrop } from "react-dnd";
import { addConstructorIngredient } from "../../services/actions/burger-constructor";
import { ConstructorFilling } from "../constructor-filling/constructor-filling";
import {
  postIngredientsToServer,
  POST_INGREDIENTS_REFRESH,
} from "../../services/actions/order-details";
import { useHistory } from "react-router-dom";
import { RootState } from "../../services/types";
import { TIngredientItem } from "../../services/types/utils";
import { useDispatch, useSelector } from "../../services/types/hooks";
export default function BurgerConstructor() {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] =
    React.useState<boolean>(false);
  const { orderNumber } = useSelector((store: RootState) => store.orderDetails);
  const { isAuth } = useSelector((store: RootState) => store.auth);
  const { bun, filling } = useSelector(
    (store) =>
      store.burgerConstructorIngredients.constructorIngredients
  );
  
  const history = useHistory();
  const dispatch = useDispatch();
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(ingredient: TIngredientItem) {
      dispatch(addConstructorIngredient(ingredient));
    },
  });
  const getIds = () => {
    let ingredientsIds: Array<string>;
    if (bun && filling) {
      ingredientsIds = filling.map(
        (ingredient: TIngredientItem) => ingredient._id
      );
  
      const bunId = bun._id;
      ingredientsIds.push(bunId);
      return ingredientsIds;
    }
   
  };
  const ids = getIds()
  console.log(getIds());

  const [totalPrice, setTotalPrice] = useState<number>();

  useMemo(() => {
    let initialCost = 0;
    if (bun && filling) {
      const bunCost = bun.price * 2;
      filling.map((item: TIngredientItem) => (initialCost += item.price));
      const totalCost = bunCost + initialCost;
      setTotalPrice(totalCost);
    }
  }, [bun, filling]);

  const openOrderModal = () => {
    if (!isAuth) {
      history.push("/login");
    } else {
      setIsOrderDetailsOpened(true);
      dispatch(postIngredientsToServer(ids));
    }
  };

  const closeOrderModal = () => {
    setIsOrderDetailsOpened(false);
    dispatch({ type: POST_INGREDIENTS_REFRESH });
  };

  return (
    <>
      <section className={`mt-25 ${constructorStyles.section}`}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
        <ul className={`${constructorStyles.list}`} ref={dropRef}>
          {!bun && filling.length <= 0 && (
            <p className="text text_type_main-large">
              Перетащите сюда нужные ингредиенты
            </p>
          )}
          {filling &&
            filling.map((ingredient: TIngredientItem, i: number) => (
              <ConstructorFilling
                ingredient={ingredient}
                key={ingredient.nanoId}
                id={ingredient.nanoId}
                index={i}
              />
            ))}
        </ul>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}

        <article className={`${constructorStyles.info} mt-6`}>
          <div className={`${constructorStyles.price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>

          {!bun && filling.length <= 0 ? (
            <Button
              type="primary"
              size="large"
              onClick={openOrderModal}
              disabled
            >
              Оформить заказ
            </Button>
          ) : (
            <Button type="primary" size="large" onClick={openOrderModal}>
              Оформить заказ
            </Button>
          )}
        </article>
      </section>
      {isOrderDetailsOpened && (
        <Modal title="" onClose={closeOrderModal}>
          <OrderDetails onClick={closeOrderModal} orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}

ConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
