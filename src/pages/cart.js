import React, { useEffect, useState } from "react";
import CartList from "@/components/Cart/CartList";
import CartAddressList from "@/components/Cart/CartAddressList";
import CartPayment from "@/components/Cart/CartPayment";
import { DashboardLayout } from "./dashboard-layout";
import { getProductCartApi } from "@/services/api/cart";
import { getAddressesApi } from "@/services/api/address";
import styles from "@/styles/Account.module.css";

import { Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading/Loading";

const Cart = () => {
  const [cart, setCart] = useState(null);

  const [reloadCart, setReloadCart] = useState(false);

  const [products, setProducts] = useState(null);

  const [addresses, setAddresses] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [totalPayment, setTotalPayment] = useState(null);

  const { auth } = useAuth();

  useEffect(() => {
    setCart(null); //para recargar
    setAddresses(null); //para recargar
    setSelectedAddress(null); //para recargar

    getProductCart();
    getAddresses();
  }, []);

  useEffect(() => {
    if (reloadCart) {
      getProductCart();
      setReloadCart(false);
    }
  }, [reloadCart]);

  const getProductCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };

  const getAddresses = async () => {
    const response = await getAddressesApi(auth);
    setAddresses(response.data);
  };

  return (
    <main className={styles.main}>
      <Typography variant="h5" align="left" color="text.secondary" paragraph>
        Carrito
      </Typography>
      {!cart || cart.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          No hay productos en el Carrito
        </Typography>
      ) : (
        <>
          <CartList
            cart={cart}
            products={products}
            setProducts={setProducts}
            setReloadCart={setReloadCart}
            setTotalPayment={setTotalPayment}
          />

          {!addresses ? (
            <Loading text={"Cargando direcciones..."} />
          ) : (
            <CartAddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          )}

          <CartPayment
            products={products}
            addresses={addresses}
            totalPayment={totalPayment}
            selectedAddress={selectedAddress}
          />
        </>
      )}
    </main>
  );
};

Cart.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Cart;
