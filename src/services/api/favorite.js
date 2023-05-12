import { API_URL } from "../../utils/constants";

export const isFavoriteApi = async (auth, idProduct) => {
  try {
    const url = `${API_URL}/api/favorites/?filters[user]=${auth.idUser}&filters[product]=${idProduct}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addFavoriteApi = async (auth, idProduct) => {
  try {
    const url = `${API_URL}/api/favorites`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        data: { product: idProduct, user: auth.idUser },
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteFavoriteApi = async (auth, idProduct) => {
  const dataFound = await isFavoriteApi(auth, idProduct);
  if (dataFound.data.length > 0) {
    try {
      const url = `${API_URL}/api/favorites/${dataFound.data[0].id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

export const getFavoriteApi = async (auth) => {
  try {
    const url = `${API_URL}/api/favorites/?filters[user]=${auth.idUser}&populate[product][populate]=main_image`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
