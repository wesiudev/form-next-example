"use client";
import React, { useRef, useState, useEffect } from "react";

const OverflowingCats = () => {
  // Create a reference to the parent div
  const parentRef = useRef(null);

  // State to track how many images are hidden
  const [hiddenImages, setHiddenImages] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
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

  // Function to detect which images are visible and update the display
  const detectOverflow = () => {
    const parentElement: any = parentRef.current;
    if (parentElement) {
      const children: any = Array.from(parentElement.children);
      let hiddenCount = 0;
      const visibleImages: string[] = [];

      // Loop through each image and check if it's overflowing
      for (let i = 0; i < children.length; i++) {
        const img = children[i];

        // Check if the image's bottom or right edge is inside the parent
        if (
          img.offsetTop + img.offsetHeight <= parentElement.clientHeight &&
          img.offsetLeft + img.offsetWidth <= parentElement.clientWidth
        ) {
          visibleImages.push(catImages[i]); // Add visible images to the array
        } else {
          hiddenCount = catImages.length - i;
          break;
        }
      }

      setHiddenImages(hiddenCount);
      setDisplayImages(visibleImages); // Update the display with only the visible images
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
          border: "1px solid black",
          display: "flex",
          flexWrap: "wrap",
        }}
        className="relative"
      >
        <div className="z-[50] absolute left-0 top-0 w-full h-full bg-white flex">
          {displayImages?.map((imgSrc, index) => (
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
                    catImages.length,
                    catImages.length - hiddenImages
                  ).length > index
                    ? "hidden"
                    : "visible",
              }}
            />
          ))}
        </div>
        {/* Render cat images */}
        {catImages.map((imgSrc, index) => (
          <img
            className="relative z-[0]"
            key={index}
            src={imgSrc}
            alt={`Cat ${index}`}
            style={{
              width: "auto",
              height: "140px",
              margin: "",
              visibility:
                catImages.slice(
                  catImages.length,
                  catImages.length - hiddenImages
                ).length > index
                  ? "hidden"
                  : "visible",
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
