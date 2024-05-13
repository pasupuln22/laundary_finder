import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDarkMode } from './DarkModeContext';
import Home from './Pages/Home/Home';
import ResponsiveAppBar from './Pages/ResponsiveAppBar/ResponsiveAppBar';
import ContactUs from './Pages/ContactUs/ContactUs';
import Login from './Pages/Login/Login';
import LaundrySlotForm from './Pages/CreateLaundry/CreateLaundry';
import Laundry from './Pages/Laundry/Laundry';
import Tips from './Pages/Tips/Tips';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { isDarkMode } = useDarkMode();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode || prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode, prefersDarkMode],
  );

  // Custom hook to get current location
  const CurrentLocationAwareAppBar = () => {
    const location = useLocation();

    // If current location is '/login', don't render the navbar
    if (location.pathname === '/login') {
      return null;
    }

    // Render the navbar for other routes
    return <ResponsiveAppBar />;
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CurrentLocationAwareAppBar />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/laundry" element={<Laundry />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:id" element={<LaundrySlotForm />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
