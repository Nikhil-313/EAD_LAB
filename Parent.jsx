import React, { useState } from "react";
import Child from "./Child";

function Parent() {
  const [message, setMessage] = useState("Hello from Parent!");

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">State & Props</h2>
      <Child text={message} />
      <button
        onClick={() => setMessage("Message Updated!")}
        className="px-3 py-1 bg-green-500 text-white rounded mt-2"
      >
        Change Message
      </button>
    </div>
  );
}

export default Parent;
