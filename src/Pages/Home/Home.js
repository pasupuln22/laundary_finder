import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCard from '../../Reusable/DashboardCard/DashboardCard';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from '@mui/material'; // Import Material-UI components
import "./Home.css";

const Home = () => {
  const [thisWeekAmount, setThisWeekAmount] = useState(0);
  const [thisMonthAmount, setThisMonthAmount] = useState(0);
  const [thisYearAmount, setThisYearAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [laundryRecords, setLaundryRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchAmounts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/laundry_finder/bookings/totalprices/${localStorage.getItem('userId')}`);
        const { total, weekly, monthly, yearly } = response.data;
        setThisWeekAmount(weekly);
        setThisMonthAmount(monthly);
        setThisYearAmount(yearly);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching laundry amounts:', error);
      }
    };

    const fetchLaundryRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/laundry_finder/bookings/bookings/user/${localStorage.getItem('userId')}`);
        setLaundryRecords(response.data.data);
      } catch (error) {
        console.error('Error fetching laundry records:', error);
      }
    };

    fetchAmounts();
    fetchLaundryRecords();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container">
      <div className="admin-cards-container">
        <div className="admin-cards">
          <DashboardCard title="This Week" icon={<LocalLaundryServiceIcon />} description={thisWeekAmount} color="#F39C13" />
          <DashboardCard title="This Month" icon={<LocalLaundryServiceIcon />} description={thisMonthAmount} color="#15A085" />
          <DashboardCard title="This Year" icon={<LocalLaundryServiceIcon />} description={thisYearAmount} color='#8E44AD' />
          <DashboardCard title="Total" icon={<LocalLaundryServiceIcon />} description={totalAmount} color="#2A80B9" />
        </div>
      </div>

      <h2>Laundry Records</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Selected Date</TableCell>
              <TableCell>Selected Time</TableCell>
              <TableCell>Instructions</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {laundryRecords
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.items}</TableCell>
                  <TableCell>{record.selected_date}</TableCell>
                  <TableCell>{record.selected_time}</TableCell>
                  <TableCell>{record.instructions}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={laundryRecords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Home;
