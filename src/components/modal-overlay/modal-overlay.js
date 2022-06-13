import overlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
const ModalOverlay = ({ onClick, children }) => {
  return <div className={overlayStyles.overlay} onClick={onClick}></div>;
};
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export { ModalOverlay };
