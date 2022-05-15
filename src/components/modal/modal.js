import React from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");
const Modal = ({ onOverlayClick, onEscKeydown, children }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);

    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, []);
  if (!children) return null;
  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.container}>
        <div className={modalStyles.modal}>{children}</div>
        <ModalOverlay onClick={onOverlayClick}></ModalOverlay>
      </div>
    </>,
    modalsContainer
  );
};
Modal.propTypes = {
  onClose: PropTypes.func,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export { Modal };
