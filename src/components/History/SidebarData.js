import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Side = styled.div`
  width: 280px;
  padding-bottom: 10px;
  margin-right: 10px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  height: 115%;
  color: white;
`;

const FilterSelect = styled.select`
  padding: 5px;
  margin-left: 10px;
  color: black;
`;

const Button = styled.button`
  margin-left: 5px;
  padding: 8px 16px;
  margin-top: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoadMoreButton = styled.button`
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const ShowPreviousButton = styled.button`
  margin: 2px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

const SidebarData = ({ user_id, device_id }) => {
  const [historyFilter, setHistoryFilter] = useState('24hours');
  const [locationHistory, setLocationHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const locationsPerPage = 5;

  const handleFilterChange = (filter) => {
    setHistoryFilter(filter);
    setCurrentPage(1);
  };

  const fetchLocationHistory = async () => {
    try {
      const response = await fetch(`http://3.109.34.34:8080/fetch-location-history/${user_id}/${device_id}?filter=${historyFilter}`);
      const data = await response.json();
      setLocationHistory(data || []);
    } catch (error) {
      console.error('Error fetching location history:', error);
    }
  };

  useEffect(() => {
    fetchLocationHistory();
  }, [historyFilter, currentPage]);

  const loadMoreLocations = () => {
    setCurrentPage(currentPage + 1);
  };

  const showPreviousLocations = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = locationHistory.slice(indexOfFirstLocation, indexOfLastLocation);

  return (
    <div style={{ display: 'flex', height: '170px' }}>
      <Side>
        <div>
          <FilterSelect value={historyFilter} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="1hour">Past 1 Hour</option>
            <option value="6hours">Past 6 Hours</option>
            <option value="24hours">Past 24 hours</option>
          </FilterSelect>
          <Button onClick={fetchLocationHistory}>Fetch</Button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
          {currentLocations && currentLocations.length > 0 ? (
            currentLocations.map((location, index) => (
              <li key={index} style={{ marginBottom: '2px' }}>
                <strong>{index + 1}. Latitude: {location.latitude}, Longitude: {location.longitude}</strong>
              </li>
            ))
          ) : (
            <li>No data available</li>
          )}
        </ul>

        <div style={{ textAlign: 'center' }}>
          {currentPage > 1 && (
            <ShowPreviousButton onClick={showPreviousLocations}>Show Previous</ShowPreviousButton>
          )}
          {locationHistory && locationHistory.length > indexOfLastLocation && (
            <LoadMoreButton onClick={loadMoreLocations}>Load More</LoadMoreButton>
          )}
        </div>
      </Side>
    </div>
  );
};

export default SidebarData;
