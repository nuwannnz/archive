/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { Typography, CardContent, FormControl } from "@material-ui/core";
import { Card, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import PageLayout from "../../../components/adminDashboard/common/PageLayout";
import FileUpload from "../../../components/adminDashboard/common/FileUpload";
import { productValidation } from "../../../validation/validate";
import {
  addProduct,
  getProductById,
  updateProduct,
} from "../../../actions/admin-products.actions";
import { AppDispatch, RootState } from "../../../store";
import { adminProductActions } from "../../../store/admin-products.slice";
import { fetchProductCategoryList } from "../../../actions/admin-product-category.action";
import TextFieldExternalLabel from "../../../components/adminDashboard/common/TextFieldExternalLabel";
import { IProductImage } from "../../../types/AdminProduct";
import { ROUTES, modes } from "../../../constants/common";
import getStartIcon from "../../../components/adminDashboard/helper";

function Product() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [productImages, setProductImages] = useState<IProductImage[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const { isFetching: productAdding, data: addProductData } = useSelector(
    (state: RootState) => state.adminProduct.addAdminProduct
  );

  const { data: productCategoryList } = useSelector(
    (state: RootState) => state.adminProductCategory.adminProductCategoryList
  );

  const { data: product } = useSelector(
    (state: RootState) => state.adminProduct.product
  );

  useEffect(() => {
    dispatch(fetchProductCategoryList({ limit: 100 }));

    return () => {
      dispatch(adminProductActions.resetAdminProductFetch());
    };
  }, []);

  useEffect(() => {
    if (addProductData) navigate(ROUTES.PRODUCTS);

    return () => {
      dispatch(adminProductActions.resetAdminProductAdd());
    };
  }, [addProductData]);

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: 0,
      productCategoryId: "",
      cost: 0,
      price: 0,
      briefDescription: "",
      description: "",
    },
    validationSchema: productValidation,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (params.mode === modes.Add)
        dispatch(
          addProduct({
            ...values,
            images: productImages.map((image) => image.base64),
          })
        );
      else if (params.mode === modes.Edit)
        dispatch(
          updateProduct({
            ...values,
            images: productImages.map((image) => image.base64),
            existingImages,
            id: params.id ?? "",
          })
        );
    },
  });

  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name ?? "",
        quantity: product.quantity ?? 0,
        productCategoryId: product.productCategoryId._id ?? "",
        cost: product.cost ?? 0,
        price: product.price ?? 0,
        briefDescription: product.briefDescription ?? "",
        description: product.description ?? "",
      });
      setExistingImages(product?.images ?? []);
    }
  }, [product]);

  useEffect(() => {
    if (params.mode !== modes.Add && params.id)
      dispatch(getProductById(params.id));
    else {
      formik.resetForm();
      setExistingImages([]);
    }
  }, [params]);

  return (
    <PageLayout title="Product">
      <Card
        className="card-container"
        sx={{
          width: { xs: "100%", sm: 500, md: 600, lg: 700 },
          height: "100%",
        }}
      >
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              rowSpacing={{ xs: 2, sm: 4, md: 5, lg: 5 }}
              columnSpacing={{ xs: 1, sm: 3, md: 3 }}
              container
              className="card-labels"
              justifyContent="center"
              alignItems="center"
            >
              <TextFieldExternalLabel
                formik={formik}
                params={params}
                name="name"
                label="Product Name"
              />
              <Grid xs={12} sm={6}>
                <Typography>Product Category</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth>
                  <Select
                    id="productCategoryId"
                    name="productCategoryId"
                    placeholder="select one"
                    disabled={params.mode === "view"}
                    error={
                      formik.touched.productCategoryId &&
                      Boolean(formik.errors.productCategoryId)
                    }
                    value={formik.values.productCategoryId}
                    onChange={formik.handleChange}
                    fullWidth
                  >
                    <MenuItem value="">Select Category</MenuItem>
                    {productCategoryList?.data.length > 0 &&
                      productCategoryList?.data.map((ele) => (
                        <MenuItem key={ele._id} value={ele._id}>
                          {ele.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched.productCategoryId &&
                      formik.errors.productCategoryId}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <TextFieldExternalLabel
                formik={formik}
                params={params}
                name="quantity"
                label="Quantity"
                type="number"
              />
              <TextFieldExternalLabel
                formik={formik}
                params={params}
                name="cost"
                label="Cost"
                type="number"
              />
              <TextFieldExternalLabel
                formik={formik}
                params={params}
                name="price"
                label="Price"
                type="number"
              />
              <TextFieldExternalLabel
                formik={formik}
                params={params}
                name="briefDescription"
                label="Brief Description"
                type="textArea"
              />
              <TextFieldExternalLabel
                formik={formik}
                params={params}
                name="description"
                label="Description"
                type="textArea"
              />
              <Grid xs={12} sm={6}>
                <Typography>Images</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Button fullWidth disabled={params.mode === "view"}>
                  <FileUpload
                    {...{
                      productImages,
                      setProductImages,
                      existingImages,
                      setExistingImages,
                    }}
                  />
                </Button>
              </Grid>
              <Grid sm={6} />
              <Grid sm={3}>
                {params.mode !== "view" && (
                  <Button
                    className="main-button"
                    sx={{
                      marginTop: { xs: "1em", sm: "0.5em" },
                      width: { xs: 100, sm: 150 },
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={getStartIcon(productAdding, params.mode)}
                    type="submit"
                    disabled={productAdding}
                  >
                    {params.mode === "add" ? "Save" : "Update"}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default Product;
