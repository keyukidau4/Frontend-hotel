import React, { useState } from "react";
import DropZone from "./dropZone";

const DragDropImage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    // Tính toán vị trí bắt đầu kéo
    const initialX = e.clientX - position.x;
    const initialY = e.clientY - position.y;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "/images/hotel_2.jpg");
    setPosition({ ...position, initialX, initialY });
  };

  const handleDrag = (e) => {
    // Tính toán vị trí mới khi kéo
    const newX = e.clientX - position.initialX;
    const newY = e.clientY - position.initialY;
    setPosition({ ...position, x: newX, y: newY });
  };
  return (
    <div className="container">
      <div className="row">
        <h1>Stamps</h1>
        <div className="m-5 position-relative">
          <img
            src="/images/hotel_2.jpg"
            alt="Drag me"
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            style={{
              position: "absolute",
              left: position.x,
              top: position.y,
              cursor: "grab",
              width: "150px",
              borderRadius: "50%",
              height: "120px",
            }}
          />
        </div>
        <div className="m-5">
          <DropZone />
        </div>
      </div>
    </div>
  );
};

export default DragDropImage;
