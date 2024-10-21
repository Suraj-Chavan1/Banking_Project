import React, { useContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser({ name: 'John Doe', designation: 'BOB Gold Member' });
  }, [setUser]);

  return (
    <div className='bg-[#ff5b2e] shadow-md flex justify-between py-2'>
      <div className='flex justify-start'>
        <img src='./logo copy.png' alt='Logo' className='h-14 pl-10' />
        <div className='text-3xl font-bold italic text-white pt-2 pl-2'>
          Walter White
        </div>
      </div>
      <div>
        <button className='bg-black text-white p-2 mx-2 my-2 rounded hover:bg-white hover:text-black' onClick={()=> navigate('/newcustdb')}>Customer Dashboard</button>
        <button className='bg-black text-white p-2 mx-2 my-2 rounded hover:bg-white hover:text-black' onClick={()=> navigate('/newbankdb')}>Bank Dashboard</button>
      </div>
      <div className='flex'>
        <Avatar sx={{ bgcolor: '#000000' }} className='mt-2 mr-5 bg-black'>
          {user?.name?.[0]}
        </Avatar>
        <div className='flex flex-col pr-4'>
          <div className='font-bold'>{user?.name}</div>
          <div className='text-white'>{user?.designation}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
