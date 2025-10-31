import React, { useState } from "react";
import ReactDOM from "react-dom";

function Modal({ onClose }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">I am in a Portal!</h2>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

function PortalExample() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Portal Example</h2>
      <button
        onClick={() => setShow(true)}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Open Modal
      </button>
      {show && <Modal onClose={() => setShow(false)} />}
    </div>
  );
}

export default PortalExample;
