import React from "react";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  onClick,
  variant = "primary",
}) => {
  const styles = {
    primary: {
      backgroundColor: "#00cc99",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    secondary: {
      backgroundColor: "white",
      color: "#00cc99",
      border: "1px solid #00cc99",
      padding: "10px 16px",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <button type={type} onClick={onClick} style={styles[variant]}>
      {label}
    </button>
  );
};

export default Button;
