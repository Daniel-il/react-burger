import React from "react";
import "./App";
import AppHeader from "../app-header/AppHeader";
import Main from "../main/main";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BugerConstructor from "../burger-constructor/burger-constructor";
import { burgersData } from "../../utils/data";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Main>
        <BurgerIngredients />
        <BugerConstructor burgersData={burgersData} />
      </Main>
    </div>
  );
}

export default App;
