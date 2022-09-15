import ingredientStyles from "./ingredient-details.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
function IngredientDetails() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {ingredientInModal} = useSelector(store => store.ingredientDetails)
  console.log('id: ', id);
  const { ingredients} = useSelector((store) => store.ingredients);
  console.log(ingredients)
  const ingredientData = ingredients.find((item) => id === item._id);
  console.log('dataModal: ', ingredientData);
  console.log(ingredientData)
  
  return (
    <>
      <img
        className={`${ingredientStyles.img}`}
        src={ingredientData.image}
        alt={ingredientData.image}
      ></img>
      <div className={`${ingredientStyles.info}`}>
        <h4
          className={`text text_type_main-medium ${ingredientStyles.text} mb-8`}
        >
          {ingredientData.name}
        </h4>
        <ul className={`${ingredientStyles.list} `}>
          <li className={`${ingredientStyles.item}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Калории, ккал
            </p>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              {ingredientData.calories}
            </p>
          </li>
          <li className={`${ingredientStyles.item}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Белки, г
            </p>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              {ingredientData.proteins}
            </p>
          </li>
          <li className={`${ingredientStyles.item}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Жиры, г
            </p>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              {ingredientData.fat}
            </p>
          </li>
          <li className={`${ingredientStyles.item}`}>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              Углеводы, г
            </p>
            <p
              className={`text text_type_main-default text_color_inactive mb-2`}
            >
              {ingredientData.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export { IngredientDetails };
