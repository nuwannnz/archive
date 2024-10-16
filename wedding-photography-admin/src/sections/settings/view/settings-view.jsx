import React, { useState , useEffect } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Label from "src/components/label";

import { fetchAuthSession } from "aws-amplify/auth";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    total_capacity: 0,
  });

  const [showTextField, setShowTextField] = useState(false);

  const [domain, setDomain] = useState(null);

  useEffect(() => {

    fetchDomain();
  }, []);

  const handleButtonClick = () => {
    setShowTextField(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };  

  const fetchDomain = async () => {
    try {

      const { idToken } = (await fetchAuthSession()).tokens ?? {};

    if (!idToken) {
      throw new Error("Id token not available.");
    }
      const response = await fetch(
        'https://tfsmq24ojl.execute-api.ap-south-1.amazonaws.com/dev/api/domains/private/get-my-domain',
        {
          headers: {
            Authorization: idToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch domain');
      }

      const data = await response.json();
      setDomain(data); // assuming data is the domain information
    } catch (error) {
      console.error('Error fetching domain:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    updateCapacity(formData);
  };

  // const updateCapacity = async (formData) => {

  //   setFormData({
  //     ...formData,
  //     total_capacity: domain.total_capacity,
  //   });

  //   try {
  //     const { idToken } = (await fetchAuthSession()).tokens ?? {};
  
  //     if (!idToken) {
  //       throw new Error("Id token not available.");
  //     }
  
  //     const response = await fetch(
  //       "https://tfsmq24ojl.execute-api.ap-south-1.amazonaws.com/dev/api/domains/private/update-my-domain",
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: idToken,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           total_capacity: formData.total_capacity,
  //         }),
  //       }
  //     );
  
  //     if (!response.ok) {
  //       throw new Error("Failed to update capacity");
  //     }

  //     setFormData({
  //       ...formData,
  //       total_capacity: formData.total_capacity,
  //     });

  //     console.error("Updating capacity:", formData.total_capacity);
  
  //     setShowTextField(false);
  //   } catch (error) {
  //     console.error("Error updating capacity:", error);
  //   }

  //   fetchDomain();
  // };
  
  const updateCapacity = async (formData) => {
    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
  
      if (!idToken) {
        throw new Error("Id token not available.");
      }
  
      const response = await fetch(
        "https://tfsmq24ojl.execute-api.ap-south-1.amazonaws.com/dev/api/domains/private/update-my-domain",
        {
          method: "PATCH",
          headers: {
            Authorization: idToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            total_capacity: formData.total_capacity,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update capacity");
      }
  
      // Fetch domain data first
      await fetchDomain();
  
      // Then update the state
      setFormData({
        ...formData,
        total_capacity: domain.total_capacity,
      });
  
      console.error("Updating capacity:", formData.total_capacity);
  
      setShowTextField(false);
    } catch (error) {
      console.error("Error updating capacity:", error);
    }
  };
  

  return (
    <Container>
      <Card>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          p={2}
        >
          <Typography variant="h4">Settings</Typography>
        </Stack>

        <Grid
          container
          justifyContent="center" // Center horizontally
          alignItems="center" // Center vertically
        >
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "800px", width: "100%", padding: "16px" }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={showTextField ? 6 : 8}>
                {showTextField ? null : <label>Total Capacity</label>}
              </Grid>

              {showTextField ? (
                <Grid item xs={8}>
                  <TextField
                    label="Total Capacity"
                    name="total_capacity"
                    variant="outlined"
                    fullWidth
                    value={formData.total_capacity}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <Label color="info" width="100px">
                  {domain &&domain.total_capacity}
                  </Label>
                </Grid>
              )}

              <Grid item xs={showTextField ? 4 : 2}>
                {!showTextField && (
                  <Button
                    type="button"
                    variant="contained"
                    color="info"
                    onClick={handleButtonClick}
                    fullWidth
                  >
                    Change
                  </Button>
                )}
              </Grid>
            </Grid>

            {showTextField && (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button type="submit" variant="contained" color="primary" 
                  onClick={() => setShowTextField(false)}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            )}
          </form>
        </Grid>
      </Card>
    </Container>
  );
}
