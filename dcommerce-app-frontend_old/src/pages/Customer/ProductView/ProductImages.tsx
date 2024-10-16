/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { IAdminProduct } from "../../../types/AdminProduct";
import { filterImages } from "../../../util";

export default function ProductImages({ product }: { product: IAdminProduct }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="product-image-section">
      <div className="product-image">
        <img
          className="product-image-content"
          alt={product.name}
          src={filterImages(product.images, "800")[currentImage]}
        />
      </div>
      <div className="product-image-thumbnails">
        {filterImages(product.images, "200").map((image, index) => (
          <div
            className="product-image-thumbnail"
            onClick={() => setCurrentImage(index)}
          >
            <img alt={product.name} src={image} />
          </div>
        ))}
      </div>
    </div>
  );
}
