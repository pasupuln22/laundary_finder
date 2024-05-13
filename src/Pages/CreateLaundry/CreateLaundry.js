import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';

const LaundrySlotForm = () => {
  const [formData, setFormData] = useState({
    items: '',
    selected_date: '',
    selected_time: '',
    instructions: '',
    price: '', // Total price used as price in formData
    type: '',
    created_by: '', // Update to empty string
    name: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [laundryPrice, setLaundryPrice] = useState('');
  const [laundryId, setLaundryId] = useState('');

  useEffect(() => {
    const extractIdFromUrl = () => {
      const path = window.location.pathname;
      const id = path.split('/').pop();
      setLaundryId(id);
    };
    extractIdFromUrl();

    // Fetch user ID from localStorage and set it in formData
    const userId = localStorage.getItem('userId');
    setFormData((prevData) => ({
      ...prevData,
      created_by: userId,
    }));
  }, []);

  useEffect(() => {
    if (laundryId) {
      const fetchLaundryDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/laundry_finder/laundry/laundry/${laundryId}`);
          if (response.status === 200) {
            const { name, price } = response.data.data[0];
            setFormData((prevData) => ({
              ...prevData,
              name: name,
              price: price.toString(),
            }));
          }
        } catch (error) {
          console.error('Error fetching laundry details:', error);
        }
      };
      fetchLaundryDetails();
    }
  }, [laundryId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'items' && value && formData.price) {
      const items = parseInt(value);
      const price = parseFloat(formData.price);
      setLaundryPrice(items * price);
      setFormData((prevData) => ({
        ...prevData,
        price: (items * price).toString(),
      }));
    } else if (name === 'price' && value && formData.items) {
      const items = parseInt(formData.items);
      const price = parseFloat(value);
      setLaundryPrice(items * price);
      setFormData((prevData) => ({
        ...prevData,
        price: (items * price).toString(),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/laundry_finder/bookings/booking', formData);
      if (response.status === 201) {
        setSuccessMessage('Booking created successfully');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Laundry Slot
      </Typography>
      <Card>
        <CardContent>
          {successMessage && (
            <Alert variant="filled" severity="success">
              {successMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="items"
                  name="items"
                  label="Number of Items"
                  variant="outlined"
                  value={formData.items}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    label="Type"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="Washing">Washing</MenuItem>
                    <MenuItem value="Drying">Drying</MenuItem>
                    <MenuItem value="Washing_drying">Washing and Drying</MenuItem>
                    <MenuItem value="Wash_dry_iron">Washing, Drying, and Ironing</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="selected_date"
                  name="selected_date"
                  label="Selected Date"
                  type="date"
                  variant="outlined"
                  value={formData.selected_date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="selected_time"
                  name="selected_time"
                  label="Selected Time"
                  type="time"
                  variant="outlined"
                  value={formData.selected_time}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="instructions"
                  name="instructions"
                  label="Instructions"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={formData.instructions}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled
                  id="name"
                  name="name"
                  label="Laundry Name"
                  variant="outlined"
                  value={formData.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled
                  id="price"
                  name="price"
                  label="Price per Item"
                  variant="outlined"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled
                  id="total_price"
                  name="total_price"
                  label="Total Price"
                  variant="outlined"
                  value={laundryPrice}
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
    </Container>
  );
};

export default LaundrySlotForm;
