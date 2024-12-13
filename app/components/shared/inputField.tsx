import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label>
        {label}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
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
