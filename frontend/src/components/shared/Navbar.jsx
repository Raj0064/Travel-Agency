import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ModeToggle } from '../mode-toggle';

const Navbar = () => {
  const {user}=useSelector(store=>store.auth);
  return (
    <div className='max-w-7xl bg-white mx-auto border border-black my-5 flex justify-between items-center px-3'>
      <div>
        <h1 className='text-xl text-black font-bold mx-auto p-1 md:text-2xl'>Trip<span className='text-violet-600'>Haven</span></h1>
      </div>
      <div>
        {user ? (user?.role==='user'?<>
        {/* User */}
        <ul className='flex justify-between gap-3'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
            <li><Link to="#"></Link></li>
        </ul>
        </> :<>
        {/* Admin */}
            <ul className='flex justify-between gap-3'>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="#">Home</Link></li>
            </ul>
        </>):<div className='flex gap-2'>
            <Button size="sm" variant="secondary" className="border border-purple-700"><Link to="/login">Login</Link> </Button>
            <Button className="bg-purple-800" size="sm"><Link to="/register">Sign Up</Link> </Button>
            <div className="flex items-center">
              <ModeToggle />
            </div>
        </div> }
      </div>
    </div>
  );
}

export default Navbar;
