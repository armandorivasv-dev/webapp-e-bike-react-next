import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Loading from "../Loading/Loading";

const CartAddressList = (props) => {
  const { addresses, selectedAddress, setSelectedAddress } = props;

  const [value, setValue] = useState(() => {
    if (addresses.length === 0) {
      return "";
    } else {
      return addresses[0].id;
    }
  });

  const { push } = useRouter();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
        Seleccione una dirección
      </Typography>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {!addresses ? (
            <Loading text={"Cargando direcciones..."} />
          ) : addresses.length === 0 ? (
            <>
              <Typography
                variant="h7"
                align="center"
                color="text.secondary"
                paragraph
              >
                No tienes direcciones registradas, crea tu primera dirección...
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                fullWidth
                onClick={() => {
                  push("/account/addaddress");
                }}
              >
                <span>AGREGAR UNA DIRECCION</span>
              </Button>
            </>
          ) : (
            <>
              {addresses.map((address) => (
                <Card
                  key={address.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    bgcolor: "#e3f2fd",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="h1" gutterBottom>
                      {address.attributes.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      component="h1"
                    >
                      {address.attributes.name_lastname},{" "}
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
                  <CardActions>
                    <Grid container alignItems="center" width="50px">
                      <FormControlLabel
                        value={address.id}
                        control={<Radio />}
                      />
                    </Grid>
                  </CardActions>
                </Card>
              ))}
            </>
          )}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default CartAddressList;
