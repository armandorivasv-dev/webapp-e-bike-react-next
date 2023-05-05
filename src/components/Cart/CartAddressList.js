import React, { useEffect, useState } from "react";
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
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";

const CartAddressList = (props) => {
  const { addresses, selectedAddress, setSelectedAddress } = props;

  const [value, setValue] = useState(addresses[0].id);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log("addresses", addresses);
  console.log("value", value);

  useEffect(() => {
    const filter = addresses.filter(
      (direccion) => direccion.id === Number(value)
    );
    setSelectedAddress(filter);
  }, [value]);

  return (
    <>
      <Typography
        variant="h6"
        align="left"
        color="text.secondary"
        paragraph
        sx={{ mt: 4 }}
      >
        Seleccione una dirección:
      </Typography>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {addresses.map((address) => (
            <Card
              key={address.id}
              sx={{ display: "flex", maxWidth: 900, mb: 2 }}
            >
              <CardActions>
                <Grid
                  container
                  direction="colunm"
                  justifyContent="center"
                  alignItems="center"
                  width="50px"
                >
                  <FormControlLabel
                    value={address.id}
                    control={<Radio />}
                    // label={address.attributes.title}
                  />
                </Grid>
              </CardActions>
              <CardContent>
                <Typography variant="h5" component="h1" gutterBottom>
                  {address.attributes.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="h1"
                >
                  {address.attributes.name_lastname}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="h1"
                >
                  {address.attributes.address}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="h1"
                >
                  {address.attributes.state}, {address.attributes.city},{" "}
                  {address.attributes.postal_code}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="h1"
                >
                  Teléfono: {address.attributes.phone}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default CartAddressList;
