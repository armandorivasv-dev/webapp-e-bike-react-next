import { useState, useEffect } from "react";
import styles from "@/styles/Account.module.css";
import { DashboardLayout } from "../dashboard-layout";
import FavoriteList from "@/components/Favorite/FavoriteList";
import { getFavoriteApi } from "@/services/api/favorite";
import useAuth from "@/hooks/useAuth";
import { Typography } from "@mui/material";
import Loading from "@/components/Loading/Loading";

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
        Favoritos
      </Typography>
      {!favorites ? (
        <Loading text={"Cargando productos..."} />
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
