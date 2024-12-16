import React from 'react';
import PackageCard from './PackageCard';
import Navbar from './shared/Navbar';

const AllPackages = () => {
  const packages=[1,2,3,4,5];
  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
      {packages.map((tour,index)=>(
        <PackageCard key={index}/>
      ))}
    </div>
  );
}

export default AllPackages;
