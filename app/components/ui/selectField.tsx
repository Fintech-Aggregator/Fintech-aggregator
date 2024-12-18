import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label>
        {label}
        <select
          name={name}
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectField;
