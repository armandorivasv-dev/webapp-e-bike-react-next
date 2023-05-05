import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addProductCartApi } from "@/services/api/cart";

import Box from "@mui/material/Box";

const ProductBuy = (props) => {
  const { product, quantity } = props;

  console.log("ProductBuy - product ->", product);
  console.log("ProductBuy - quantity ->", quantity);

  const addProductCart = async () => {
    const response = await addProductCartApi(product.id, quantity);
    console.log("response", response);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="inherit"
        fullWidth
        //onClick={formik.handleSubmit}
        onClick={() => {
          addProductCart();
        }}
      >
        AGREGAR AL CARRITO
      </Button>
    </Box>
  );
};

export default ProductBuy;
