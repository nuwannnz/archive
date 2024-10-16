import React, { useState } from "react";
import { Button, TextField, Grid, Box } from "@mui/material";
import "../FormModal.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form({ onClose, selectedDate }) {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: selectedDate,
    eventTime: "",
    EventLocation: "",
    eventDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setFormData({
      ...formData,
      date: dateValue,
    });
  };

  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    setFormData({
      ...formData,
      eventTime: timeValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3004/addEvent/create", formData)
      .then((result) => {
        // Show a success toast
        toast.success("Event created successfully!");
        console.log(result);
        onClose();
      })
      .catch((err) => {
        // Show an error toast
        toast.error("An error occurred while creating the event.");
        console.log(err);
      });
  };

  return (
          <form
            className="formModal"
            onSubmit={handleSubmit}
            encType="multiple/form-data"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Name"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  name="eventDate"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Time"
                  name="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={handleTimeChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="EventLocation"
                  value={formData.EventLocation}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="contained"
                    color="secondary"
                  >
                    Close
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
  );
}

export default Form;
