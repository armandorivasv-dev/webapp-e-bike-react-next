import React from "react";
import Typography from "@mui/material/Typography";
import { mountNormalize } from "@/utils/functions";

const ProductPrice = (props) => {
  const { price, discount } = props;
  const mountDiscount = (price * discount) / 100;
  return (
    <>
      {discount && (
        <>
          <Typography variant="h7" component="div" sx={{ mt: 4 }}>
            Antes: ${mountNormalize(price)}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" color="primary">
            Ahora: ${mountNormalize(price - mountDiscount)} (-
            {discount}%)
          </Typography>
        </>
      )}

      {!discount && (
        <Typography variant="h5" component="div" sx={{ mt: 4 }}>
          ${mountNormalize(price)}
        </Typography>
      )}
    </>
  );
};

export default ProductPrice;
