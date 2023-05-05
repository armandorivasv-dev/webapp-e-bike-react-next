import { useState, useEffect } from "react";
import styles from "@/styles/Account.module.css";
import { DashboardLayout } from "../dashboard-layout";
import FavoriteList from "@/components/Favorite/FavoriteList";
import { getFavoriteApi } from "@/services/api/favorite";
import useAuth from "@/hooks/useAuth";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const Favorites = () => {
  const [favorites, setFavorites] = useState(null);
  const { auth } = useAuth();
  const [reloadFavorites, setReloadFavorites] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth);
      setFavorites(response.data);
    })();
    setReloadFavorites(false);
  }, [reloadFavorites]);
  return (
    <main className={styles.main}>
      <Typography variant="h5" align="left" color="text.secondary" paragraph>
        Listado de favoritos
      </Typography>
      {!favorites ? (
        <h1>Cargando</h1>
      ) : favorites.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          No hay productos en favoritos
        </Typography>
      ) : (
        <FavoriteList
          favorites={favorites}
          setReloadFavorites={setReloadFavorites}
        />
      )}
    </main>
  );
};

export default Favorites;

Favorites.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
