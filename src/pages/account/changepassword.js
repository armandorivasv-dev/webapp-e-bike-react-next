import React from "react";
import styles from "@/styles/Account.module.css";
import { DashboardLayout } from "../dashboard-layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useAuth from "@/hooks/useAuth";
import { getUserApi, updateUSerApi } from "@/services/api/auth";
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

const ChangePassword = () => {
  const { auth } = useAuth();

  const { push } = useRouter();

  const [loading, setLoading] = useState(true);

  const notifyOk = () => toast("Datos actualizados.");

  const notifyError = () => toast("Error al actualizar los datos.");

  useEffect(() => {
    (async () => {
      const response = await getUserApi(auth.token);
      console.log("changename - response ->", response);
      await formik.setFieldValue("password", response.password);
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await updateUSerApi(auth, formData);
        await notifyOk();
        push("/");
      } catch (error) {
        await notifyError();
      }
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
          "& .MuiButton-root": { width: "39ch" },
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
            Cambiar contraseña
          </Typography>
        </div>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Nueva contraseña"
            type="password"
            helperText="Mínimo 6 Caracteres"
            value={formik.values.password}
            error={formik.errors.password}
            onChange={(event) =>
              formik.setFieldValue("password", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Repetir contraseña"
            type="password"
            helperText="Mínimo 6 Caracteres"
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            onChange={(event) =>
              formik.setFieldValue("repeatPassword", event.target.value)
            }
          />
        </div>
        <div>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            fullWidth
            //onClick={formik.handleSubmit}
            onClick={() => {
              handleClickOpen();
            }}
          >
            <span>CAMBIAR CONTRASEÑA</span>
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

export default ChangePassword;

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string().required(true).min(6),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true)
      .min(6),
  };
}

ChangePassword.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
