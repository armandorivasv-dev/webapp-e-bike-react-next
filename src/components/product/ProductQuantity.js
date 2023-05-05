import React, { useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";

const options = ["1", "2", "3"];

const ProductQuantity = (props) => {
  const { quantity, setQuantity } = props;
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  console.log("quantity", quantity);

  // const [items, setItems] = useState([
  //   { label: "1", value: 1 },
  //   { label: "2", value: 2 },
  //   { label: "3", value: 3 },
  // ]);

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
