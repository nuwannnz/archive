import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, LinearProgress } from "@material-ui/core";
import { Alert, Modal, Stack, TextField, Typography } from "@mui/material";

import "./ProductAttributeModal.scss";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { productAttributeValidation } from "../../../validation/validate";
import { AppDispatch, RootState } from "../../../store";
import {
  addProductAttributeAsync,
  getProductAttributeById,
  updateProductAttribute,
} from "../../../actions/admin-product-attribute.actions";
import { productAttributeActions } from "../../../store/admin-product-attribute.slice";

interface Props {
  // eslint-disable-next-line react/require-default-props
  productAttributeId?: string;
  handleClose: (refresh: boolean) => void;
}
function ProductAttributeModal({ productAttributeId, handleClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    isFetching: addAttributeLoading,
    data: addedAttribute,
    error: addAttributeError,
  } = useSelector(
    (state: RootState) => state.productAttribute.addProductAttribute
  );

  const {
    isFetching: updateAttributeLoading,
    data: updatedAttribute,
    error: updateAttributeError,
  } = useSelector(
    (state: RootState) => state.productAttribute.updateProductAttribute
  );

  const {
    isFetching: attributeByIdLoading,
    data: attributeById,
    error: attributeByIdError,
  } = useSelector(
    (state: RootState) => state.productAttribute.productAttributeById
  );

  const [closeModalOnSuccess, setCloseModalOnSuccess] = useState(true);

  const isLoading = useMemo(
    () => addAttributeLoading || attributeByIdLoading || updateAttributeLoading,
    [addAttributeLoading, attributeByIdLoading, updateAttributeLoading]
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      options: "",
    },
    validationSchema: productAttributeValidation,
    onSubmit: (values) => {
      const { name, options } = values;

      const optionsArray = options
        .split(",")
        .map((option) => ({ name: option.trim() }));
      if (attributeById && productAttributeId) {
        // update
        dispatch(
          updateProductAttribute({
            id: productAttributeId,
            payload: {
              name,
              deletedOptionIds: attributeById.options
                .filter(
                  (option) => !optionsArray.find((o) => o.name === option.name)
                )
                .map((option) => option.id),
              options: optionsArray.map((option) => ({
                id: attributeById.options.find(
                  (o) => o.name.toLowerCase() === option.name.toLowerCase()
                )?.id,
                name: option.name,
              })),
            },
          })
        );
      } else {
        // create
        dispatch(
          addProductAttributeAsync({
            name,
            options: optionsArray,
          })
        );
      }
    },
  });

  useEffect(
    () => () => {
      dispatch(productAttributeActions.resetAddProductAttribute());
      dispatch(productAttributeActions.resetUpdateProductAttribute());
    },
    []
  );

  useEffect(() => {
    if (productAttributeId) {
      dispatch(getProductAttributeById(productAttributeId));
    }
    return () => {
      dispatch(productAttributeActions.resetGetProductAttributeById());
    };
  }, [productAttributeId]);

  useEffect(() => {
    if (attributeById) {
      formik.setValues({
        name: attributeById.name,
        options: attributeById.options.map((option) => option.name).join(", "),
      });
    }
  }, [attributeById]);

  useEffect(() => {
    if (addedAttribute) {
      dispatch(productAttributeActions.resetAddProductAttribute());

      if (closeModalOnSuccess) {
        handleClose(true);
        return;
      }

      formik.resetForm();
    }
  }, [addedAttribute]);

  useEffect(() => {
    if (updatedAttribute) {
      dispatch(productAttributeActions.resetUpdateProductAttribute());
      handleClose(true);
    }
  }, [updatedAttribute]);

  return (
    <Modal
      open
      aria-labelledby="Product attribute modal"
      aria-describedby="Product attribute modal to add/edit product attributes"
    >
      <Box className="product-attribute-modal">
        <Box className="product-attribute-modal-content">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${productAttributeId ? "Update" : "Add"} Product Attribute`}
          </Typography>

          <form
            className="product-attribute-form"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="name"
              name="name"
              className="form-field"
              label="Attribute name"
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              variant="outlined"
              fullWidth
              size="small"
              disabled={isLoading}
              required
            />

            <TextField
              id="options"
              name="options"
              className="form-field"
              label="Options"
              value={formik.values.options}
              error={formik.touched.options && Boolean(formik.errors.options)}
              helperText={
                (formik.touched.options && formik.errors.options) ||
                "Enter options values separated by commas. Ex: Large, Small"
              }
              onChange={formik.handleChange}
              variant="outlined"
              fullWidth
              size="small"
              disabled={isLoading}
              required
            />

            {addAttributeError ||
              (updateAttributeError && (
                <Alert severity="error">
                  {addAttributeError ?? updateAttributeError ?? ""}
                </Alert>
              ))}

            <Stack direction="row" justifyContent="end">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                {productAttributeId ? "Update" : "Save"}
              </Button>

              {!productAttributeId && (
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCloseModalOnSuccess(false);
                    formik.submitForm();
                  }}
                  disabled={isLoading}
                >
                  Save and add more
                </Button>
              )}

              <Button
                variant="contained"
                color="secondary"
                type="button"
                disabled={isLoading}
                onClick={() => handleClose(false)}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
        {isLoading && <LinearProgress />}
      </Box>
    </Modal>
  );
}

export default ProductAttributeModal;
