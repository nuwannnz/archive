/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { Typography, CardContent, Grid, TextField } from "@material-ui/core";
import { Card, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { AppDispatch, RootState } from "../../../store";
import {
  addProductCategory,
  getProductCategoryById,
  updateProductCategory,
} from "../../../actions/admin-product-category.action";
import PageLayout from "../../../components/adminDashboard/common/PageLayout";
import { productCategoryValidation } from "../../../validation/validate";
import { adminProductCategoryAction } from "../../../store/admin-product-category.slice";
import { ROUTES, modes } from "../../../constants/common";
import getStartIcon from "../../../components/adminDashboard/helper";

function ProductCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const params = useParams();

  const { isFetching: productCategoryAdding, data: addProductCategoryData } =
    useSelector(
      (state: RootState) => state.adminProductCategory.addAdminProductCategory
    );

  const { data: productCategory } = useSelector(
    (state: RootState) => state.adminProductCategory.productCategory
  );

  useEffect(() => {
    if (addProductCategoryData) navigate(ROUTES.PRODUCT_CATEGORIES);

    return () => {
      dispatch(adminProductCategoryAction.resetAdminProductCategoryAdd());
    };
  }, [addProductCategoryData]);

  const formik = useFormik({
    initialValues: {
      productName: "",
    },
    validationSchema: productCategoryValidation,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (params.mode === modes.Add)
        dispatch(
          addProductCategory({
            name: values.productName,
            domainId: process.env.REACT_APP_DOMAIN,
          })
        );
      else if (params.mode === modes.Edit)
        dispatch(
          updateProductCategory({
            name: values.productName,
            domainId: process.env.REACT_APP_DOMAIN,
            id: params.id ?? "",
          })
        );
    },
  });

  useEffect(() => {
    if (productCategory) {
      formik.setValues({
        productName: productCategory.name ?? "",
      });
    }
  }, [productCategory]);

  useEffect(() => {
    if (params.mode !== modes.Add && params.id)
      dispatch(getProductCategoryById(params.id));
    else formik.resetForm();
  }, [params]);

  return (
    <PageLayout title="Product Category">
      <Card
        className="card-container"
        sx={{
          width: { xs: 300, sm: 400, md: 450, lg: 400 },
        }}
      >
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="card-labels"
            >
              <Grid xs={12} sm={12} item>
                <Typography gutterBottom variant="h6" align="left">
                  Product Category
                </Typography>
              </Grid>
              <Grid xs={12} sm={12}>
                <TextField
                  id="productName"
                  name="productName"
                  error={
                    formik.touched.productName &&
                    Boolean(formik.errors.productName)
                  }
                  helperText={
                    formik.touched.productName && formik.errors.productName
                  }
                  onChange={formik.handleChange}
                  value={formik.values.productName}
                  placeholder="Product Category Name"
                  variant="outlined"
                  disabled={params.mode === "view"}
                  fullWidth
                  required
                />
              </Grid>
              <Grid>
                {params.mode !== "view" && (
                  <Button
                    className="main-button"
                    type="submit"
                    sx={{ marginTop: "10em", width: { xs: 200, sm: 200 } }}
                    variant="contained"
                    color="primary"
                    disabled={productCategoryAdding}
                    startIcon={getStartIcon(productCategoryAdding, params.mode)}
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

export default ProductCategory;
