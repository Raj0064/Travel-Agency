import React from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import AdminPackagesTable from './AdminPackagesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllPackages from '@/hooks/useGetAllPackages';


const PackagesPage = () => {
  useGetAllPackages();
  const navigate = useNavigate();
  return (
    <div className='max-w-7xl bg-background mx-auto border border-border mb-5'>
      <Navbar />
      <div className='flex justify-between px-3'>
        <h1></h1>
        <Button onClick={() => navigate("/packages/create")}> New Package</Button>
      </div>
      <AdminPackagesTable />
    </div>
  );
}

export default PackagesPage;
