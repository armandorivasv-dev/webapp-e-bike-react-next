import React from "react";
import OrderListItem from "./OrderListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const OrderList = (props) => {
  const { orders } = props;

  return (
    <>
      <Typography
        variant="h6"
        align="left"
        color="text.secondary"
        paragraph
        mt={4}
      >
        Listado de productos comprados
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <OrderListItem order={order} key={order.id} />
        ))}
      </Grid>
    </>
  );
};

export default OrderList;
