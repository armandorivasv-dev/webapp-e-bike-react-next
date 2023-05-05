import "@/styles/globals.css";
import { useState, useMemo, useEffect } from "react";
import Login from "./login";
import useAuth from "@/hooks/useAuth";
import AuthContext from "@/context/AuthContext";
import {
  setTokenApi,
  removeTokenApi,
  getTokenApi,
} from "../services/api/token";
import jwtDecode from "jwt-decode";
//import { ThemeProvider } from "@mui/material/styles";
//import { themeCustom } from "@/theme/theme";

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const getLayout = Component.getLayout || ((page) => page);

  // console.log("App - auth", auth);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user.id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    //  <ThemeProvider theme={themeCustom}>
    <AuthContext.Provider value={authData}>
      {auth ? getLayout(<Component {...pageProps} />) : <Login />}
    </AuthContext.Provider>
    // </ThemeProvider>
  );
}
