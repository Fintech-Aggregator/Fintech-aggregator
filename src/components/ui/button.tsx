import React from "react";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  onClick,
  variant = "primary",
  size = "medium",
}) => {
  const sizeStyles = {
    small: {
      padding: "6px 12px",
      fontSize: "12px",
    },
    medium: {
      padding: "10px 16px",
      fontSize: "14px",
    },
    large: {
      padding: "10px 16px",
      fontSize: "16px",
      width: "168px",
      height: "40px",
    },
  };
  const styles = {
    primary: {
      backgroundColor: "#00cc99",
      color: "black",
      fontWeight: "600",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      ...sizeStyles[size],
    },
    secondary: {
      backgroundColor: "white",
      color: "#00cc99",
      fontWeight: "600",
      border: "1px solid #00cc99",
      borderRadius: "12px",
      cursor: "pointer",
      ...sizeStyles[size],
    },
  };

  return (
    <button type={type} onClick={onClick} style={styles[variant]}>
      {label}
    </button>
  );
};

export default Button;
