import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
  Alert, // Import Alert component from Material-UI
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import axios from 'axios'; // Import Axios

import PrivacyPolicy from './PrivacyPolicy';

const ContactUs = () => {
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false); // State to manage alert open/close
  const [alertMessage, setAlertMessage] = useState(''); // State to manage alert message

  const handlePrivacyPolicyOpen = () => {
    setOpenPrivacyPolicy(true);
  };

  const handlePrivacyPolicyClose = () => {
    setOpenPrivacyPolicy(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const formData = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      message: event.target.elements.message.value,
    };
  
    axios.post('http://localhost:3001/contact', formData)
      .then((response) => {
        setAlertMessage(response.data.message); // Set success message
        setAlertOpen(true); // Open alert
        // Reset alert after 3 seconds
        setTimeout(() => {
          setAlertOpen(false);
        }, 3000);
      })
      .catch((error) => {
        console.error(error); // Log error if request fails
        setAlertMessage('Failed to submit contact details'); // Set error message
        setAlertOpen(true); // Open alert
        // Reset alert after 3 seconds
        setTimeout(() => {
          setAlertOpen(false);
        }, 3000);
      });
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          Have a question or need assistance? Contact us using the form below.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {alertMessage && ( // Display Alert if alertMessage exists
              <Alert severity="success" onClose={handleAlertClose} open={alertOpen}>
                {alertMessage}
              </Alert>
            )}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Your Name"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Your Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="message"
                  label="Your Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox required color="primary" />}
                  label={
                    <span>
                      I have read and agree to the{' '}
                      <Link href="#" onClick={handlePrivacyPolicyOpen}>
                        Privacy Policy
                      </Link>
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Box mt={3} display="flex" justifyContent="center">
        <Facebook color="primary" fontSize="large" style={{ marginRight: '16px' }} />
        <Twitter color="primary" fontSize="large" style={{ marginRight: '16px' }} />
        <Instagram color="primary" fontSize="large" style={{ marginRight: '16px' }} />
        <LinkedIn color="primary" fontSize="large" />
      </Box>
      <Dialog open={openPrivacyPolicy} onClose={handlePrivacyPolicyClose}>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <PrivacyPolicy />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrivacyPolicyClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContactUs;
