import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from '@mui/material';

const Tips = () => {
  const [tipsData, setTipsData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedEmbed, setSelectedEmbed] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/laundry_finder/tips/getalltips');
        setTipsData(response.data.data);
      } catch (error) {
        console.error('Error fetching tips data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTitleChange = (event) => {
    const selectedId = event.target.value;
    const selectedTip = tipsData.find((tip) => tip.id === selectedId);
    setSelectedTitle(selectedTip.title);
    setSelectedEmbed(selectedTip.youtube_url);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tips
      </Typography>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="title-label">Select Title</InputLabel>
            <Select
              labelId="title-label"
              id="title"
              value={selectedTitle}
              onChange={handleTitleChange}
              label="Select Title"
              fullWidth
            >
              {tipsData.map((tip) => (
                <MenuItem key={tip.id} value={tip.id}>
                  {tip.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {selectedTitle && (
        <Box mt={2} textAlign="center">
          <Typography variant="h5" gutterBottom>
            {selectedTitle}
          </Typography>
        </Box>
      )}
      <Box mt={4} display="flex" alignItems="center" justifyContent="center">
        {selectedEmbed && (
          <div dangerouslySetInnerHTML={{ __html: selectedEmbed }} />
        )}
      </Box>
    </Container>
  );
};

export default Tips;
