import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const {fetching, error} = userCtx.fetchingState;

  const logout = async() => {
    const isSuccess = await userCtx.logout();
    if(isSuccess) {
        navigate("/login", {replace: true});
    }
  }

  return (
    <div className='fixed top-0 left-0 bg-purple-700 w-full h-[80px]'>
        <div className='flex justify-between items-center w-full h-full px-5'>
            <div className='text-white font-bold text-2xl'>FIREBASE AUTH</div>
            {(!error && !fetching) && (<div className='flex flex-col items-center text-white font-semibold p-2 hover:brightness-[80%] hover:cursor-pointer' onClick={logout}>
                <div>LOGOUT</div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                </div>
            </div>)}

            {error && (<div className='p-5 text-black font-semibold text-center bg-rose-300 rounded-lg'>{error}</div>)}
            {fetching && <div className='flex justify-center text-white p-5'>Loading...</div>}
        </div>
    </div>
  )
}

export default Banner;