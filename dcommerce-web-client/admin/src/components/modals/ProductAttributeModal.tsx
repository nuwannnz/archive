import { Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import FormDialog from "../dialogs/formDialog/FormDialog";
import { useToast } from "../../hooks/useToast";
import {
  useMutateProductAttribute,
  useProductAttribute,
} from "../../hooks/productAttributeHooks";
import { productAttrbiuteValidation } from "../../validations/productAttribute";
import FormFieldBox from "../forms/theme-elements/FormFieldBox";

interface IProductAttributeModalProps {
  isOpen: boolean;
  isReadOnly: boolean;
  productAttributeId?: string;
  closeModal: (refresh?: boolean) => void;
}

const ProductAttributeModal: React.FC<IProductAttributeModalProps> = ({
  isOpen,
  isReadOnly,
  productAttributeId,
  closeModal,
}) => {
  const {
    isLoading: productAttributeLoading,
    productAttribute,
    isError,
  } = useProductAttribute(productAttributeId);

  const { successToast, errorToast } = useToast();

  const { mutateProductAttribute } = useMutateProductAttribute();

  const [closeModalOnSuccess, setCloseModalOnSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loading = useMemo(
    () => isLoading || productAttributeLoading,
    [isLoading, productAttributeLoading]
  );

  const formik = useFormik({
    initialValues: {
      attributeName: "",
      attributeOptions: "",
    },
    validationSchema: productAttrbiuteValidation,
    onSubmit: async (values) => {
      const { attributeName, attributeOptions } = values;

      try {
        setIsLoading(true);

        const options = productAttribute
          ? attributeOptions.split(",").map((option) => {
              const existingOption = productAttribute.options.find(
                (o) => o.name.toLowerCase() === option.toLowerCase()
              );

              if (existingOption) {
                return existingOption;
              }
              return { name: option.trim() };
            })
          : attributeOptions.split(",").map((option) => ({ name: option }));

        const deletedOptionIds =
          productAttribute?.options
            .filter(
              (option) =>
                !attributeOptions
                  .toLowerCase()
                  .includes(option.name.toLowerCase())
            )
            .map((option) => option.id) ?? [];

        await mutateProductAttribute(
          {
            id: productAttributeId,
            name: attributeName,
            options,
            deletedOptionIds,
          },
          productAttributeId ? "Update" : "Insert"
        );

        successToast(
          `${
            productAttributeId ? "Updated" : "Added new"
          } Product Attribute successfully`
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
    if (productAttribute) {
      formik.setValues({
        attributeName: productAttribute.name,
        attributeOptions: productAttribute.options.map((o) => o.name).join(","),
      });
    }
  }, [productAttribute]);

  useEffect(() => {
    if (isError) {
      errorToast("Failed to load the selected Product Attribute.");
    }
  }, [isError]);

  const handleOnSaveClick = (closeModalOnSuccess = false) => {
    setCloseModalOnSuccess(closeModalOnSuccess);
    console.log("-sdsd ");
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
      hidePrimaryAddMoreButton={!!productAttributeId || isReadOnly}
      title={
        productAttributeId
          ? "Update Product Attribute"
          : "Add new Product Attribute"
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <FormFieldBox>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            component="label"
            htmlFor="attributeName"
          >
            Attribute Name
          </Typography>
          <CustomTextField
            name="attributeName"
            variant="outlined"
            fullWidth
            sx={{ marginTop: "5px" }}
            value={formik.values.attributeName}
            type="text"
            disabled={loading || isReadOnly}
            onChange={isReadOnly ? undefined : formik.handleChange}
          />
        </FormFieldBox>
        <FormFieldBox>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            component="label"
            htmlFor="attributeOptions"
          >
            Attribute Options
          </Typography>
          <CustomTextField
            name="attributeOptions"
            variant="outlined"
            fullWidth
            sx={{ marginTop: "5px" }}
            value={formik.values.attributeOptions}
            type="text"
            helperText="Enter options separated by commas. Ex: small,large"
            disabled={loading || isReadOnly}
            onChange={isReadOnly ? undefined : formik.handleChange}
          />
        </FormFieldBox>
      </form>
    </FormDialog>
  );
};

export default ProductAttributeModal;
