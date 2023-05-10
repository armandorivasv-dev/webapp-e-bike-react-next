import React, { useEffect, useState } from "react";
import { getCarouselApi } from "@/services/api/carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { API_URL } from "../../utils/constants";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Link from "next/link";

const ProductCarousel = () => {
  const [images, setImages] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getCarouselApi();
      console.log("response", response.data);
      setImages(response.data);
    })();
  }, []);

  return (
    <>
      <Grid container sx={{ maxWidth: 1480 }}>
        {!images ? (
          <h1>Cargando...</h1>
        ) : (
          <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
          >
            {images.map((image) => (
              <Link
                href={`/product/${image.attributes.product.data.id}`}
                key={image.id}
              >
                <div>
                  <img
                    alt={image.attributes.product.data.attributes.title}
                    src={`${API_URL}${image.attributes.image.data.attributes.url}`}
                  />
                </div>
              </Link>
            ))}
          </Carousel>
        )}
      </Grid>
    </>
  );
};

export default ProductCarousel;
