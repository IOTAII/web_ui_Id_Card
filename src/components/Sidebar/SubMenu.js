// SubMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-left: 4px solid #000000;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: rgba(0, 0, 0, 0.3);
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #000000;
    cursor: pointer;
    opacity: 0.5;
  }
`;

const SubMenu = ({ item, handleDeviceInfoClick }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const handleItemClick = () => {
    if (item.title === 'Device Information' && !handleDeviceInfoClick()) {
      return false; // Prevent default behavior if handleDeviceInfoClick returns false
    }
    return true; // Allow default behavior for other menu items
  };
  return (
    <>
      <SidebarLink
        to={item.path}
        target={item.target}
        rel={item.rel}
        onClick={handleItemClick} 
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((subItem, index) => (
          <DropdownLink to={subItem.path} key={index} target={subItem.target} rel={subItem.rel}>
            {subItem.icon}
            <SidebarLabel>{subItem.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
