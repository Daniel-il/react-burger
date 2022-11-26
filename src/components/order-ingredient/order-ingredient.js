import orderIngredientStyles from './order-ingredient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function OrderIngredient ({image, name, cost}) { 
    return (
        <>
        <li className={orderIngredientStyles.ingredient}>
            <img className = {orderIngredientStyles.ingredient__image} src={image} alt={name}/>
            <p className={`${orderIngredientStyles.ingredient__name} text text_type_main-default`}>{name}</p>
            <p className={`${orderIngredientStyles.ingredient__digits} text text_type_digits-default`}>{cost}</p> 
            <CurrencyIcon />
        </li>
        </>
    )
}