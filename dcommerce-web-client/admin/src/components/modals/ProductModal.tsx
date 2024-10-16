import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import { productCategoryValidation } from "../../validations/productCategory";
import {
  useMutateProductCategory,
  useProductCategory,
} from "../../hooks/productCategoryHooks";
import FormDialog from "../dialogs/formDialog/FormDialog";
import { useToast } from "../../hooks/useToast";

interface IProductCategoryModalProps {
  isOpen: boolean;
  isReadOnly: boolean;
  productCategoryId?: string;
  closeModal: (refresh?: boolean) => void;
}

const ProductCategoryModal: React.FC<IProductCategoryModalProps> = ({
  isOpen,
  isReadOnly,
  productCategoryId,
  closeModal,
}) => {
  const {
    isLoading: productCategoryLoading,
    productCategory,
    isError,
  } = useProductCategory(productCategoryId);

  const { successToast, errorToast } = useToast();

  const { mutateProductCategory } = useMutateProductCategory();

  const [closeModalOnSuccess, setCloseModalOnSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loading = useMemo(
    () => isLoading || productCategoryLoading,
    [isLoading, productCategoryLoading]
  );

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: productCategoryValidation,
    onSubmit: async (values) => {
      const { categoryName } = values;

      try {
        setIsLoading(true);
        await mutateProductCategory(
          {
            id: productCategoryId,
            name: categoryName,
          },
          productCategoryId ? "Update" : "Insert"
        );

        successToast(
          `${
            productCategoryId ? "Updated" : "Added new"
          } Product Category successfully`
        );

        formik.resetForm();

        if (closeModalOnSuccess) {
          closeModal(true);
        }
      } catch (error: any) {
        console.log(error);

        errorToast(error.message ?? "Failed to save Product Category");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (productCategory) {
      formik.setValues({
        categoryName: productCategory.name,
      });
    }
  }, [productCategory]);

  useEffect(() => {
    if (isError) {
      errorToast("Failed to load the selected Product Category.");
    }
  }, [isError]);

  const handleOnSaveClick = (closeModalOnSuccess = false) => {
    setCloseModalOnSuccess(closeModalOnSuccess);
    formik.submitForm();
  };

  const handleOnCancelClick = () => {
    formik.resetForm();
    closeModal();
  };

  return (
    <FormDialog
      isOpen={isOpen}
      closeModal={closeModal}
      loading={loading}
      primaryActionHandler={handleOnSaveClick}
      secondaryActionHandler={handleOnCancelClick}
      hidePrimaryButton={isReadOnly}
      hidePrimaryAddMoreButton={!!productCategoryId || isReadOnly}
      title={
        productCategoryId
          ? "Update product category"
          : "Add new product category"
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            component="label"
            htmlFor="categoryName"
          >
            Category Name
          </Typography>
          <CustomTextField
            name="categoryName"
            variant="outlined"
            fullWidth
            sx={{ marginTop: "5px" }}
            value={formik.values.categoryName}
            type="text"
            disabled={loading || isReadOnly}
            onChange={isReadOnly ? undefined : formik.handleChange}
          />
        </Box>
      </form>
    </FormDialog>
  );
};

export default ProductCategoryModal;
