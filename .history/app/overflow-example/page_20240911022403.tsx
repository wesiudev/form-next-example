"use client";
import React, { useRef, useState, useEffect } from "react";

const OverflowingCats = () => {
  // Create a reference to the parent div
  const parentRef = useRef(null);

  // State to track how many images are hidden and visible
  const [hiddenImages, setHiddenImages] = useState(0);
  const [visibleImages, setVisibleImages] = useState<string[]>([]); // Track visible images

  // Array of random cat image URLs
  const catImages = [
    "https://cataas.com/cat?1",
    "https://cataas.com/cat?2",
    "https://cataas.com/cat?3",
    "https://cataas.com/cat?4",
    "https://cataas.com/cat?5",
    "https://cataas.com/cat?6",
    "https://cataas.com/cat?7",
    "https://cataas.com/cat?8",
    "https://cataas.com/cat?9",
    "https://cataas.com/cat?10",
  ];

  // Function to detect which images cause overflow
  const detectOverflow = () => {
    const parentElement: any = parentRef.current;
    if (parentElement) {
      const children: any = Array.from(parentElement.children);
      let hiddenCount = 0;
      const visible: string[] = [];

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

        // If the image is within bounds, add it to visible images
        visible.push(catImages[i]);
      }

      setHiddenImages(hiddenCount);
      setVisibleImages(visible); // Update visible images
    }
  };

  // useEffect to detect overflow on component mount and when resizing
  useEffect(() => {
    // Detect overflow immediately on mount
    detectOverflow();

    // Add event listener for window resize
    window.addEventListener("resize", detectOverflow);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", detectOverflow);
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
        {/* Render all cat images with styles to hide overflowed images */}
        {catImages.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Cat ${index}`}
            style={{
              width: "auto",
              height: "140px",
              margin: "",
              display: visibleImages.includes(imgSrc) ? "initial" : "none",
            }}
          />
        ))}

        {/* Show hidden images count */}
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
