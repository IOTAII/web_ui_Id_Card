// Sidebar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import getSidebarData from './SidebarData';
import SubMenu from './SubMenu';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NavText = styled.div`
  color: white;
  font-size: 2rem;
  margin-right: auto;
  margin-left: auto;
  font-weight: bold;
`;

const Nav = styled.div`
  background: #000000;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-right: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: linear-gradient(
    rgba(0, 0, 0, 1) 0,
    rgba(0, 0, 0, 1) 80px,
    rgba(0, 0, 0, 0.5) 80px,
    rgba(0, 0, 0, 0.5)
  );
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = ({ userId, deviceId }) => {
  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);

  const sidebarData = getSidebarData({ userId, deviceId });

  const handleDeviceInfoClick = () => {
    if (!deviceId) {
      toast.error("Please select a device first.");
      return; // Return without navigating if no device is selected
    }
    navigate(`/device-info/${encodeURIComponent(userId)}/${encodeURIComponent(deviceId)}`);
  };
  

  return (
    <>
      <Nav>
        <NavText>Iotai ID Tracker</NavText>
        <NavIcon to='#'>
          <FaIcons.FaBars onClick={showSidebar} style={{ color: 'white' }} />
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to='#'>
            <AiIcons.AiOutlineClose onClick={showSidebar} style={{ color: 'white' }} />
          </NavIcon>
          {sidebarData.map((item, index) => (
            <SubMenu
              key={index}
              item={item}
              handleDeviceInfoClick={handleDeviceInfoClick} // Pass the handler function
            />
          ))}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
