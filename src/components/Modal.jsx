import React from "react";
import "../styles/Modal.css";

function Modal({ content, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{content.name}</p>
        <p>{content.email}</p>
        <p>{content.gpa}</p>
        <p>{content.course}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
