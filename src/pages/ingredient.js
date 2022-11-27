import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { useHistory, useLocation } from "react-router-dom";
import ingredientStyles from "./ingredient.module.css";

export function IngredientPage() {
 return (
      <article className={ingredientStyles.ingredient_page}>
        <h1 className={`${ingredientStyles.title} text text_type_main-large`}>
          Детали ингредиента
        </h1>
        <IngredientDetails />
      </article>
    );
}
