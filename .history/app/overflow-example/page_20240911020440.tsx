"use client";
import React, { useRef, useState, useEffect } from "react";

const OverflowingCats = () => {
  // Create a reference to the parent div
  const parentRef = useRef(null);

  // State to track how many images are hidden
  const [hiddenImages, setHiddenImages] = useState(0);

  // Array of random cat image URLs
  const catImages = [
    "https://cataas.com/cat",
    "https://cataas.com/cat",
    "https://cataas.com/cat",
    "https://cataas.com/cat",
    "https://cataas.com/cat",
    "https://cataas.com/cat",
    "https://cataas.com/cat",
    "https://cataas.com/cat",
    "https://cataas.com/cat",
    "https://cataas.com/cat",
  ];

  // Function to detect which images cause overflow
  const detectOverflow = () => {
    const parentElement: any = parentRef.current;
    if (parentElement) {
      const children: any = Array.from(parentElement.children);
      let hiddenCount = 0;

      // Loop through each image and detect if it's overflowing
      for (let i = 0; i < children.length; i++) {
        const img = children[i];

        // Check if the image's bottom or right edge is outside the parent
        if (
          img.offsetTop + img.offsetHeight > parentElement.clientHeight ||
          img.offsetLeft + img.offsetWidth > parentElement.clientWidth
        ) {
          hiddenCount = catImages.length - i;
          break;
        }
      }

      setHiddenImages(hiddenCount);
    }
  };

  // useEffect to detect overflow after rendering and when resizing
  useEffect(() => {
    detectOverflow(); // Run on mount

    // Handle window resize to recalculate
    const handleResize = () => {
      detectOverflow();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        ref={parentRef}
        style={{
          width: "100vw",
          height: "300px",
          overflow: "hidden",
          border: "1px solid black",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {/* Render cat images */}
        {catImages.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Cat ${index}`}
            style={{
              width: "auto",
              height: "140px",
              margin: "",
              visibility:
                catImages.slice(
                  catImages.length - hiddenImages,
                  catImages.length
                ).length >= index
                  ? "visible"
                  : "block",
            }}
          />
        ))}

        <div className="h-max aspect-square flex items-center justify-center bg-red-500 text-white font-bold text-xl">
          {hiddenImages}
        </div>
      </div>

      {/* Display number of hidden images if there are any */}
      {hiddenImages > 0 && (
        <div style={{ marginTop: "10px", fontWeight: "bold" }}>
          {hiddenImages} image{hiddenImages > 1 ? "s" : ""} are hidden due to
          overflow.
        </div>
      )}
    </div>
  );
};

export default OverflowingCats;
