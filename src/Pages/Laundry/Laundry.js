import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ActionAreaCard from '../../Reusable/ActionAreaCard/ActionAreaCard';
import { URL } from '../../Utils/Url';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Laundry() {
    const [laundryData, setLaundryData] = useState([]);
    const [rateLimitError, setRateLimitError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery, sortOption]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${URL}/laundry/getalllaundry`);
            setLaundryData(response.data.data);
            setRateLimitError(false);
        } catch (error) {
            console.error('Error fetching laundry data:', error);
            if (error.response && error.response.status === 429) {
                setRateLimitError(true);
            }
        }
    };

    const filteredLaundryData = laundryData.filter((laundry) =>
        laundry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laundry.zipcode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedLaundryData = () => {
        if (sortOption === 'cheapToHigh') {
            return filteredLaundryData.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'highToCheap') {
            return filteredLaundryData.sort((a, b) => b.price - a.price);
        } else {
            return filteredLaundryData;
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div className="laundry" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {rateLimitError && (
                    <Alert variant="filled" severity="error">
                        You are being rate-limited. Please follow Rate Limiting guidelines:
                        <a href="https://docs.api.jikan.moe/#section/Information/Rate-Limiting" target="_blank" rel="noopener noreferrer">
                            Rate Limiting Guidelines
                        </a>
                    </Alert>
                )}
            </Stack>
            <div className="search-container" style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by name or zip code"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    style={{ width: '300px', marginBottom: '10px' }}
                />
                <Select
                    value={sortOption}
                    onChange={handleSortChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Sort by' }}
                    style={{ marginLeft: '10px' }}
                >
                    <MenuItem value="">Sort by</MenuItem>
                    <MenuItem value="cheapToHigh">Low to High</MenuItem>
                    <MenuItem value="highToCheap">High to Low</MenuItem>
                </Select>
            </div>
            <div className="laundry" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {sortedLaundryData()
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((laundry) => (
                        <ActionAreaCard
                            key={laundry.laundry_id}
                            name={laundry.name}
                            address={laundry.address}
                            city={laundry.city}
                            zipcode={laundry.zipcode}
                            price={laundry.price}
                            page="book"
                            laundry_id={laundry.laundry_id}
                        />
                    ))}
            </div>
            <div className="pagination" style={{ marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(sortedLaundryData().length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </div>
    );
}
