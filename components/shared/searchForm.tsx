import React from "react";
import InputField from "../ui/inputField";
import SelectField from "../ui/selectField";
import Button from "../ui/button";

const SearchForm: React.FC = () => {
  return (
    <form style={{ width: "420px", margin: "0 auto", padding: "16px" }}>
      <InputField
        label="Name of Licensee"
        name="name"
      />
      <InputField
        label="License No."
        name="license"
      />
      <InputField
        label="Address"
        name="address"
      />
      <SelectField
        label="District"
        name="district"
        options={["District 1", "District 2", "District 3"]}
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
          variant="primary"
        />
        <Button
          label="Clear"
          size="large"
          type="button"
          variant="secondary"
        />
      </div>
    </form>
  );
};

export default SearchForm;
