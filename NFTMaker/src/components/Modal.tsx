import React from "react";
import "../styles/Modal.css";

interface ModalProps {
  text: string; 
  onClose: () => void; 
}

const Modal: React.FC<ModalProps> = ({ text, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <p>{text}</p>
        </div>
        <div className="modal-actions">
          <button className="ok-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
