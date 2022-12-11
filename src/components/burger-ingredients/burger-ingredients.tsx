import React, { useState, useRef, useEffect } from "react";
import ingredientStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientTypes } from "../ingredient-types/ingredient-types";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useInView } from "framer-motion";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { closeIngredientModal } from "../../services/actions/ingredient-details";
import { Modal } from "../modal/modal";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredientInModal } = useSelector((store) => store.ingredientDetails);
  const [current, setCurrent] = useState<string>("one");
  const bunsRef = useRef<HTMLUListElement>(null);
  const saucesRef = useRef<HTMLUListElement>(null);
  const mainRef = useRef<HTMLUListElement>(null);
  const bunsInView = useInView(bunsRef);
  const saucesInView = useInView(saucesRef);
  const mainsInView = useInView(mainRef);
  useEffect(() => {
    if (bunsInView) {
      setCurrent("Булки");
    } else if (saucesInView) {
      setCurrent("Соусы");
    } else if (mainsInView) {
      setCurrent("Начинки");
    }
  }, [bunsInView, saucesInView, mainsInView]);
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
        <IngredientTypes type="bun" ingredientsRef={bunsRef}></IngredientTypes>
        <h2 className={`text text_type_main-medium mt-10 mb-6`}>Соусы</h2>
        <IngredientTypes
          type="sauce"
          ingredientsRef={saucesRef}
        ></IngredientTypes>
        <h2 className={`text text_type_main-medium mt-10 mb-6`}>Начинки</h2>
        <IngredientTypes type="main" ingredientsRef={mainRef}></IngredientTypes>
      </div>
      {ingredientInModal && (
        <Modal
          onClose={() => {
            dispatch(closeIngredientModal());
          }}
          title={"Детали ингредиента"}
        >
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}
export default BurgerIngredients;
