import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { API_URL } from "../../utils/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { mountNormalize, calcPrice } from "@/utils/functions";
import { deleteFavoriteApi } from "@/services/api/favorite";
import useAuth from "@/hooks/useAuth";
import moment from "moment";

const OrderListItem = (props) => {
  const { order } = props;
  return (
    <>
      <Grid item md={4} sm={6}>
        <Card sx={{ maxWidth: 400 }}>
          <Image
            width="400"
            height="450"
            alt="Images"
            src={`${API_URL}${order.attributes.product.data.attributes.main_image.data.attributes.url}`}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {order.attributes.product.data.attributes.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {order.attributes.product.data.attributes.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              Nro. Pedido: {order.attributes.id_payment}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              Fecha:{" "}
              {moment(order.attributes.createdAt)
                .format("DD/MM/YYYY")
                .toString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              Cantidad: {order.attributes.product_quantity}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              Pagado: ${mountNormalize(order.attributes.product_payment)}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={`/product/${order.attributes.product.data.id}`}>
              <Button
                size="small"
                variant="outlined"
                color="inherit"
                // onClick={() => {
                //   goToProduct(product.id);
                // }}
              >
                Ver producto
              </Button>
            </Link>
            {/* <Button
              size="small"
              onClick={() => {
                deleteFavorite(favorite.attributes.product.data.id);
              }}
            >
              Eliminar de favoritos
            </Button> */}

            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default OrderListItem;
