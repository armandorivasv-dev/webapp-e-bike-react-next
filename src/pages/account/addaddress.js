import React from "react";
import styles from "@/styles/Account.module.css";
import { DashboardLayout } from "../dashboard-layout";
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

const AddAddress = () => {
  const { auth } = useAuth();

  const { push } = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await addAddressApi(auth, formData);
        push("/account/address");
      } catch (error) {
        console.log(error);
      }

      // setLoading(false);
    },
  });
  //dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    formik.handleSubmit();
  };
  //dialog

  return (
    <main className={styles.main}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 1, mr: 1, width: "35ch" },
          "& .MuiButton-root": { width: "79ch" },
        }}
        noValidate
        autoComplete="on"
      >
        <div>
          <Typography
            variant="h6"
            align="left"
            color="text.secondary"
            paragraph
          >
            Agregar nueva direccion
          </Typography>
        </div>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Titulo"
            value={formik.values.title}
            error={formik.errors.title}
            onChange={(event) =>
              formik.setFieldValue("title", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Referencia"
            value={formik.values.name_lastname}
            error={formik.errors.name_lastname}
            onChange={(event) =>
              formik.setFieldValue("name_lastname", event.target.value)
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Dirección"
            value={formik.values.address}
            error={formik.errors.address}
            onChange={(event) =>
              formik.setFieldValue("address", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Codigo postal"
            value={formik.values.postal_code}
            error={formik.errors.postal_code}
            onChange={(event) =>
              formik.setFieldValue("postal_code", event.target.value)
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Cuidad"
            value={formik.values.city}
            error={formik.errors.city}
            onChange={(event) =>
              formik.setFieldValue("city", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Estado"
            value={formik.values.state}
            error={formik.errors.state}
            onChange={(event) =>
              formik.setFieldValue("state", event.target.value)
            }
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Pais"
            value={formik.values.country}
            error={formik.errors.country}
            onChange={(event) =>
              formik.setFieldValue("country", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Teléfono"
            value={formik.values.phone}
            error={formik.errors.phone}
            onChange={(event) =>
              formik.setFieldValue("phone", event.target.value)
            }
          />
        </div>
        <div>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            fullWidth
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            <span>AGREGAR DIRECCIÓN</span>
          </Button>
        </div>
      </Box>
      <Toaster position="top-center" duration="4000" />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro que desea realizar los cambios?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default AddAddress;

function initialValues() {
  return {
    title: "",
    name_lastname: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name_lastname: Yup.string().required(true),
    address: Yup.string().required(true),
    postal_code: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    country: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}

AddAddress.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
