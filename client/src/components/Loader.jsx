import React from "react";

const Loader = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.dotsContainer}>
        <div style={{ ...styles.dot, animationDelay: "0s" }}></div>
        <div style={{ ...styles.dot, animationDelay: "0.2s" }}></div>
        <div style={{ ...styles.dot, animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(20, 20, 20, 0.7)", // DARK background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  dot: {
    width: "15px",
    height: "15px",
    backgroundColor: "#00cec9", // Light blue-ish color for dots
    borderRadius: "50%",
    animation: "bounce 1s infinite",
  },
};

// Insert bounce keyframes
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Loader;
