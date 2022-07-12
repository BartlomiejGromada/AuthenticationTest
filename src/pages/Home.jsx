import React, { useContext } from 'react';
import User from '../assets/user.png';
import Banner from '../components/Banner';
import { UserContext } from '../context/UserContext';

const Home = () => {
    const userCtx = useContext(UserContext);

    return (
        <>
            <Banner />
            <div className='h-screen flex justify-center items-center bg-purple-300'>
                <div className='w-[400px] bg-purple-800 pt-10 pb-10 px-10 rounded-md shadow-lg shadow-purple-500 flex justify-center items-center flex-col space-y-3'>
                    <div><img src={User} alt="user" className='h-[100px] w-[100px] rounded-full shadow-sm shadow-purple-300' /></div>
                    <div className='text-white font-semibold'>{userCtx?.user?.email}</div>
                    <div className='text-white font-semibold'>{userCtx?.user?.metadata?.creationTime}</div>
                </div>
            </div>
        </>
    )
}

export default Home