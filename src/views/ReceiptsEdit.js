import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/CustomDrawer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Skeleton from "@material-ui/lab/Skeleton";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiptActions, roomActions, productActions } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  uploadRoot: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  gridList: {
    height: "60vh",
  },
}));

export default function ReceiptEdit(props) {
  const classes = useStyles();

  const rooms = useSelector((state) => state.rooms);
  const products = useSelector((state) => state.products);
  const receipts = useSelector((state) => state.receipts);
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);

  const [formData, setFormData] = useState({
    room: "",
  });

  const { room } = formData;

  const [newProducts, setNewProducts] = React.useState([]);

  useEffect(() => {
    //console.log(props.match.params.id);
    dispatch(roomActions.getAll());
    dispatch(productActions.getAllNonPagination());
    dispatch(receiptActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    setFormData({ ...receipts.item });

    //setOnImageChange({ ...formData.image });
    if (receipts.item !== undefined && receipts.item !== null) {
      if (receipts.item.products) setNewProducts([...receipts.item.products]);
      setLoading((loading) => !loading);
    }
  }, [receipts.item]);

  const handleRoomSelected = (value) => {
    if (value) {
      setFormData({ ...formData, room: value.id });
    }
  };

  const addNewProductsClick = () => {
    setNewProducts((newProducts) => [
      ...newProducts,
      { productId: "none", quantity: 1 },
    ]);
  };

  const handleProductsSelected = (value, index) => {
    if (value) {
      setNewProducts((state) => {
        let new_product = state;
        new_product[index].productId = value.id;

        return [...new_product];
      });
    }
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  // useEffect(() => {
  //   console.log(newProducts);
  // }, [newProducts]);

  const onDelete = (index) => {
    newProducts.splice(index, 1);
    setNewProducts([...newProducts]);
  };

  const onQuantityChange = (e, index) => {
    // e.persist();
    const { value } = e.target;
    //setFormData({ ...formData, [e.target.name]: e.target.value });
    setNewProducts((state) => {
      let new_product = state;
      new_product[index].quantity = value;

      return [...new_product];
    });
  };

  const onSubmit = () => {
    dispatch(
      receiptActions.update(props.match.params.id, {
        ...formData,
        products: newProducts,
      })
    );
  };

  //   const keyPressed = (e) => {
  //     if (e.key === "Enter") onSubmit(e);
  //   };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            {loading ? (
              <React.Fragment>
                <Grid
                  container
                  direction="row"
                  spacing={5}
                  style={{ marginTop: "45px" }}
                >
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                </Grid>

                <Grid
                  xs={12}
                  style={{ marginTop: "30px" }}
                  container
                  //spacing={5}
                >
                  <Grid item xs={12} container justify="center">
                    <Skeleton variant="rect" width={200} height={45} />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: "30px" }}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={5}
                  style={{ marginTop: "30px" }}
                  justify="center"
                >
                  <Grid item>
                    <Skeleton variant="rect" width={120} height={45} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rect" width={120} height={45} />
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography variant="h4" gutterBottom>
                  Receipt Edit
                </Typography>
                <Autocomplete
                  id="room-cb"
                  options={rooms.items}
                  value={
                    rooms.items !== undefined
                      ? rooms.items.find((element) => element.id === room)
                      : ""
                  }
                  getOptionLabel={(options) => options.roomId}
                  onChange={(e, value) => handleRoomSelected(value)}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Room" variant="outlined" />
                  )}
                />

                <Grid
                  style={{ marginTop: "10px" }}
                  container
                  justify="center"
                  spacing={5}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addNewProductsClick}
                    >
                      Edit Product(s)
                    </Button>
                  </Grid>
                </Grid>

                <Grid container>
                  {newProducts.length > 0 &&
                    newProducts.map((product) => (
                      <Grid
                        key={newProducts.indexOf(product)}
                        style={{ marginTop: "10px" }}
                        item
                        xs={12}
                        container
                        alignItems="center"
                        spacing={3}
                      >
                        <Grid item xs={6}>
                          <Autocomplete
                            options={products.items}
                            onChange={(e, value) =>
                              handleProductsSelected(
                                value,
                                newProducts.indexOf(product)
                              )
                            }
                            value={
                              product.productId !== "none"
                                ? products.items.find(
                                    (element) =>
                                      element.id === product.productId
                                  )
                                : null
                            }
                            getOptionLabel={(option) => option.productName}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Product"
                                variant="outlined"
                              />
                            )}
                          />
                        </Grid>
                        <TextField
                          style={{ marginTop: "10px" }}
                          label="Quantity"
                          id="outlined-quantity"
                          variant="outlined"
                          name="quantity"
                          type="number"
                          value={product.quantity}
                          onChange={(e, value) =>
                            onQuantityChange(e, newProducts.indexOf(product))
                          }
                          //   onKeyPress={(e) => keyPressed(e)}
                        />
                        {/* <Grid item xs={5}>
                      <Autocomplete
                        options={workingTimeOption}
                        onChange={(e, value) =>
                          handleWorkingTimeSelected(
                            value,
                            newSchedules.indexOf(schedule)
                          )
                        }
                        value={
                          workingTimeOption[
                            workingTimeToIndex(schedule.workingTime)
                          ]
                        }
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Working Time"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid> */}
                        <Grid item xs={1}>
                          <Button
                            style={{ color: "#b51a02" }}
                            variant="text"
                            onClick={(e) =>
                              onDelete(newProducts.indexOf(product))
                            }
                          >
                            DEL
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                </Grid>

                <Grid
                  style={{ marginTop: "10px" }}
                  container
                  justify="center"
                  spacing={5}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => onSubmit(e)}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={Link} to="/receipts" variant="contained">
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}