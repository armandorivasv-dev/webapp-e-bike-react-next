import React, { useEffect, useState } from "react";
import styles from "@/styles/Account.module.css";
import { DashboardLayout } from "../dashboard-layout";
import AddressList from "@/components/Address/AddressList";
import { Typography } from "@mui/material";
import { getAddressesApi } from "@/services/api/address";
import useAuth from "@/hooks/useAuth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";

const Address = () => {
  const [addresses, setAddresses] = useState("");

  const { auth } = useAuth();

  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth);
      setAddresses(response.data);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <Typography variant="h5" align="left" color="text.secondary" paragraph>
          Mis direcciones
        </Typography>
      </div>

      {!addresses ? (
        <Loading text={"Cargando direcciones..."} />
      ) : addresses.length === 0 ? (
        <Typography variant="h7" align="left" color="text.secondary" paragraph>
          No tienes direcciones registradas, crea tu primera dirección...
        </Typography>
      ) : (
        <AddressList addresses={addresses} />
      )}
      <Box
        sx={{
          "& .MuiButton-root": { width: "39ch", mb: 2 },
        }}
        noValidate
        autoComplete="on"
      >
        <div>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={() => {
              push("/account/addaddress");
            }}
          >
            <span>AGREGAR UNA DIRECCION</span>
          </Button>
        </div>
      </Box>
    </main>
  );
};

export default Address;

Address.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
