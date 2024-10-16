import React, { useEffect } from "react";
import "./ProductView.css";
import { Typography, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import BasicTabs from "./BasicTabs";
import { AppDispatch, RootState } from "../../../store";
import { getProductById } from "../../../actions/admin-products.actions";
import { adminProductActions } from "../../../store/admin-products.slice";
import ProductImages from "./ProductImages";
import SideMenuLayout from "../../../components/customerlayout/SideMenu/SideMenuLayout";

export default function ProductView() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { isFetching, data: product } = useSelector(
    (state: RootState) => state.adminProduct.product
  );

  useEffect(() => {
    if (params.id) dispatch(getProductById(params.id));

    return () => {
      dispatch(adminProductActions.resetProductGet());
    };
  }, []);

  return (
    <SideMenuLayout>
      {isFetching ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <div className="product-container">
          <div className="product-view-container">
            <ProductImages product={product} />

            <div className="product-details">
              <div className="product-upper-section">
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                Availability : {product.quantity} left in stock
              </div>
              {/* <div>
              <Button className="button" size="small">
                View
              </Button>
              <Button className="button" size="small">
                WishList
              </Button>
            </div> */}
              <div className="middle-container">
                {/* <div className="social-media">Share this:</div> */}
                <div className="features-list">{product.briefDescription}</div>
                <div className="price">
                  <Typography
                    align="left"
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "400",
                      fontSize: "0.8rem",
                    }}
                  >
                    LKR
                  </Typography>
                  <Typography align="left" variant="h4" component="div">
                    {product.price}.00
                  </Typography>
                </div>
              </div>
              <div
                className="pickers"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div className="picker-title">Color : Red</div>
                <div className="picker-items">
                  <div className="picker-item">Red</div>
                  <div className="picker-item">Blue</div>
                  <div className="picker-item">Green</div>
                </div>
                <div className="picker-title">Warranty : 3 years</div>
                <div className="picker-items">
                  <div className="picker-item">1 year</div>
                  <div className="picker-item">2 years</div>
                  <div className="picker-item">3 years</div>
                </div>
              </div>
              <div className="buy-now-section">
                <TextField
                  className="buy-now-quantity"
                  type="number"
                  variant="outlined"
                  defaultValue={1}
                />
                <Button
                  className="buy-now-button"
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          <div className="product-description">
            <BasicTabs description={product.description ?? ""} />
          </div>
        </div>
      )}
    </SideMenuLayout>
  );
}
