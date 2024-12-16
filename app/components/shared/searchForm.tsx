import React, { useState } from "react";
import InputField from "./inputField";
import SelectField from "./selectField";
import Button from "./button";

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    license: "",
    address: "",
    district: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Searching with data:", formData);
  };

  const handleClear = () => {
    setFormData({
      name: "",
      license: "",
      address: "",
      district: "",
    });
  };

  return (
    <form style={{ width: "420px", margin: "0 auto", padding: "16px" }}>
      <InputField
        label="Name of Licensee"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        label="License No."
        name="license"
        value={formData.license}
        onChange={handleChange}
      />
      <InputField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <SelectField
        label="District"
        name="district"
        options={["District 1", "District 2", "District 3"]}
        value={formData.district}
        onChange={handleChange}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Button
          label="Search"
          size="large"
          type="button"
          onClick={handleSearch}
          variant="primary"
        />
        <Button
          label="Clear"
          size="large"
          type="button"
          onClick={handleClear}
          variant="secondary"
        />
      </div>
    </form>
  );
};

export default SearchForm;
