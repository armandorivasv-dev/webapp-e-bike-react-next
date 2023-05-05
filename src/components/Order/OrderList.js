import React from "react";
import OrderListItem from "./OrderListItem";
import Grid from "@mui/material/Grid";

const OrderList = (props) => {
  const { orders } = props;
  console.log("orders in orderlist", orders);
  return (
    <>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <OrderListItem order={order} key={order.id} />
        ))}
      </Grid>
    </>
  );
};

export default OrderList;
