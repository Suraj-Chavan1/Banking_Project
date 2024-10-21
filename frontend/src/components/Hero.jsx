import React from 'react';

const Hero = () => {
  return (
    <div className='flex flex-col justify-center'>
      <div
        className='text-8xl text-white h-1/2 pt-20 pb-20 w-full text-center'
      >
        Faster way to Bank
      </div>
      <div className='flex justify-center'>
        <button className='bg-[#ff5b2e] text-white border-black pl-5 pr-5 pt-2 pb-2 font-bold text-xl'>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
