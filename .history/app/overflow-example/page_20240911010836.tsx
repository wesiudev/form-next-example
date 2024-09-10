"use client";
import React, { useRef, useState, useEffect } from "react";

const OverflowDetector = () => {
  // Create a reference to the parent div
  const parentRef = useRef(null);

  // State to track if overflow is present
  const [hasOverflow, setHasOverflow] = useState(false);

  // Function to detect overflow
  const checkOverflow = () => {
    const element: any = parentRef.current;
    if (element) {
      const isOverflowing =
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth;
      setHasOverflow(isOverflowing);
    }
  };

  // useEffect to check for overflow after rendering and when the window resizes
  useEffect(() => {
    // Check overflow on mount
    checkOverflow();

    // Check overflow when window is resized
    const handleResize = () => {
      checkOverflow();
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
          width: "300px",
          height: "200px",
          overflow: "auto",
          border: "1px solid black",
        }}
      >
        {/* Content that may overflow */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
          scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
          nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
          aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim
          ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec
          vitae dui eget tellus gravida venenatis. Integer fringilla congue eros
          non fermentum. Sed dapibus pulvinar nibh tempor porta.
        </p>
      </div>

      {/* Display overflow status */}
      <div>{hasOverflow ? "Overflow detected!" : "No overflow"}</div>
    </div>
  );
};

export default OverflowDetector;
