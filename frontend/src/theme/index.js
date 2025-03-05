const theme = {
  fonts: {
    primary: "'Noto Sans JP', 'Roboto', sans-serif",
    secondary: "'Roboto', sans-serif",
    mono: "monospace",
  },
  colors: {
    primary: "#6a11cb",
    secondary: "#2575fc",
    accent: "#38ef7d",
    surface: "#1c2237",
    background: {
      main: "#0B1021",
      gradient: "linear-gradient(135deg, #0B1021 0%, #131A38 100%)",
      light: "#212a45",
      card: "#181F38",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B6B9C5",
      muted: "#8B8E99",
    },
    status: {
      success: "#42b72a",
      error: "#db3737",
      warning: "#FFC107",
    },
  },
  gradients: {
    primary: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    secondary: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    accent: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    darkBlue: "linear-gradient(135deg, #0f1c41 0%, #223870 100%)",
    background: {
      main: "linear-gradient(135deg, #0B1021 0%, #131A38 100%)",
      subtle:
        "linear-gradient(160deg, rgba(28, 34, 65, 0.8) 0%, rgba(18, 21, 40, 0.9) 100%)",
      animated: "linear-gradient(135deg, #0f1c41 0%, #223870 100%)",
    },
  },
  shadows: {
    small: "0 2px 8px rgba(0, 0, 0, 0.15)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.2)",
    large: "0 8px 24px rgba(0, 0, 0, 0.2)",
    glow: {
      primary: "0 0 20px rgba(106, 17, 203, 0.4)",
      secondary: "0 0 20px rgba(37, 117, 252, 0.4)",
    },
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
    large: "12px",
    xl: "20px",
    round: "50%",
  },
  animations: {
    fast: "0.2s ease",
    default: "0.3s ease",
    slow: "0.5s ease",
  },
};

export default theme;
