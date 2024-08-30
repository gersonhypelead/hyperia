import React from 'react';
import Siderbar from '../components/layouts/Siderbar';
import { Outlet } from 'react-router-dom';

const LayoutWithSidebar: React.FC = () => {
  return (
    <Siderbar>
      <Outlet />
    </Siderbar>
  );
};

export default LayoutWithSidebar;
