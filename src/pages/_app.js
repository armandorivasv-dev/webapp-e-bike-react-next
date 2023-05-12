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
import ResponsiveDrawer from "@/components/Menu/ResponsiveDrawer";
import { getProductCartApi } from "@/services/api/cart";

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const getLayout = Component.getLayout || ((page) => page);
  const [badgeCart, setBadgeCart] = useState(null);

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

  useEffect(() => {
    (async () => {
      const response = await getProductCartApi();
      setBadgeCart(response.length);
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

  const badgeData = useMemo(
    () => badgeCart,

    [badgeCart]
  );

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
    <AuthContext.Provider value={authData}>
      {auth ? (
        getLayout(
          <>
            <Component {...pageProps} />
            <ResponsiveDrawer badgeData={badgeData} />
          </>
        )
      ) : (
        <Login />
      )}
    </AuthContext.Provider>
  );
}
