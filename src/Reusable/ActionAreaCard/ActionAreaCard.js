import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ActionAreaCard ({ laundry_id, name, address, city, zipcode, price, page }) {
  return (
    <Card sx={{ width: 300 }}>
      <CardActionArea component={Link} to={`/${page}/${laundry_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="div" color="primary">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Address: {address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            City: {city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Zipcode: {zipcode}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ color: 'green' }}>
            Price per Item: {price} £
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
