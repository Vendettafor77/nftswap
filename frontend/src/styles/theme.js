// NFT交换应用的主题配置

const theme = {
  colors: {
    primary: "#7B61FF", // 更柔和的紫色
    secondary: "#00B8D9", // 更柔和的青色
    background: "#1A1B25", // 更温和的深色背景
    surface: "#252732", // 更温和的表面色
    error: "#FF5C5C", // 更柔和的错误色
    text: {
      primary: "#F0F2F5", // 不刺眼的主要文字颜色
      secondary: "#C7CCD8", // 更柔和的次要文字颜色
    },
    success: "#36B37E", // 成功色
    warning: "#FFAB00", // 警告色
    accent: "#FF79C6", // 强调色，用于特殊元素
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    round: "50%",
  },
  typography: {
    fontFamily: "'Source Sans Pro', 'Noto Sans TC', 'Noto Sans JP', sans-serif",
    heading: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body: {
      fontWeight: 400,
      lineHeight: 1.6,
    },
  },
  shadows: {
    small: "0 2px 4px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.12)",
    large: "0 8px 16px rgba(0, 0, 0, 0.14)",
  },
};

export default theme;
