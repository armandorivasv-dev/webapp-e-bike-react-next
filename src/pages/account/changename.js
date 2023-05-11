"use client";
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

const ChangeName = () => {
  const { auth } = useAuth();

  const { push } = useRouter();

  const [loading, setLoading] = useState(true);

  const notifyOk = () => toast("Datos actualizados.");

  const notifyError = () => toast("Error al actualizar los datos.");

  useEffect(() => {
    (async () => {
      const response = await getUserApi(auth.token);
      console.log("changename - response ->", response);
      if (response.name && response.lastname) {
        await formik.setFieldValue("name", response.name);
        await formik.setFieldValue("lastname", response.lastname);
      }
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
          "& .MuiTextField-root": { mb: 1, mr: 1, width: "39ch" },
          "& .MuiButton-root": { width: "43ch", height: "55px" },
        }}
        noValidate
        autoComplete="on"
      >
        <div>
          <Typography
            Typography
            variant="h5"
            align="left"
            color="text.secondary"
            paragraph
          >
            Cambiar nombres y apellidos
          </Typography>
        </div>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Nombre"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={(event) =>
              formik.setFieldValue("name", event.target.value)
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Apellidos"
            value={formik.values.lastname}
            error={formik.errors.lastname}
            onChange={(event) =>
              formik.setFieldValue("lastname", event.target.value)
            }
          />
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              handleClickOpen();
            }}
          >
            <span>CAMBIAR NOMBRES Y APELLIDOS</span>
          </Button>
        </div>
        <div></div>
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

export default ChangeName;

function initialValues() {
  return {
    name: "",
    lastname: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}

ChangeName.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// function AlertDialog() {
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open alert dialog
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Use Google's location service?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending
//             anonymous location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleClose} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
