import React from "react";
import "./app";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ingredientsUrl } from "../../utils/constants";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";

function App() {
  
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
 
  const openOrderModal = () => {
    setIsOrderDetailsOpened(true);
  };
  const closeOrderModal = () => {
    setIsOrderDetailsOpened(false);
  };
  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeOrderModal();
  };
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
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
      {isOrderDetailsOpened === true && (
        <Modal onOverlayClick={closeOrderModal} onEscKeydown={handleEscKeydown}>
          <OrderDetails onClick={closeOrderModal}/>
        </Modal>
      )}
      
      <AppHeader />
      {data !== null && (
        <Main>
          <BurgerIngredients burgersData={data} />
          <BurgerConstructor
            burgersData={data}
            openModal={openOrderModal}
          />
        </Main>
      )}
    </div>
  );
}

export default App;
