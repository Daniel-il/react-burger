import { Modal } from "../modal/modal";
import { useCallback } from "react";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useHistory, useLocation } from "react-router-dom";
import ingredientStyles from "./ingredient.module.css";

export function IngredientPage() {

  const location = useLocation();
  const background = location.state && location.state.background;


    if (!background) return (
      <article className={ingredientStyles.ingredient_page}>
        <h1 className={`${ingredientStyles.title} text text_type_main-large`}>
          Детали ингредиента
        </h1>
        <IngredientDetails />
      </article>
    );
}
