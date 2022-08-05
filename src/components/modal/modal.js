import React from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const modalsContainer = document.querySelector("#modals");
const Modal = ({ onClose, children, title }) => {
  const closeModal = () => {
    onClose();
  };
  const onEscKeydown = (e) => {
    e.key === "Escape" && closeModal();
  };
  React.useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);
    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  });
  if (!children) return null;
  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.container}>
        <div className={modalStyles.modal}>
          <div className={`${modalStyles.wrapper}`}>
            <h3 className="text text_type_main-large">{title}</h3>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {children}
        </div>
        <ModalOverlay onClick={closeModal}></ModalOverlay>
      </div>
    </>,
    modalsContainer
  );
};
Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element.isRequired,
  title: PropTypes.string
};
export { Modal };
