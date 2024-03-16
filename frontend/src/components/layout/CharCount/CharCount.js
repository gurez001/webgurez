import React, { useEffect, useState } from "react";

export const CharCount = ({ char, limit }) => {
  const str = String(char);
  const [chsrLength, setCharLength] = useState(0);
  useEffect(() => {
    if (str) {
      setCharLength(str.length);
    }
  }, [str]);
  return (
    <>
      <span className={chsrLength > limit ? "color-add" : null}>
        {str.length}
      </span>
    </>
  );
};
