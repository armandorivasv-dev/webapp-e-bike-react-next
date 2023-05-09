import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { API_URL } from "../../utils/constants";
import Box from "@mui/material/Box";
import { calcPrice, mountNormalize } from "@/utils/functions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import {
  deleteProductCartApi,
  increaseProductCartApi,
  decreaseProductCartApi,
} from "@/services/api/cart";

const CartListItem = (props) => {
  const { product, setReloadCart } = props;

  const deleteProductCart = async () => {
    const response = await deleteProductCartApi(product.data.id);
    response && setReloadCart(true);
  };

  const increaseProductCart = async () => {
    const response = await increaseProductCartApi(product.data.id);
    response && setReloadCart(true);
  };

  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product.data.id);
    response && setReloadCart(true);
  };

  return (
    <>
      {!product ? (
        <h1>Cargando...</h1>
      ) : (
        <Card sx={{ display: "flex", maxWidth: 950, direction: "row", mt: 4 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Image
              width="180"
              height="230"
              alt={product.data.attributes.description}
              src={`${API_URL}${product.data.attributes.main_image.data.attributes.url}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {product.data.attributes.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {product.data.attributes.description}
              </Typography>
              <Typography variant="h5" gutterBottom>
                $
                {mountNormalize(
                  calcPrice(
                    product.data.attributes.price,
                    product.data.attributes.discount
                  )
                )}
              </Typography>
            </CardContent>
          </Grid>
          <CardActions>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              width="200px"
            >
              <IconButton
                aria-label="incrementar"
                onClick={() => {
                  increaseProductCart();
                }}
              >
                <AddCircleIcon
                  fontSize="medium"
                  color="primary"
                ></AddCircleIcon>
              </IconButton>
              <TextField
                margin="normal"
                name="quantity"
                id="quantity"
                variant="outlined"
                sx={{ width: 50 }}
                size="small"
                // onChange={(event) =>
                //   formik.setFieldValue("password", event.target.value)
                // }
                value={product.quantity}
              />
              <IconButton
                aria-label="decrementar"
                onClick={() => {
                  decreaseProductCart();
                }}
              >
                <RemoveCircleIcon
                  fontSize="medium"
                  color="primary"
                ></RemoveCircleIcon>
              </IconButton>
              <IconButton
                aria-label="Borrar del carrito"
                onClick={() => {
                  deleteProductCart();
                }}
              >
                <CancelIcon fontSize="medium"></CancelIcon>
              </IconButton>
            </Grid>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default CartListItem;
