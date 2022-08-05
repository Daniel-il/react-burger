import fillingsStyles from "./draggable-filling.module.css";
import { useDrag } from "react-dnd";
import { onIngredientClick } from "../../services/actions/ingredient-details";
import { useDispatch} from "react-redux";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
export default function DraggableFilling({ ingredient, counter }) {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });
  const dispatch = useDispatch();
  return (
    <li
      className={fillingsStyles.item}
      onClick={() => {
        dispatch(onIngredientClick(ingredient));
      }}
      ref={dragRef}
      draggable
    >
      <Counter count={counter} size="default" />
      <img
        className={fillingsStyles.image}
        src={ingredient.image}
        alt={ingredient.name}
      ></img>
      <div className={`${fillingsStyles.cost} mb-1`}>
        <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${fillingsStyles.text}`}>
        {ingredient.name}
      </p>
    </li>
  );
}
