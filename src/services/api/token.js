import { TOKEN } from "../../utils/constants";

export const setTokenApi = async (token) => {
  try {
    await localStorage.setItem(TOKEN, token);
  } catch (error) {
    return null;
  }
};

export const getTokenApi = async () => {
  try {
    const token = await localStorage.getItem(TOKEN);
    return token;
  } catch (error) {
    return null;
  }
};

export const removeTokenApi = async () => {
  try {
    await localStorage.removeItem(TOKEN);
  } catch (error) {
    return null;
  }
};
