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
import { useRouter } from "next/router";
import Link from "next/link";
import { mountNormalize, calcPrice } from "@/utils/functions";
import { deleteFavoriteApi } from "@/services/api/favorite";
import useAuth from "@/hooks/useAuth";
import ProductPriceList from "../product/ProductPriceList";

const FavoriteItem = (props) => {
  const { favorite, setReloadFavorites } = props;

  const { auth } = useAuth();
  console.log("favorite", favorite);

  const price = calcPrice(
    favorite.attributes.product.data.attributes.price,
    favorite.attributes.product.data.attributes.discount
  );

  const deleteFavorite = async (id) => {
    await deleteFavoriteApi(auth, id);
    setReloadFavorites(true);
  };

  return (
    <>
      <Grid item md={4} sm={6}>
        <Card sx={{ maxWidth: 400 }}>
          <Image
            width="400"
            height="450"
            alt="Images"
            src={`${API_URL}${favorite.attributes.product.data.attributes.main_image.data.attributes.url}`}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {favorite.attributes.product.data.attributes.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {favorite.attributes.product.data.attributes.description}
            </Typography>
            <ProductPriceList
              price={favorite.attributes.product.data.attributes.price}
              discount={favorite.attributes.product.data.attributes.discount}
            />
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Link href={`/product/${favorite.attributes.product.data.id}`}>
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  // onClick={() => {
                  //   goToProduct(product.id);
                  // }}
                >
                  Ver producto
                </Button>
              </Link>
              <Button
                size="small"
                variant="outlined"
                color="inherit"
                onClick={() => {
                  deleteFavorite(favorite.attributes.product.data.id);
                }}
              >
                Eliminar de favoritos
              </Button>
            </Grid>

            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default FavoriteItem;
