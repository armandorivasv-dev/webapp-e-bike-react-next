import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { API_URL } from "../../utils/constants";
import Link from "next/link";

const SearchProductList = (props) => {
  const { products } = props;

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

export default SearchProductList;
