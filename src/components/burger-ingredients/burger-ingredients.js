import React from "react";
import ingredientStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientTypes from "../ingredient-types/ingredient-types";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/constants";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
function BurgerIngredients(props) {
  const [ingredientInModal, setIngredientInModal] = React.useState(null);

  const closeIngredientModal = () => {
    setIngredientInModal(null)
  };
  const handleEscKeydown = (e) => {
      e.key === "Escape" && closeIngredientModal();
  }
  const handleIngredientClick = (cardData) => {
    setIngredientInModal(cardData)
  }
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
          onIngredientClick={handleIngredientClick}
        ></IngredientTypes>
        <h2 className={`text text_type_main-medium mt-10 mb-6`}>Соусы</h2>
        <IngredientTypes
          type="sauce"
          burgersData={props.burgersData}
          onIngredientClick={handleIngredientClick}
        ></IngredientTypes>
        <h2 className={`text text_type_main-medium mt-10 mb-6`}>Начинки</h2>
        <IngredientTypes
          type="main"
          burgersData={props.burgersData}
          onIngredientClick={handleIngredientClick}
        ></IngredientTypes>
      </div>
      {ingredientInModal !== null && (
      <Modal onOverlayClick={closeIngredientModal} onEscKeydown={handleEscKeydown}>
        <IngredientDetails onClick={closeIngredientModal} ingredientData={ingredientInModal}/>
      </Modal>
    )}
    </section>
  );
}
export default BurgerIngredients;

BurgerIngredients.propTypes = {
  burgersData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}