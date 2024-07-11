import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Dropdown from '../Dropdown/Dropdown';
import { useUser } from '../../context/userContext';
import Map from '../../Map/Map';
import './Home.css';
import { toast } from 'react-toastify';
import { MdCall } from 'react-icons/md';

const Home = () => {
  const { user } = useUser();
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [deviceIds, setDeviceIds] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchDeviceIds = async () => {
      try {
        const response = await fetch(`http://3.109.34.34:8080/devices/${user_id}`);
        const data = await response.json();
        const ids = data.map((device) => device.device_id);
        setDeviceIds(ids);
      } catch (error) {
        console.error('Error fetching device ids:', error);
      }
    };

    if (user_id) {
      fetchDeviceIds();
    }
  }, [user_id]);

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

  const handleDeviceInfoClick = () => {
    if (!selectedOption) {
      toast.error("Please select a device first.");
    } else {
      navigate(`/device-info/${encodeURIComponent(user_id)}/${encodeURIComponent(selectedOption)}`);
    }
  };

  const handleCallClick = async () => {
    if (!selectedOption) {
      toast.error("Please select a device first.");
      return;
    }

    try {
      const response = await fetch(`http://3.109.34.34:8080/retrieve-phone-number/${selectedOption}`);
      const data = await response.json();
      const phoneNumber = `tel:+${data.phoneNumber}`;
      window.location.href = phoneNumber;
    } catch (error) {
      console.error('Error fetching phone number:', error);
      toast.error('Failed to fetch phone number');
    }
  };

  return (
    <>
      <div className='sidebar'>
        <Sidebar userId={user_id} deviceId={selectedOption} handleDeviceInfoClick={handleDeviceInfoClick} />
      </div>
      <div className="background-container">
        <div className="dropdown-container">
          <Dropdown options={deviceIds} setSelectedOption={handleDropdownChange} user_id={user_id} />
        </div>
        <div className="map-container">
          <Map selectedOption={selectedOption} user={user} />
        </div>
        <div className="call-button-container">
          <button className="call-button" onClick={handleCallClick}>
            <MdCall size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
