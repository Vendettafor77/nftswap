import React, { createContext, useContext, useState } from "react";

// 只保留 M PLUS Rounded 1c 字體
const fontOptions = {
  mPlusRounded: {
    name: "M PLUS Rounded 1c",
    label: "M PLUS Rounded 1c",
    import:
      '@import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap")',
    family: "'M PLUS Rounded 1c', 'Hiragino Maru Gothic ProN', sans-serif",
  },
};

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  // 直接使用 mPlusRounded 作為默認字體
  const [currentFont] = useState("mPlusRounded");

  const value = {
    currentFont,
    fontOptions,
    currentFontFamily: fontOptions[currentFont].family,
  };

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
