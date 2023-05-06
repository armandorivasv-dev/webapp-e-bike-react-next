import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addProductCartApi } from "@/services/api/cart";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

const ProductBuy = (props) => {
  const { product, quantity } = props;

  const { push } = useRouter();

  const addProductCart = async () => {
    const response = await addProductCartApi(product.id, quantity);
  };

  //dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    addProductCart();
    setOpen(false);
  };
  const handleOk = () => {
    addProductCart();
    push("/cart");
  };
  //dialog

  return (
    <Box>
      <Button
        variant="outlined"
        color="inherit"
        fullWidth
        //onClick={formik.handleSubmit}
        onClick={() => {
          handleClickOpen();
        }}
      >
        AGREGAR AL CARRITO
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"El producto será agregado al carrito"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Continuar comprando</Button>
          <Button onClick={handleOk} autoFocus>
            Ir al carrito
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductBuy;
