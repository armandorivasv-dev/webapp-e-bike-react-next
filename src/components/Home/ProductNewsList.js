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
import ProductPriceList from "../product/ProductPriceList";

const ProductNewsList = (props) => {
  const { products } = props;

  const { push } = useRouter();

  // const goToProduct = (id) => {
  //   console.log(id);
  //   push("/product/product", { id });
  // };
  return (
    <>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.id} item md={4} sm={6}>
            <Card sx={{ maxWidth: 400 }}>
              <Image
                width="400"
                height="450"
                alt="Images"
                src={`${API_URL}${product.attributes.main_image.data.attributes.url}`}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.attributes.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.attributes.description}
                </Typography>
                <ProductPriceList
                  price={product.attributes.price}
                  discount={product.attributes.discount}
                />
              </CardContent>
              <CardActions>
                <Link href={`/product/${product.id}`}>
                  <Button size="small" variant="outlined" color="inherit">
                    Ver producto
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductNewsList;
