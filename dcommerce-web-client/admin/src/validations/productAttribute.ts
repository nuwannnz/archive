import * as yup from "yup";

export const productAttrbiuteValidation = yup.object({
  attributeName: yup.string().required("Attribute name is required"),
  attributeOptions: yup.string().required("Options are required"),
});
