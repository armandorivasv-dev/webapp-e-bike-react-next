import React, { useEffect, useState } from "react";
import router from "next/router";
import { DashboardLayout } from "../dashboard-layout";
import { getProductItemApi } from "@/services/api/products";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { API_URL } from "../../utils/constants";
import Box from "@mui/material/Box";
import ProductPrice from "@/components/product/ProductPrice";
import ProductQuantity from "@/components/product/ProductQuantity";
import ProductBuy from "@/components/product/ProductBuy";
import ProductFavorite from "@/components/product/ProductFavorite";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Loading from "@/components/Loading/Loading";
import styles from "@/styles/Account.module.css";
import Grid from "@mui/material/Grid";

const Product = () => {
  const [product, setProduct] = useState(null);
  const idProduct = router.query;
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState(null);

  useEffect(() => {
    setProduct(null);
    setImages(null);
    (async () => {
      const response = await getProductItemApi(idProduct.slug);
      setProduct(response.data);
      try {
        if (response.data.attributes.carrusel_image.data === null) {
          const imageMain = [response.data.attributes.main_image.data];
          setImages(imageMain);
        } else {
          const imageAll = [response.data.attributes.main_image.data];
          imageAll.push(...response.data.attributes.carrusel_image.data);
          setImages(imageAll);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [idProduct.slug]);

  return (
    <main className={styles.main}>
      {!product ? (
        <Loading text={"Cargando productos..."} />
      ) : (
        <>
          <Card sx={{ display: "flex", flexDirection: "row", mt: 4 }}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Box sx={{ display: "flex" }}>
                  {!images ? (
                    <Loading text={"Cargando imágenes..."} />
                  ) : (
                    <Carousel
                      showArrows={true}
                      showThumbs={false}
                      axis="vertical"
                    >
                      {images.map((image) => (
                        <div key={image.id}>
                          <img
                            // width="150"
                            // height="650"
                            alt={image.attributes.name}
                            src={`${API_URL}${image.attributes.url}`}
                          />
                        </div>
                      ))}
                    </Carousel>
                  )}
                </Box>
              </Grid>

              <Grid item>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {product.attributes.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Tipo: {product.attributes.category}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {product.attributes.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {product.attributes.description_long}
                    </Typography>

                    <ProductPrice
                      price={product.attributes.price}
                      discount={product.attributes.discount}
                    />
                  </CardContent>
                  <CardActions sx={{ mt: 4 }}>
                    <ProductQuantity
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                    <ProductBuy product={product} quantity={quantity} />
                    <ProductFavorite product={product.id} />
                  </CardActions>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </>
      )}
    </main>
  );
};

export default Product;

Product.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
