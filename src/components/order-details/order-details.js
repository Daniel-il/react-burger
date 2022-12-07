import orderStyles from "./order-details.module.css";
import doneIcon from "../../images/done.png";
import PropTypes from 'prop-types'
function OrderDetails(props) {
  return (
    <>
      <p className={`text text_type_digits-large ${orderStyles.digits}`}>
        {props.orderNumber}
      </p>
      <p className={`text text_type_main-medium mb-15 ${orderStyles.text}`}>
        идентификатор заказа
      </p>
      <img className={orderStyles.img} alt='иконка готово' src={doneIcon} />
      <p className={`text text_type_main-default mb-2 ${orderStyles.text}`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`text text_type_main-default  text_color_inactive mb-30 ${orderStyles.text}`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

OrderDetails.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export { OrderDetails };
