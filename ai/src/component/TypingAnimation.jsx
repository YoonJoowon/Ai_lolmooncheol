import React, { useState, useEffect } from "react";

const TypingAnimation = ({ text }) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setTypedText((prevTypedText) => prevTypedText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 70);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return <p>{typedText}</p>;
};

export default TypingAnimation;
