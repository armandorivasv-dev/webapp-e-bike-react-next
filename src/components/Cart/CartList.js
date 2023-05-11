import React, { useEffect } from "react";
import CartListItem from "./CartListItem";
import { getProductItemApi } from "@/services/api/products";
import { Typography } from "@mui/material";
import { mountNormalize, calcPrice } from "@/utils/functions";

const CartList = (props) => {
  const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;
  console.log("cart", cart);
  console.log("products", products);

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      let totalPaymentTemp = 0;
      for await (const product of cart) {
        const response = await getProductItemApi(product.idProduct);
        console.log("cartlist - response", response);
        response.quantity = product.quantity;
        productsTemp.push(response);
        totalPaymentTemp +=
          calcPrice(
            response.data.attributes.price,
            response.data.attributes.discount
          ) * response.quantity;
      }
      setProducts(productsTemp);
      setTotalPayment(mountNormalize(totalPaymentTemp));
    })();
  }, [cart]);

  return (
    <>
      {!products ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          <Typography
            variant="h6"
            align="left"
            color="text.secondary"
            paragraph
          >
            Productos en el carrito
          </Typography>
          {products.map((product) => (
            <CartListItem
              product={product}
              key={product.data.id}
              setReloadCart={setReloadCart}
            />
          ))}
        </>
      )}
    </>
  );
};

export default CartList;
