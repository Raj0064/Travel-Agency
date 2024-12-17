import React from 'react';
import PackageCard from './PackageCard';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import useGetAllPackages from '@/hooks/useGetAllPackages';


const AllPackages = () => {
 useGetAllPackages
  const { packages } = useSelector(store => store.package);
  console.log(packages);

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
      {packages.map((pack) => (
        <PackageCard key={pack._id} pack={pack} />
      ))}
    </div>
  );
}

export default AllPackages;
