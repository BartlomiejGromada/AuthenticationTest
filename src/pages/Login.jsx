import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const userCtx = useContext(UserContext);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const navigate = useNavigate();

  const {fetching, error} = userCtx.fetchingState;

  const validateForm = (email, password) => {
    let isValid = true;

    if(!email.includes("@")) {
      setErrorEmail("Invalid email");
      isValid = false;
    } else {
      setErrorEmail(false);
    }

    if(password.length < 6) {
      setErrorPassword("Invalid password");
      isValid = false;
    } else {
      setErrorPassword(false);
    }

    return isValid;
  };

  const loginUser = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const isValid = validateForm(email, password);

    if(isValid) {
      const isSuccess = await userCtx.login(email, password);
      
      if(isSuccess) {
        navigate("/", {replace: true});
      }
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-purple-300'>
        <div className='w-[400px] bg-purple-800 pt-10 pb-10 px-10 rounded-md shadow-lg shadow-purple-500'>
          {/* ICON */}
          <div className='flex justify-center pb-10'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="white" viewBox="0 0 24 24" stroke="white" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          {/* FORM */}
          <div>
              <form className='space-y-5' onSubmit={loginUser}>
                  <TextField id="email" placeholder="Email" type="text" label="Email"
                  ref={emailRef} required={true} isError={errorEmail} />
                  <TextField id="password" placeholder="Password" type="password" label="Password" ref={passwordRef} required={true} isError={errorPassword} />

                  <div className='pt-5'>
                    {error && (<div className='p-5 text-black font-semibold text-center bg-rose-300 rounded-lg'>{error}</div>)}
                    {fetching && <div className='flex justify-center text-white p-5'>Loading...</div>}
                  </div>

                  <div className='pt-2 flex space-x-2 justify-end'>
                      <Button type="submit" disabled={fetching}>Login</Button>
                      <Button type="reset" disabled={fetching}>Clear</Button>
                  </div>
              </form>

              <div className='text-end pt-[40px]'>
                <div className='text-white text-base hover:cursor-pointer hover:text-slate-300'>
                  <Link to={"/register"}>Create account</Link>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login;