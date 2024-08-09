import React from "react";

const FormInput = ({ type, value, placeholder, mode, onChange, name }) => {
  const readOnly = mode === "create";

  // Determine the input type based on the type group

  const inputType = mode === "view" ? type : "text";

  return (
    <input
      type={inputType}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      style={{ width: "100%", marginBottom: "5px" }}
      onChange={!readOnly ? onChange : undefined}
      name={name}
    />
  );
};

export default FormInput;
