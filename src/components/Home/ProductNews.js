import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import ProductNewsList from "./ProductNewsList";
import { getProductLastApi } from "@/services/api/products";

const ProductNews = (props) => {
  const { user } = props;
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getProductLastApi();
      setProducts(response.data);
    })();
  }, []);
  return (
    <>
      {" "}
      <div>
        {!user ? (
          <h1>Cargando</h1>
        ) : (
          <Typography
            variant="h6"
            align="left"
            color="text.secondary"
            paragraph
            ml={2}
          >
            Bienvenido,{" "}
            {user.name && user.lastname
              ? `${user.name} ${user.lastname} `
              : user.email}{" "}
          </Typography>
        )}
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
