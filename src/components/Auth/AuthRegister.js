"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { registerApi } from "../../services/api/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthRegister = (props) => {
  const { changeForm } = props;

  const { push } = useRouter();

  const [message, setMessage] = useState(
    "Ingrese datos necesarios para el registro"
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        const response = await registerApi(formData);
        if (response.error) throw "Email o username ya existe!!!";
      } catch (error) {
        await toast(error);
      }
    },
  });

  return (
    <Container maxWidth="xs" sx={{ mt: 5, backgroundColor: "#fff" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image width="100" height="100" alt="Images" src={logo} />
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          sx={{ textTransform: "uppercase" }}
        >
          REGISTRO
        </Typography>
        <Box
          component="form"
          sx={{ m: 1, width: "40ch" }}
          noValidate
          autoComplete="on"
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Ingrese email"
            name="email"
            variant="outlined"
            onChange={(event) =>
              formik.setFieldValue("email", event.target.value)
            }
            value={formik.values.email}
            error={formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Ingrese nombre de usuario"
            name="username"
            variant="outlined"
            onChange={(event) =>
              formik.setFieldValue("username", event.target.value)
            }
            value={formik.values.username}
            error={formik.errors.username}
          />

          <TextField
            margin="normal"
            name="password"
            fullWidth
            id="password"
            label="Ingrese password"
            variant="outlined"
            helperText="Mínimo 6 Caracteres"
            type="password"
            onChange={(event) =>
              formik.setFieldValue("password", event.target.value)
            }
            value={formik.values.password}
            error={formik.errors.password}
          />
          <TextField
            margin="normal"
            name="repeatPassword"
            fullWidth
            id="password"
            label="Repetir password"
            variant="outlined"
            helperText="Mínimo 6 Caracteres"
            type="password"
            onChange={(event) =>
              formik.setFieldValue("repeatPassword", event.target.value)
            }
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              //onClick={formik.handleSubmit}
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              REGISTRARSE
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              //onClick={formik.handleSubmit}
              onClick={() => {
                changeForm();
              }}
            >
              YA TIENES CUENTA? IR A LOGIN
            </Button>
          </Box>
          <Box
            sx={{
              mt: 2,
              mb: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {message ? (
              <Typography
                variant="caption"
                gutterBottom
                align="center"
                sx={{ textTransform: "uppercase" }}
              >
                {message}
              </Typography>
            ) : (
              <Typography
                variant="caption"
                gutterBottom
                align="center"
                sx={{ textTransform: "uppercase" }}
              >
                ""
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Toaster position="top-center" duration="4000" />
    </Container>
  );
};
export default AuthRegister;

function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().required(true),
    username: Yup.string().required(true),
    password: Yup.string().required(true).min(6),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true)
      .min(6),
  };
}
