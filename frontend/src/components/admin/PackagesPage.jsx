import React from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import AdminPackagesTable from './AdminPackagesTable';
import { useNavigate } from 'react-router-dom';

const PackagesPage = () => {
  const navigate=useNavigate();
  return (
    <div>
      <Navbar/>
      <div className='flex justify-between'>
        <h1></h1>
        <Button onClick={()=>navigate("/packages/create")}> New Package</Button>
      </div>
      <AdminPackagesTable/>
    </div>
  );
}

export default PackagesPage;
