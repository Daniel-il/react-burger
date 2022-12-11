import React, {  ReactNode } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "../../services/types/utils";
type TModalProps = {
  onClose: () => void;
  children: ReactNode;
  title: string;
};

const modalsContainer = document.querySelector("#modals")!;
const Modal: FC<TModalProps> = ({ onClose, children, title }) => {
  const closeModal = () => {
    onClose();
  };
  const onEscKeydown = (e: KeyboardEventInit) => {
    e.key === "Escape" && closeModal();
  };
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
export { Modal };
