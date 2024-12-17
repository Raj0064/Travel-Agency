import React from 'react';
import Navbar from './shared/Navbar';
import AllPackages from './AllPackages';

const Explore = () => {
  return (
    <div className='max-w-7xl bg-background mx-auto border border-black px-3'>
      <Navbar/>
      <AllPackages/>
    </div>
  );
}

export default Explore;
