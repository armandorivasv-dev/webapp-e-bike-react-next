import { useEffect, useState } from "react";
import styles from "@/styles/Account.module.css";
import { DashboardLayout } from "../dashboard-layout";
import OrderList from "@/components/Order/OrderList";
import useAuth from "@/hooks/useAuth";
import { getOrdersApi } from "@/services/api/order";
import { Typography } from "@mui/material";

const Orders = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth);
      setOrders(response.data);
      console.log("response", response.data);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <Typography variant="h5" align="left" color="text.secondary" paragraph>
        Listado de productos comprados
      </Typography>

      {!orders ? (
        <h1>Cargando...</h1>
      ) : orders.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          No hay productos en carrito
        </Typography>
      ) : (
        <OrderList orders={orders} />
      )}
    </main>
  );
};

export default Orders;

Orders.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};