"use client";
import { CldImage } from "next-cloudinary";
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

  return (
    <div className=" size-[500px] bg-red-500 overflow-visible">
      <div
        className="img-magnifier-container relative w-full h-full"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseHover}
      >
        <CldImage
          src={imageUrl}
          alt="Magnifiable"
          className="magnifier-img w-auto h-full object-cover"
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
              className="magnifier-image size-48 border-2  border-white"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "400%", // Zoom level
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
