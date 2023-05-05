import React from "react";
import FavoriteItem from "./FavoriteListItem";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const FavoriteList = (props) => {
  const { favorites, setReloadFavorites } = props;
  return (
    <>
      <Grid container spacing={2}>
        {favorites.map((favorite) => (
          <FavoriteItem
            favorite={favorite}
            setReloadFavorites={setReloadFavorites}
            key={favorite.id}
          />
        ))}
      </Grid>
    </>
  );
};

export default FavoriteList;
