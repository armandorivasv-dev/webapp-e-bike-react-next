import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deleteAddressApi } from "@/services/api/address";
import useAuth from "@/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

const AddressList = (props) => {
  const { addresses } = props;

  const [idAdd, setIdAdd] = useState(null);

  const { auth } = useAuth();

  const router = useRouter();

  const notifyOk = () => toast("Registro eliminado.");

  const notifyError = () => toast("Error al eliminar los datos.");

  const deleteAddress = async (idAddress) => {
    try {
      await deleteAddressApi(auth, idAddress);
      await notifyOk();
      router.reload();
    } catch (error) {
      await notifyError();
      console.log(error);
    }
  };

  //dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    deleteAddress(idAdd);
  };
  //dialog

  return (
    <>
      {addresses.map((address) => (
        <Card key={address.id} sx={{ mb: 1, bgcolor: "#e3f2fd" }}>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>
              {address.attributes.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" component="h1">
              {address.attributes.name_lastname}, {address.attributes.address}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              component="h1"
            ></Typography>

            <Typography variant="body1" color="text.secondary" component="h1">
              {address.attributes.state}, {address.attributes.city},{" "}
              {address.attributes.postal_code}
            </Typography>
            <Typography variant="body1" color="text.secondary" component="h1">
              Teléfono: {address.attributes.phone}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={() => {
                handleClickOpen(address.id), setIdAdd(address.id);
              }}
            >
              Eliminar
            </Button>
          </CardActions>
        </Card>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro que desea eliminar?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddressList;
