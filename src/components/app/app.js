import React , {useEffect} from "react";
import "./app";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/burger-ingredients";
import {useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
   useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);
  const {ingredients} = useSelector((state) => state.ingredients)
  return (
    <div className="App">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <Main>
      {ingredients && 
            <>
            <BurgerIngredients   />
            <BurgerConstructor/>
            </>
        }
     
      </Main>
      </DndProvider>
    </div>
  );
}

export default App;
