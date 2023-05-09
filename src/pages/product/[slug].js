"use client";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { DashboardLayout } from "../dashboard-layout";
import { getProductItemApi } from "@/services/api/products";
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
import ProductPrice from "@/components/product/ProductPrice";
import ProductQuantity from "@/components/product/ProductQuantity";
import ProductBuy from "@/components/product/ProductBuy";
import ProductFavorite from "@/components/product/ProductFavorite";

//import { Carousel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Product = () => {
  const [product, setProduct] = useState(null);
  const idProduct = router.query;

  const [quantity, setQuantity] = useState(1);

  const [images, setImages] = useState(null);

  console.log("images", images);

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
    <>
      {!product ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          <Card sx={{ display: "flex", maxWidth: 900, mt: 4 }}>
            {/* <Image
              width="500"
              height="550"
              alt="Images"
              src={`${API_URL}${product.attributes.main_image.data.attributes.url}`}
            /> */}
            {!images ? (
              <h1>Cargando imagenes...</h1>
            ) : (
              <Carousel showArrows={true} showThumbs={false}>
                {images.map((image) => (
                  <div key={image.id}>
                    <Image
                      width="450"
                      height="650"
                      alt={image.attributes.name}
                      src={`${API_URL}${image.attributes.url}`}
                    />
                  </div>
                ))}
              </Carousel>
            )}

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {product.attributes.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.attributes.description}
                </Typography>
                <ProductPrice
                  price={product.attributes.price}
                  discount={product.attributes.discount}
                />
              </CardContent>
              <CardActions>
                <ProductQuantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <ProductBuy product={product} quantity={quantity} />
                <ProductFavorite product={product.id} />
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
              </CardActions>
            </Box>
          </Card>
        </>
      )}
    </>
  );
};

export default Product;

Product.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
