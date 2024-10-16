import * as yup from "yup";

export const productCategoryValidation = yup.object({
  categoryName: yup.string().required("Category name is required"),
});
