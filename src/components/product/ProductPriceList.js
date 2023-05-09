import React from "react";
import Typography from "@mui/material/Typography";
import { mountNormalize } from "@/utils/functions";
import { Grid } from "@mui/material";

const ProductPriceList = (props) => {
  const { price, discount } = props;
  const mountDiscount = (price * discount) / 100;
  return (
    <>
      {discount && (
        <>
          <>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography
                variant="h7"
                component="div"
                sx={{ textDecoration: "line-through" }}
              >
                ${mountNormalize(price)}
              </Typography>
              <Typography
                variant="h7"
                component="div"
                color="#bc0e0d"
                sx={{ ml: 2 }}
              >
                ${mountNormalize(price - mountDiscount)} (-
                {discount}%)
              </Typography>
            </Grid>
          </>
        </>
      )}

      {!discount && (
        <>
          <Typography variant="h7" component="div">
            ${mountNormalize(price)}
          </Typography>
        </>
      )}
    </>
  );
};

export default ProductPriceList;
