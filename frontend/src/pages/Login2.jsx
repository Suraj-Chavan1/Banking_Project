import React from 'react'
import backgroundImage from '../../public/bg-1.jpg';

const Login2 = () => {
  return (
    <div className='flex justify-around' style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className='relative text-6xl flex flex-col justify-start pt-20 text- font-bold text-center h-screen overflow-hidden w-full'>Welcome to the world of<br/>streamlined banking</div>
        <div className='w-full'>
            <div className=' mt-20 text-4xl text-center font-bold'>
                Login/Signup
            </div>
            <div className='flex flex-col justify-start p-10 bg-gray-100 bg-opacity-70 mt-12 mr-16 ml-16 rounded-md h-96'>
                <div className='text-xl text-center font-bold'>Enter OTP sent at</div>
                <div className='text-xl mt-2  text-center'>johndoe@gmail.com</div>
                <div className='flex justify-around pr-20 pl-20'>
                <input className='w-12 m-10  mb-5 h-12 p-5 rounded-md' placeholder='0'></input>
                <input className='w-12 m-10 ml-2 mb-5 h-12 p-5 rounded-md' placeholder='0'></input>
                <input className='w-12 m-10 ml-2 mb-5 h-12 p-5 rounded-md' placeholder='0'></input>
                <input className='w-12 m-10 ml-2 mb-5 h-12 p-5 rounded-md' placeholder='0'></input>
                </div>
                <button className='mr-24 ml-24 rounded-md p-2 bg-[#ff5b2e] text-white font-bold'>Login</button>
                <a className='text-center mt-10' href='google.com'>I forgot my account number</a>
            </div>
        </div>
        </div>
  )
}

export default Login2