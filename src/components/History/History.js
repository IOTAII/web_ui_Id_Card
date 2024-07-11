
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Map1 from './Map1';
import Sidepanel from './Sidepanel';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 

const History = () => {
  const { user_id, device_id } = useParams();
  const [lH, setLocationHistory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('24hours'); // Default filter

  useEffect(() => {
    const fetchLocationHistory = async () => {
      try {
        const response = await axios.get(`http://3.109.34.34:8080/fetch-locations/${user_id}/${device_id}?filter=${selectedFilter}`);
        setLocationHistory(response.data);
      } catch (error) {
        console.error('Error fetching location history:', error);
      }
    };

    fetchLocationHistory();
  }, [user_id, device_id, selectedFilter]);

  return (
    <>
      <div className='sidebar'>
        <Sidepanel lH={lH} user_id={user_id} device_id={device_id}/>
      </div>
      
      <div className="background-container">
        <div className="map-container">
          <Map1 locationHistory={lH} selectedFilter={selectedFilter}/>
        </div>
      </div>
    </>
  );
};

export default History;






