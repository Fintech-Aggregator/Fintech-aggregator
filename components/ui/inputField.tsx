import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label>
        {label}
        <input
          type={type}
          name={name}
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </label>
    </div>
  );
};

export default InputField;
