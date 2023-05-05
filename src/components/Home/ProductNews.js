import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import ProductNewsList from "./ProductNewsList";
import { getProductLastApi } from "@/services/api/products";

const ProductNews = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getProductLastApi();
      setProducts(response.data);
      console.log("response", response.data);
    })();
  }, []);
  return (
    <>
      {" "}
      <div>
        <Typography variant="h6" align="left" color="text.secondary" paragraph>
          Nuevos productos
        </Typography>
        {products ? (
          <ProductNewsList products={products} />
        ) : (
          <Typography
            variant="h6"
            align="left"
            color="text.secondary"
            paragraph
          >
            No hay productos
          </Typography>
        )}
      </div>
    </>
  );
};

export default ProductNews;
