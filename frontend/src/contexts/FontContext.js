import React, { createContext, useContext, useState } from "react";

const fontOptions = {
  notoSansJP: {
    name: "Noto Sans JP",
    label: "Noto Sans JP（モダン）",
    import:
      '@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap")',
    family: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
  },
  zenKakuGothic: {
    name: "Zen Kaku Gothic New",
    label: "Zen Kaku Gothic（クリア）",
    import:
      '@import url("https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap")',
    family: "'Zen Kaku Gothic New', 'Hiragino Kaku Gothic ProN', sans-serif",
  },
  mPlusRounded: {
    name: "M PLUS Rounded 1c",
    label: "M PLUS Rounded（ソフト）",
    import:
      '@import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap")',
    family: "'M PLUS Rounded 1c', 'Hiragino Maru Gothic ProN', sans-serif",
  },
  shipporiMincho: {
    name: "Shippori Mincho",
    label: "凸版明朝（伝統的）",
    import:
      '@import url("https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;700&display=swap")',
    family: "'Shippori Mincho', 'Hiragino Mincho ProN', serif",
  },
};

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [currentFont, setCurrentFont] = useState("notoSansJP");

  const value = {
    currentFont,
    setCurrentFont,
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
