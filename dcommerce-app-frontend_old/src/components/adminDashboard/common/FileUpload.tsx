/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";
import { IProductImage } from "../../../types/AdminProduct";
import { filterImages } from "../../../util";

interface IFileUploadProps {
  productImages: IProductImage[];
  setProductImages: Dispatch<SetStateAction<IProductImage[]>>;
  existingImages: string[];
  setExistingImages: Dispatch<SetStateAction<string[]>>;
}

function FileUpload({
  productImages,
  setProductImages,
  existingImages,
  setExistingImages,
}: IFileUploadProps) {
  const handleDelete = (name: string) => {
    setProductImages(productImages.filter((item) => item.name !== name));
  };

  const getImageName = (url: string) => {
    const tempArray = url.split("/");
    return tempArray[tempArray.length - 1];
  };

  const handleDeleteExistingImages = (url: string) => {
    setExistingImages(
      existingImages.filter((item) => getImageName(item) !== getImageName(url))
    );
  };

  const onFileToBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event: any) {
      const newData = file;
      newData.base64 = event.target.result;
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg"],
    },
    onDrop: (acceptedFiles: any) => {
      setProductImages([
        ...productImages,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            base64: onFileToBase64(file),
          })
        ),
      ]);
    },
  });

  return (
    <div className="dropzone_content">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <p style={{ padding: "1em" }}>Drop the files here ...</p>
      </div>
      <div className="image_container">
        {productImages.map((file) => (
          <div key={file.name} className="image_content">
            <img key={file.name} src={file.preview} alt="" />

            <IconButton
              className="delete"
              onClick={() => handleDelete(file.name)}
            >
              <HighlightOffIcon sx={{ fontSize: "0.6em" }} />
            </IconButton>
          </div>
        ))}
        {filterImages(existingImages, "200").map((url) => (
          <div key={url} className="image_content">
            <img key={url} src={url} alt="" />

            <IconButton
              className="delete"
              onClick={() => handleDeleteExistingImages(url)}
            >
              <HighlightOffIcon sx={{ fontSize: "0.6em" }} />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FileUpload;
