import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { mountNormalize } from "@/utils/functions";

const iconStyle = {
  fontSize: 60,
  color: "#1565C0",
};

const OrderIndicator = (props) => {
  const { orders } = props;

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [maxProduct, setMaxProduct] = useState("");
  const [maxProductCant, setMaxProductCant] = useState(0);

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
    try {
      const groupedProducts = orders.reduce((acc, curr) => {
        if (!acc[curr.attributes.product.data.attributes.title]) {
          acc[curr.attributes.product.data.attributes.title] = 0;
        }
        acc[curr.attributes.product.data.attributes.title] +=
          curr.attributes.product_quantity;
        return acc;
      }, {});

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
    } catch (error) {}
  }, []);

  return (
    <>
      <Typography variant="h6" align="left" color="text.secondary" paragraph>
        Resumen e indicadores
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 400, bgcolor: "#e3f2fd" }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <ShoppingCartCheckoutIcon sx={iconStyle} />
                </Grid>
                <Grid item xs={10}>
                  <Typography sx={{ fontSize: 22 }} align="right">
                    Productos comprados
                  </Typography>
                  <Typography sx={{ fontSize: 16 }} align="right">
                    Total
                  </Typography>

                  <Typography
                    sx={{ fontSize: 32 }}
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
          <Card sx={{ maxWidth: 400, bgcolor: "#e3f2fd" }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <AddShoppingCartIcon sx={iconStyle} />
                </Grid>
                <Grid item xs={10}>
                  <Typography sx={{ fontSize: 22 }} align="right">
                    Producto más comprado
                  </Typography>
                  <Typography sx={{ fontSize: 16 }} align="right">
                    {maxProduct}
                  </Typography>

                  <Typography
                    sx={{ fontSize: 32 }}
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
          <Card sx={{ maxWidth: 400, bgcolor: "#e3f2fd" }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <AttachMoneyIcon sx={iconStyle} />
                </Grid>
                <Grid item xs={10}>
                  <Typography sx={{ fontSize: 22 }} align="right">
                    Total pedidos
                  </Typography>
                  <Typography sx={{ fontSize: 16 }} align="right">
                    Monto
                  </Typography>
                  <Typography
                    sx={{ fontSize: 32 }}
                    align="right"
                    color="primary"
                  >
                    ${mountNormalize(totalOrders)}
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
