import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const cardStyle = {
  minWidth: 200,
  maxWidth: 300,
  margin: 10,
  borderRadius: 10,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  border: '5px solid', // Add border style
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

const iconStyle = {
  fontSize: 50,
  marginBottom: 10,
};

const titleStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 5,
};

const descriptionStyle = {
  fontSize: 14,
};

const DashboardCard = ({ title, description, icon, color }) => {
  const iconColorStyle = {
    color: color, // Set icon color same as border color
  };

  return (
    <Card style={{ ...cardStyle, borderColor: color }}>
      <CardContent style={{ textAlign: 'center' }}>
        {icon && React.cloneElement(icon, { style: { ...iconStyle, ...iconColorStyle } })}
        <Typography variant="h5" component="h2" style={titleStyle}>
          {title}
        </Typography>
        <Typography variant="body2" component="p" style={descriptionStyle}>
          {description} £
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
