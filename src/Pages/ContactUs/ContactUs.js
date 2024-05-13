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
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

import PrivacyPolicy from './PrivacyPolicy';

const ContactUs = () => {
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);

  const handlePrivacyPolicyOpen = () => {
    setOpenPrivacyPolicy(true);
  };

  const handlePrivacyPolicyClose = () => {
    setOpenPrivacyPolicy(false);
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
          <form>
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