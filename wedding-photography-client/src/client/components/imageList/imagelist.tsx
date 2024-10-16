import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "./imagelist.css";
import SingleTab from '../TabView/single-tab';

interface StandardImageListProps {
  data: {
    index?: number;
    img: string;
    title?: string;
    hideTitle?: boolean;
    subtitle?: string;
  }[];
  handleImageClick: ((index: number | any) => void) | null;
}

export default function StandardImageList({ handleImageClick, data }: StandardImageListProps) {

  const handleClick = (index: number | any) => {
    if (handleImageClick) {
      handleImageClick(index); // Call the provided handleImageClick prop if it's not null
    }
    // setSelectedImage(index);
    // setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <ImageList
        sx={{ width: "100%", "& .MuiImageListItem-root": { height: "auto" } }}
        cols={3}
      >
        {data.map((item, index) => (
          <ImageListItem key={index} onClick={() => handleClick(item.index ? item.index : item.img)}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            {item.hideTitle ? null : (
              <ImageListItemBar
                title={item.title}
                subtitle={item.subtitle}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.37)" }}
                    aria-label={`info about ${item.title}`}
                  ></IconButton>
                }
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
      {/* Dialog component can be added here based on your requirements */}
    </>
  );
}
