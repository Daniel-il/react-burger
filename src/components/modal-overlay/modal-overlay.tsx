import overlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { FC } from "../../services/types/utils";

type TModalOverlayProps = {
  onClick: () => void;
};
const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => {
  return <div className={overlayStyles.overlay} onClick={onClick}></div>;
};
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export { ModalOverlay };
