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

  console.log("addresses in address", addresses);

  return (
    <main className={styles.main}>
      <div>
        <Typography variant="h6" align="left" color="text.secondary" paragraph>
          Mis direcciones
        </Typography>
      </div>

      {!addresses ? (
        <Typography variant="h7" align="left" color="text.secondary" paragraph>
          Cargando direcciones...
        </Typography>
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
            color="inherit"
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
