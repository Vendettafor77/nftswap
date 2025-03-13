import React from "react";
import PropTypes from "prop-types";

/**
 * 共享漸變文字組件
 *
 * @param {Object} props - 組件屬性
 * @param {string} props.children - 文字內容
 * @param {string} props.id - 唯一標識符（用於生成漸變ID）
 * @param {string} props.fontSize - 字體大小
 * @param {string} props.height - SVG高度
 * @param {string} props.maxWidth - 最大寬度
 * @param {boolean} props.centered - 是否居中
 * @param {string} props.startColor - 漸變起始顏色
 * @param {string} props.endColor - 漸變結束顏色
 * @param {string} props.className - 附加類名
 * @param {Object} props.style - 附加樣式
 * @param {string} props.letterSpacing - 字母間距
 * @param {string} props.fontWeight - 字體粗細
 * @param {string} props.marginBottom - 底部邊距
 * @returns {JSX.Element} 漸變文字SVG
 */
const GradientText = ({
  children,
  id,
  fontSize = "1.1rem",
  height = "26",
  maxWidth = "100%",
  centered = false,
  startColor = "#6a11cb",
  endColor = "#2575fc",
  className,
  style = {},
  letterSpacing = "0.01em",
  fontWeight = "600",
  marginBottom = "0",
}) => {
  // 生成唯一的漸變ID
  const uniqueId = id
    ? `gradient-${id}`
    : `gradient-${Math.random().toString(36).substring(7)}`;

  // 根據字體大小和居中設置調整文本位置
  const getTextX = () => {
    if (centered) return "50%";
    return "0";
  };

  // 根據字體大小調整文本Y位置
  const getTextY = () => {
    if (fontSize === "2.5rem") return "45";
    if (fontSize === "1.8rem") return "30";
    if (fontSize === "1.5rem") return "25";
    if (fontSize === "1.2rem") return "20";
    return "18"; // 默認值
  };

  // 設置文本錨點
  const getTextAnchor = () => {
    return centered ? "middle" : "start";
  };

  return (
    <svg
      width="100%"
      height={height}
      style={{
        maxWidth: maxWidth,
        overflow: "visible",
        filter: "drop-shadow(0 0 1px rgba(106, 17, 203, 0.15))",
        marginBottom: marginBottom,
        ...style,
      }}
      className={className}
    >
      <defs>
        <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
      <text
        x={getTextX()}
        y={getTextY()}
        fill={`url(#${uniqueId})`}
        fontWeight={fontWeight}
        fontSize={fontSize}
        fontFamily="inherit"
        letterSpacing={letterSpacing}
        textAnchor={getTextAnchor()}
        dominantBaseline="middle"
        style={{
          fontFamily: "inherit",
          textRendering: "optimizeLegibility",
          shapeRendering: "geometricPrecision",
          opacity: "0.95",
        }}
      >
        {children}
      </text>
    </svg>
  );
};

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  fontSize: PropTypes.string,
  height: PropTypes.string,
  maxWidth: PropTypes.string,
  centered: PropTypes.bool,
  startColor: PropTypes.string,
  endColor: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  letterSpacing: PropTypes.string,
  fontWeight: PropTypes.string,
  marginBottom: PropTypes.string,
};

export default GradientText;
