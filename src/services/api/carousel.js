import { API_URL } from "../../utils/constants";

export const getCarouselApi = async () => {
  try {
    const url = `${API_URL}/api/home-sliders?populate=*`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
