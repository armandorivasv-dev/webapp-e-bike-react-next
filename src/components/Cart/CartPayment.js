import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useAuth from "@/hooks/useAuth";
import { addAddressApi } from "@/services/api/address";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteCartApi, paymentCartApi } from "@/services/api/cart";
import { addOrderApi } from "@/services/api/order";
import Grid from "@mui/material/Grid";

//const stripe = require("stripe-client")(STRIPE_KEY_TEST);

const stripe = require("stripe-client")(
  "sk_test_51MtFbpKjqZPslUDTLeccWpxefzkuIaWCD0Pd7lbbyj3sgnMLizbYl5dcSCeTPNUsp6FCt2JOyQq3KMYvlkLnb7Tj00YfMlfDRb"
);

const CartPayment = (props) => {
  const { totalPayment, products, selectedAddress } = props;

  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();

  const { push } = useRouter();

  // console.log("auth", auth);
  // console.log("products", products);
  // console.log("selectedAddress", selectedAddress);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (FormData) => {
      setLoading(true);
      try {
        const response = await addOrderApi(
          auth,
          Math.floor(Math.random() * 9999999999).toString(),
          products,
          selectedAddress
        );
        if (response.length > 0) {
          await deleteCartApi();
          push("/account/orders");
        } else {
          alert("error al procesar el pago");
        }

        console.log("response", response);
      } catch (error) {
        console.log(error);
      }

      // //const result = await stripe.createToken({ card: FormData });
      // // console.log("result", result);
      // // console.log("FormData", FormData);
      // //console.log("result", JSON.stringify(result, null, 4));
      // if (result?.error) {
      //   setLoading(false);
      //   // Toast.show(result.error.message, {
      //   //   position: Toast.positions.CENTER,
      //   // });
      //   console.log("result.error.message", result.error.message);
      // } else {
      //   const response = await addOrderApi(
      //     auth,
      //     Math.random(26),
      //     products,
      //     selectedAddress
      //   );
      //   console.log("response", response);
      //   if (response.length > 0) {
      //     //await deleteCartApi();
      //     console.log("Eliminar carrito");
      //     //navigation.navigate("account-stack", { screen: "orders" });
      //   } else {
      //     // Toast.show("Error al realizar el pago", {
      //     //   position: Toast.positions.CENTER,
      //     // });
      //     console.log("Error al realizar el pago");
      //     setLoading(false);
      //   }

      //console.log("response", JSON.stringify(response, null, 4));
      // Toast.show("Pago exitoso", {
      //   position: Toast.positions.CENTER,
      // });
      //}
    },
  });

  return (
    <Box
      component="form"
      sx={{ maxWidth: 950 }}
      // sx={{
      //   "& .MuiTextField-root": { width: "50ch", mr: 1 },
      //   "& .MuiButton-root": { width: "56ch" },
      // }}
      noValidate
      autoComplete="on"
    >
      <div>
        <Typography variant="h6" align="left" color="text.secondary" paragraph>
          Agregar forma de pago
        </Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Nombre de la tarjeta"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={(event) =>
              formik.setFieldValue("name", event.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Numero de la tarjeta"
            //sx={{ width: "50ch" }}

            value={formik.values.number}
            error={formik.errors.number}
            onChange={(event) =>
              formik.setFieldValue("number", event.target.value)
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Mes"
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
            onChange={(event) =>
              formik.setFieldValue("exp_month", event.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Año"
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
            onChange={(event) =>
              formik.setFieldValue("exp_year", event.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="CVV/CVC"
            value={formik.values.cvc}
            error={formik.errors.cvc}
            onChange={(event) =>
              formik.setFieldValue("cvc", event.target.value)
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12}>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            fullWidth
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            <span>PAGAR {totalPayment && `($${totalPayment})`} </span>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const initialValues = () => {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
};

const validationSchema = () => {
  return {
    number: Yup.string().min(4).max(16).required(true),
    exp_month: Yup.string().min(1).max(2).required(true),
    exp_year: Yup.string().min(1).max(2).required(true),
    cvc: Yup.string().min(3).max(3).required(true),
    name: Yup.string().min(4).max(18).required(true),
  };
};

export default CartPayment;
