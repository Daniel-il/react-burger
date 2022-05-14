import React from "react";
import ingredientStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientTypes from "../ingredient-types/ingredient-types";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/constants";
function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={ingredientStyles.container}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <nav className={ingredientStyles.nav}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </nav>
      <div className={`${ingredientStyles.ingredients} mt-10`}>
        <h2 className={`text text_type_main-medium mb-6`}>Булки</h2>
        <IngredientTypes
          type="bun"
          burgersData={props.burgersData}
        ></IngredientTypes>
        <h2 className={`text text_type_main-medium mt-10 mb-6`}>Соусы</h2>
        <IngredientTypes
          type="sauce"
          burgersData={props.burgersData}
        ></IngredientTypes>
        <h2 className={`text text_type_main-medium mt-10 mb-6`}>Начинки</h2>
        <IngredientTypes
          type="main"
          burgersData={props.burgersData}
        ></IngredientTypes>
      </div>
    </section>
  );
}
export default BurgerIngredients;

BurgerIngredients.propTypes = {
  burgersData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}