import React, { useState } from "react";
import "./contact.css";
import Axios from "axios";
import {
  MenuItem,
  Select,
  TextField,
  Button,
  TextareaAutosize,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
// import ContactBg from '../assets/img/wed15.jpg';

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    time: "",
    message: "",
  });

  const [inputType, setInputType] = useState("text");
  const [inputTypeTime, setInputTypeTime] = useState("text");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFocus = () => {
    setInputType("date");
  };

  const handleFocusTime = () => {
    setInputTypeTime("time");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const endpoint =
      "https://tfsmq24ojl.execute-api.ap-south-1.amazonaws.com/dev/api/domains/public/contact-us/" +
      process.env.REACT_APP_DOMAIN_ID;

    const messageBody = `
    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone}
    Wedding Date: ${formData.weddingDate}
    Time: ${formData.time}
    Message: ${formData.message}
  `;

    const formattedData = {
      messageBody,
    };

    try {
      const response = await Axios.post(endpoint, formattedData);

      if (response.status === 200 || response.status === 201) {
        console.log("Success:", response.data);
        // Clear the form fields
        setFormData({
          name: "",
          email: "",
          phone: "",
          weddingDate: "",
          time: "",
          message: "",
        });
        // Show success message
        setShowSuccessMessage(true);

        // Optionally, hide the message after a few seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    } finally {
      setIsSubmitting(false); // Re-enable the button after response or error
    }
  };

  return (
    <section id="contactPage">
      {/* <div className="contact-bg">
          <img className="contactbg-img" src={ContactBg} alt="" />
        </div>
        <br /> <br /> */}
      <br /> <br />
      <div id="contact" className="content">
        <h3 className="contactTitle">Book Your Session</h3>
        <span className="contactDesc">
          Capture Your Story , Let's Create Something Beautiful , Lock your date
          with the best!
        </span>
        <br />
        <span className="contact-para">
          Please fill in the contact form below and we will respond to you soon!
        </span>
        <form
          className="contactForm"
          onSubmit={handleSubmit}
          encType="multiple/form-data"
        >
          <Grid
            container
            spacing={1}
            className="formGrid"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={6} md={9}>
              <TextField
                fullWidth
                onChange={handleChange}
                name="name"
                type="text"
                // className="contactInput"
                label="Your Name"
                value={formData.name}
                required
              />
            </Grid>

            <Grid item xs={6} md={9}>
              <TextField
                fullWidth
                onChange={handleChange}
                name="email"
                type="email"
                // className="contactInput"
                label="Email"
                value={formData.email}
                required
              />
            </Grid>

            <Grid item xs={6} md={9}>
              <TextField
                fullWidth
                onChange={handleChange}
                name="phone"
                type="phone"
                // className="contactInput"
                label="Phone"
                value={formData.phone}
                required
              />
            </Grid>

            <Grid item xs={6} md={9}>
              <TextField
                fullWidth
                label="Wedding Date"
                name="weddingDate"
                type={inputType}
                value={formData.weddingDate}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={() => setInputType("text")}
                required
              />
            </Grid>

            <Grid item xs={6} md={9}>
              <FormControl fullWidth>
                <InputLabel
                  id="session-label"
                  style={{ background: "white", zIndex: 1 }}
                >
                  Session
                </InputLabel>
                <Select
                  labelId="session-label"
                  id="session-select"
                  onChange={handleChange}
                  name="time"
                  value={formData.time}
                  style={{ width: "100%" }}
                  required
                >
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={9}>
              <TextareaAutosize
                // fullWidth
                minRows={3}
                maxRows={10}
                onChange={handleChange}
                name="message"
                placeholder="Message"
                value={formData.message}
                required
                style={{
                  resize: "none",
                  padding: "10px",
                  border: "1px solid #ccc",
                  width: "96%",
                }} // You can style the TextareaAutosize as needed
                className="custom-text"
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#577454",
                  color: "#fff",
                  margin: "20px",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* <div
          className={`success-message ${showSuccessMessage ? "visible" : ""}`}
        >
          Your message has been sent successfully!
        </div> */}
      </div>
    </section>
  );
}

export default Contact;
