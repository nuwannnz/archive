import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import "./FormModal.css";
import Form from "./Form/form";
import { styled } from "@mui/system";
import {createTheme, ThemeProvider, } from "@mui/material";

const theme = createTheme();

const FormModal = ({ isOpen, onClose, selectedDate , setFormData , formData }) => {

  const Paper = styled("div")({
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    onClose();
  };

  return (
    <Modal
      className="Eventform"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-modal"
      aria-describedby="form-modal-description"
    >
      <ThemeProvider theme={theme}>
        <Paper>
          <Form
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            onClose={onClose}
            selectedDate={selectedDate}
          />
        </Paper>
      </ThemeProvider>
    </Modal>
  );
};

export default FormModal;
