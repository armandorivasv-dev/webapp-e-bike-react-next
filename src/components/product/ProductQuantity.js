import React, { useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";

const options = ["1", "2", "3"];

const ProductQuantity = (props) => {
  const { quantity, setQuantity } = props;
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Autocomplete
        placeholder="Controllable"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setQuantity(Number(newValue));
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        sx={{ width: 100 }}
      />
    </>
  );
};

export default ProductQuantity;
