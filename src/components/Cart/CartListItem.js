import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { API_URL } from "../../utils/constants";
import Link from "next/link";
import Box from "@mui/material/Box";
import ProductPrice from "../product/ProductPrice";
import ProductQuantity from "../product/ProductQuantity";
import { calcPrice } from "@/utils/functions";
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

  console.log("cartlistitem - product", product);

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
        <>
          <Card sx={{ display: "flex", maxWidth: 900, mt: 4 }}>
            <Image
              width="200"
              height="250"
              alt="Images"
              src={`${API_URL}${product.data.attributes.main_image.data.attributes.url}`}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {product.data.attributes.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.data.attributes.description}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {calcPrice(
                    product.data.attributes.price,
                    product.data.attributes.discount
                  )}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  width="600px"
                >
                  <IconButton
                    aria-label="incrementar"
                    onClick={() => {
                      increaseProductCart();
                    }}
                  >
                    <AddCircleIcon
                      fontSize="large"
                      color="primary"
                    ></AddCircleIcon>
                  </IconButton>
                  <TextField
                    margin="normal"
                    name="quantity"
                    id="quantity"
                    variant="outlined"
                    sx={{ width: 50 }}
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
                      fontSize="large"
                      color="primary"
                    ></RemoveCircleIcon>
                  </IconButton>
                  <IconButton
                    aria-label="Borrar del carrito"
                    onClick={() => {
                      deleteProductCart();
                    }}
                  >
                    <CancelIcon fontSize="large"></CancelIcon>
                  </IconButton>
                  {/* <ProductQuantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                /> */}
                  {/* <ProductBuy product={product} quantity={quantity} /> */}
                  {/* <ProductFavorite product={product.id} /> */}
                  {/* <Link href={`/product/${product.id}`}>
                <Button
                  size="small"
                  // onClick={() => {
                  //   goToProduct(product.id);
                  // }}
                >
                  Ver mas
                </Button>
              </Link> */}

                  {/* <Button size="small">Learn More</Button> */}
                </Grid>
              </CardActions>
            </Box>
          </Card>
        </>
      )}
    </>
  );
};

export default CartListItem;
