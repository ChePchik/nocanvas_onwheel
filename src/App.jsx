import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const layerRef = useRef(null);

  const [viewport, setViewport] = useState({
    offset: {
      x: 0.0,
      y: 0.0
    },
    zoom: 1
  });
  let scale = 1

  const [isDragging, setIsDragging] = useState(false);

  const onWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.ctrlKey) {
        setViewport((prev) => {
        let delta = e.deltaY || e.detail || e.wheelDelta
console.log(delta,'delta');
        if ( delta > 0 && scale<5) 
            scale += 0.05;
        else if (delta < 0 && scale>0.125)
         scale -= 0.05;
        console.log(scale);

        return {
          ...prev,
          zoom:Math.min(Math.max(0.125, scale ), 5)
        };
      });
    }
  };
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      return;
    }

    if (e.buttons !== 1) {
      setIsDragging(false);

      return;
    }

    setViewport((prev) => ({
      ...prev,
      offset: {
        x: prev.offset.x + e.movementX / viewport.zoom,
        y: prev.offset.y + e.movementY / viewport.zoom
      },
    }));
  };

  useEffect(() => {
    if (!layerRef.current) {
      return;
    }

if (layerRef.current.addEventListener) {
  if ('onwheel' in document) {
    // IE9+, FF17+, Ch31+
    layerRef.current.addEventListener("wheel", onWheel);
  } else if ('onmousewheel' in document) {
    // устаревший вариант события
    layerRef.current.addEventListener("mousewheel", onWheel);
  } else {
    // Firefox < 17
    layerRef.current.addEventListener("MozMousePixelScroll", onWheel);
  }
} else { // IE8-
  elem.attachEvent("onmousewheel", onWheel);
}

  
  }, [setViewport]);

  return (
    <div
      className="app"
      ref={layerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="container">
        <div
          className="nodes-container"
          style={{
            transform: `translate(${viewport.offset.x * viewport.zoom}px, ${
              viewport.offset.y * viewport.zoom
            }px) scale(${viewport.zoom})`
          }}
        >
          <div
            style={{
              top: -20,
              left: -60
            }}
            className="node"
          >
            node #1
          </div>
          <div
            style={{
              top: 230,
              left: 150
            }}
            className="node"
          >
            node #2
          </div>
          <div
            style={{
              top: 330,
              left: 350
            }}
            className="node"
          >
            node #3
          </div>
          <div
            style={{
              top: 1200,
              left: 600
            }}
            className="node"
          >
            node #4
          </div>
        </div>
      </div>
    </div>
  );
}
