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
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { addConstructorIngredient } from "../../services/actions/burger-constructor";
import ConstructorFilling from "../constructor-filling/constructor-filling";
import { postIngredientsToServer } from "../../services/actions/order-details";

export default function BurgerConstructor() {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const {orderNumber} = useSelector(store => store.orderDetails)

 const {bun, filling} = (useSelector(store => store.burgerConstructorIngredients.constructorIngredients))
  const dispatch = useDispatch();
  const [, dropRef] = useDrop({ 
    accept: 'ingredient',
    drop(ingredient) {
      dispatch(addConstructorIngredient(ingredient))
    }
  })
  const getIds = () => {
    let ingredientsIds;
    ingredientsIds = filling.map((ingredient) => ingredient._id);
    const bunId = bun._id;
    ingredientsIds.push(bunId)
    return ingredientsIds;
  };

  const [totalPrice, setTotalPrice] = useState();

  useMemo(() => {
    let initialCost = 0;
    if (bun && filling) {
      const bunCost = bun.price * 2;
      filling.map((item) => (initialCost += item.price));
      const totalCost = bunCost + initialCost;
      setTotalPrice(totalCost);
    }
  }, [bun, filling]);


  const openOrderModal = () => {
    setIsOrderDetailsOpened(true);
    dispatch(postIngredientsToServer(getIds()))
  };

  const closeOrderModal = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeOrderModal();
  };
  
 
  return (
    <>
      <section className={`mt-25 ${constructorStyles.section}`}>
      
       {bun && 
       <ConstructorElement
       type="top"
       isLocked={true}
       text={`${bun.name} (верх)`}
       price={bun.price}
       thumbnail={bun.image}
     />
       }
        <ul className={`${constructorStyles.list}`} ref = {  dropRef }>
        {!bun && filling.length <= 0  && <p className="text text_type_main-large">Перетащите сюда нужные ингредиенты</p>}
        {filling && filling.map((ingredient, i) => (
                <ConstructorFilling ingredient={ingredient}  key={ingredient.nanoId} id = {ingredient.nanoId} index ={i}/>
              ))}
        </ul>
        {
          bun &&
          <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        }
      
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

ConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
