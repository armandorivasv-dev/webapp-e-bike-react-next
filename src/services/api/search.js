import { json } from "react-router-dom";
import { API_URL, SEARCH_HISTORY } from "../../utils/constants";
import { sortArrayByDate } from "@/utils/functions";

export const searchProductApi = async (search) => {
  try {
    const url = `${API_URL}/api/products?filters[$or][0][title][$contains]=${search}&filters[$or][1][description][$contains]=${search}&filters[$or][2][tags][$contains]=${search}&filters[$or][3][category][$contains]=${search}&populate=*`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSearchApi = async () => {
  try {
    const response = await localStorage.getItem(SEARCH_HISTORY);
    if (!response) return [];
    return sortArrayByDate(JSON.parse(response));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateSearchApi = async (search) => {
  try {
    const response = await getSearchApi();
    if (response.length > 3) response.pop();
    response.push({ search, date: new Date() });
    await localStorage.setItem(SEARCH_HISTORY, JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
};
