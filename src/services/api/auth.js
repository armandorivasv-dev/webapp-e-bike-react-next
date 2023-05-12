import { API_URL } from "../../utils/constants";

export const loginApi = async (formData) => {
  try {
    const url = `${API_URL}/api/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("strapi error -> ", error);
    return null;
  }
};

export const registerApi = async (formData) => {
  try {
    const url = `${API_URL}/api/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserApi = async (token) => {
  try {
    const url = `${API_URL}/api/users/me`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const updateUSerApi = async (auth, formData) => {
  try {
    const url = `${API_URL}/api/users/${auth.idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// try {
//   const payload = {
//     password: "Hijo3011?",
//     identifier: "dlay@lay.cl",
//   };

//   const url = "http://localhost:1337/api/auth/local";
//   const params = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   };

//   const response = await fetch(url, params);
//   const result = await response.json();
//   console.log("strapi result -> ", JSON.stringify(result, null, 4));
//   return result;
// } catch (error) {
//   console.log("strapi error -> ", error);
//   return null;
// }
