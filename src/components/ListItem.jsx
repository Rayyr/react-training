import React, { useState } from "react";
import Modal from "./Modal.jsx";

function ListItem({ content,isBlocked }) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="student-card">
        <p>{content.name}</p>
        <p>.....</p>

        <button onClick={handleClick} disabled={isBlocked}>View Details</button>
      </div>

      {showModal && (
        <Modal content={content} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default ListItem;
