import { calcPrice } from "@/utils/functions";
import { API_URL } from "../../utils/constants";

export const getOrdersApi = async (auth) => {
  try {
    const url = `${API_URL}/api/orders?filters[user]=${auth.idUser}&populate[product][populate]=main_image`;
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

export const addOrderApi = async (auth, tokenStripe, products, address) => {
  try {
    const addressShipping = address;
    console.log("addressShipping", addressShipping);
    delete addressShipping[0].attributes.createdAt;
    delete addressShipping[0].attributes.updatedAt;
    delete addressShipping[0].attributes.publishedAt;

    let totalPayment = 0;
    products.forEach((product) => {
      totalPayment +=
        calcPrice(
          product.data.attributes.price,
          product.data.attributes.discount
        ) * product.quantity;
    });

    const orderRenpose = [];

    for await (const product of products) {
      const orderData = {
        product: product.data.id,
        user: auth.idUser,
        total_payment: totalPayment,
        product_payment:
          calcPrice(
            product.data.attributes.price,
            product.data.attributes.discount
          ) * product.quantity,
        product_quantity: product.quantity,
        id_payment: tokenStripe,
        address_shiping: addressShipping,
      };

      const url = `${API_URL}/api/orders`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },

        body: JSON.stringify({ data: orderData }),
      };
      await fetch(url, params);
      orderRenpose.push(orderData);
    }
    return orderRenpose;
  } catch (error) {
    console.log(error);
    return null;
  }
};
