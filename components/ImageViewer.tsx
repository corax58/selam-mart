"use client";
import { MouseEvent, useState } from "react";

const ImageViewer = ({ imageUrl }: { imageUrl: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseHover = (event: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const x = ((event.pageX - left) / width) * 100;
    const y = ((event.pageY - top) / height) * 100;

    setPosition({ x, y });
    setCursorPosition({ x: event.pageX - left, y: event.pageY - top });
  };

  const Image = "https://picsum.photos/id/237/500/800";

  return (
    <div className="relative">
      <div
        className="img-magnifier-container relative w-max"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseHover}
      >
        <img
          src={Image}
          alt="Magnifiable"
          className="magnifier-img w-auto h-[80vh]"
        />

        {showMagnifier && (
          <div
            style={{
              position: "absolute",
              left: `${cursorPosition.x - 100}px`,
              top: `${cursorPosition.y - 100}px`,
              pointerEvents: "none",
            }}
          >
            <div
              className="magnifier-image size-64 border-2 rounded-full border-white"
              style={{
                backgroundImage: `url(${Image})`,
                backgroundSize: "300%", // Zoom level
                backgroundPosition: `${position.x}% ${position.y}%`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
