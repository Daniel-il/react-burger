import fillingsStyles from "./draggable-filling.module.css";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { FC, TIngredientItem } from "../../services/types/utils";

type TDraggableFillingProps = {
  ingredient: TIngredientItem;
  counter: number;
};

export const DraggableFilling: FC<TDraggableFillingProps> = ({
  ingredient,
  counter,
}) => {
  let location = useLocation();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <li className={fillingsStyles.item} ref={dragRef} draggable>
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
        className={fillingsStyles.link}
      >
        <Counter count={counter} size="default" />
        <img
          className={fillingsStyles.image}
          src={ingredient.image}
          alt={ingredient.name}
        ></img>
        <div className={`${fillingsStyles.cost} mb-1`}>
          <p className="text text_type_digits-default mr-2">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${fillingsStyles.text}`}>
          {ingredient.name}
        </p>
      </Link>
    </li>
  );
};
