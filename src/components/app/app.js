import React , {useEffect} from "react";
import "./app";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngredientsContext } from "../../services/ingredientsContext";
import { ingredientsUrl } from "../../utils/constants";

function App() {
  const [data, setData] = React.useState(null);
   useEffect(() => {
    const getData = () => {
      fetch(ingredientsUrl)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(`Ошибка ${res.status}`);
          }
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, []);
  return (
    <div className="App">
      <AppHeader />
      {data && <Main>
          <IngredientsContext.Provider value={{ data, setData }}>
            <BurgerIngredients   />
            <BurgerConstructor  />
          </IngredientsContext.Provider>
        </Main>} 
        
      
    </div>
  );
}

export default App;
