import React, { useRef, useState } from 'react'

 function Hover() {

  const boxRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e) =>  {
    const box = boxRef.current;
    const rect = box.getBoundingClientRect();

    const x = e.clientX - rect.left; // x within box
    const y = e.clientY - rect.top; // y within box

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    // Limit tilt effect
    const rotateX = deltaY * 20; // tilt forward/back
    const rotateY = deltaX * -20; // tilt left/right

    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const resetTransform = () => {
    setTransformStyle("");
  };
  return (
    <div className="flex items-center backdrop-blur-3xl justify-center min-h-screen bg-gray-100">
      <div
        ref={boxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTransform}
        className="w-64 h-64 bg-white rounded-lg shadow-lg transition-transform duration-200 ease-out"
        style={{
          transform: transformStyle,
        }}
      >
        <div className="flex h-full items-center justify-center text-xl font-semibold">
          Hover Me
        </div>
      </div>
    </div>
  );
}

export default Hover