/* eslint-disable no-underscore-dangle */
import React from "react";
import "./ProductCard.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IAdminProduct } from "../../../../types/AdminProduct";

function Product({ product }: { product: IAdminProduct }) {
  const navigate = useNavigate();
  return (
    <Card
      className="product-card"
      onClick={() => navigate(`/product/${product?._id}`)}
    >
      <CardContent>
        <Typography className="product-card-category" color="text.secondary">
          {product?.productCategoryId?.name}
        </Typography>
        <Typography
          className="product-card-title"
          variant="h6"
          color="text.primary"
          component="div"
        >
          {product?.name}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="product image"
        height="240"
        image={
          product?.images.length > 0
            ? product?.images[0]
            : "https://dev-dcommerce-product-images.s3.ap-south-1.amazonaws.com/9bd8c470-e86b-4309-8a6d-d904c2fc2f91-product-placeholder.png"
        }
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <Typography
            align="left"
            variant="h6"
            component="div"
            sx={{
              fontWeight: "300",
              fontSize: "1rem",
            }}
          >
            LKR
          </Typography>
          <Typography align="left" variant="h6" component="div">
            {Number(product.price).toFixed(2)}
          </Typography>
          <Box
            width="100%"
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <IconButton
              className="add-to-card-button"
              aria-label="add to shopping cart"
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Product;
