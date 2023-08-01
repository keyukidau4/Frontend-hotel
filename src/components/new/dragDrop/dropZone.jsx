import React, { useState } from "react";

const DropZone = () => {
  const [droppedImageSrc, setDroppedImageSrc] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định

    // Lấy thông tin ảnh được thả vào
    const droppedImageSrc = e.dataTransfer.getData("text/plain");
    setDroppedImageSrc(droppedImageSrc);
  };

  return (
    <div
      className="m-5"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: "200px",
        height: "200px",
        position: "relative",
        border: "1px solid red",
      }}
    >
      {droppedImageSrc && <img src={droppedImageSrc} alt="Dropped" />}
    </div>
  );
};

export default DropZone;
