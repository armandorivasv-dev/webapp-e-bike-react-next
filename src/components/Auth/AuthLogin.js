"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { loginApi } from "../../services/api/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "@/hooks/useAuth";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const AuthLogin = (props) => {
  const { changeForm } = props;

  const [message, setMessage] = useState("Ingrese usuario y password");

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        const response = await loginApi(formData);
        if (response.error) throw "Error en usuario o contraseña!!!";
        login(response);
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
          LOGIN
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
            id="identifier"
            label="Ingrese nombre de usuario"
            name="identifier"
            variant="outlined"
            onChange={(event) =>
              formik.setFieldValue("identifier", event.target.value)
            }
            value={formik.values.identifier}
            error={formik.errors.identifier}
          />
          <TextField
            margin="normal"
            name="password"
            fullWidth
            id="password"
            label="Ingrese password"
            variant="outlined"
            type="password"
            onChange={(event) =>
              formik.setFieldValue("password", event.target.value)
            }
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              LOGIN
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => {
                changeForm();
              }}
            >
              NO TIENES CUENTA? IR A REGISTRARSE
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
export default AuthLogin;

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}
