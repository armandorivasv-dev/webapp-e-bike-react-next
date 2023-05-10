import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import PercentIcon from "@mui/icons-material/Percent";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const iconStyle = {
  fontSize: 60,
  color: "#9e9e9e",
};

const OrderIndicator = (props) => {
  const { orders } = props;

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [maxProduct, setMaxProduct] = useState("");
  const [maxProductCant, setMaxProductCant] = useState(0);
  // console.log("orders", orders);
  // console.log("totalProducts", totalProducts);
  // console.log("totalOrders", totalOrders);
  // console.log("maxProduct", maxProduct);
  // console.log("maxProductCant", maxProductCant);

  useEffect(() => {
    let totalProducts = 0;
    let totalOrders = 0;
    orders.map((order) => {
      totalProducts += order.attributes.product_quantity;
      totalOrders += order.attributes.product_payment;
    });
    setTotalProducts(totalProducts);
    setTotalOrders(totalOrders);
  }, []);

  useEffect(() => {
    // console.log("orders in orderindicartors", orders);
    try {
      const groupedProducts = orders.reduce((acc, curr) => {
        // console.log("acc", acc);
        // console.log(
        //   "!acc[curr.attributes.product.data.attributes.title]",
        //   !acc[curr.attributes.product.data.attributes.title]
        // );
        // console.log(
        //   "acc[curr.attributes.product.data.attributes.title]",
        //   acc[curr.attributes.product.data.attributes.title]
        // );
        // console.log("curr", curr);
        if (!acc[curr.attributes.product.data.attributes.title]) {
          acc[curr.attributes.product.data.attributes.title] = 0;
        }
        acc[curr.attributes.product.data.attributes.title] +=
          curr.attributes.product_quantity;
        return acc;
      }, {});
      //console.log("groupedProducts", groupedProducts);

      let maxProduct = "";
      let maxProductCant = -1;

      for (let product in groupedProducts) {
        if (groupedProducts[product] > maxProductCant) {
          maxProductCant = groupedProducts[product];
          maxProduct = product;
        }
      }
      setMaxProduct(maxProduct);
      setMaxProductCant(maxProductCant);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Typography variant="h6" align="left" color="text.secondary" paragraph>
        Resumen e indicadores
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 400, bgcolor: "#e0e0e0" }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <ShoppingCartCheckoutIcon sx={iconStyle} />
                </Grid>
                <Grid item xs={10}>
                  <Typography sx={{ fontSize: 18 }} align="right">
                    Productos comprados
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} align="right">
                    Total
                  </Typography>

                  <Typography
                    sx={{ fontSize: 30 }}
                    align="right"
                    color="primary"
                  >
                    {totalProducts}{" "}
                    <Typography
                      component="span"
                      sx={{ fontSize: 12 }}
                      align="right"
                    >
                      Und
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 400, bgcolor: "#e0e0e0" }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <AddShoppingCartIcon sx={iconStyle} />
                </Grid>
                <Grid item xs={10}>
                  <Typography sx={{ fontSize: 18 }} align="right">
                    Producto más comprado
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} align="right">
                    {maxProduct}
                  </Typography>

                  <Typography
                    sx={{ fontSize: 30 }}
                    align="right"
                    color="primary"
                  >
                    {maxProductCant}{" "}
                    <Typography
                      component="span"
                      sx={{ fontSize: 12 }}
                      align="right"
                    >
                      Und
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 400, bgcolor: "#e0e0e0" }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <AttachMoneyIcon sx={iconStyle} />
                </Grid>
                <Grid item xs={10}>
                  <Typography sx={{ fontSize: 18 }} align="right">
                    Total pedidos
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} align="right">
                    Monto
                  </Typography>
                  <Typography
                    sx={{ fontSize: 30 }}
                    align="right"
                    color="primary"
                  >
                    ${totalOrders}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderIndicator;
