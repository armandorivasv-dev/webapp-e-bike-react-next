import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "@/services/api/favorite";
import useAuth from "@/hooks/useAuth";

import Box from "@mui/material/Box";

const ProductFavorite = (props) => {
  const { product } = props;
  const [isFavorite, setIsFavorite] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth, product);

      if (response.data.length > 0) setIsFavorite(true);
    })();
  }, [product]);

  const addToFavorite = async () => {
    await addFavoriteApi(auth, product);
    setIsFavorite(true);
  };

  const deleteToFavorite = async () => {
    await deleteFavoriteApi(auth, product);
    setIsFavorite(null);
  };

  return (
    <Box>
      {isFavorite ? (
        <IconButton
          aria-label="Borrar favorito"
          onClick={() => {
            deleteToFavorite();
          }}
        >
          <FavoriteIcon fontSize="large" color="primary"></FavoriteIcon>
        </IconButton>
      ) : (
        <IconButton
          aria-label="Agregar favorito"
          onClick={() => {
            addToFavorite();
          }}
        >
          <FavoriteIcon fontSize="large" color="disabled"></FavoriteIcon>{" "}
        </IconButton>
      )}
    </Box>
  );
};

export default ProductFavorite;
