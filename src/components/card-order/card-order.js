import cardStyles from './card-order.module.css'
import { burgersData } from '../../utils/constants';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

export function CardOrder() {
  return (
    <li className={cardStyles.order}>
      <div className={cardStyles.order_id}>
        <p className={`${cardStyles.id} text text_type_main-default`}>#2112</p>
        <p
          className={`${cardStyles.timestamp} text text_type_main-default text_color_inactive`}
        >
          Завтра, 15:00
        </p>
      </div>
      <div className={cardStyles.order_info}>
        <h2 className={`${cardStyles.info} text text_type_main-medium`}>
          Название бэргера
        </h2>
      </div>
      <div className={cardStyles.order_info}>
        <ul className={cardStyles.order_ingredients}>
         
            {
              burgersData.map(ingredient => {
                return (
                  <React.Fragment key={ingredient._id}>
                  <li className={cardStyles.ingredient}>
                  <img className={cardStyles.ingredient_image} src={ingredient.image}/>
                  </li>
                  </React.Fragment>
                )
              })
            }
           
        </ul>

        <div className={cardStyles.order_price}>
          <p className="text text_type_digits-default mr-2">123</p>
          <CurrencyIcon type="primary" />
        </div>

      </div>
    </li>
    
  );
}
