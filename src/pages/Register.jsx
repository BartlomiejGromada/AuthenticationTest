import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { UserContext } from '../context/UserContext';

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const userCtx = useContext(UserContext);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRepeatPassword, setErrorRepeatPassword] = useState(false);
  const [isSucces, setIsSucces] = useState(false);

  const {fetching, error} = userCtx.fetchingState;

  const validateForm = (email, password, repeatPassword) => {
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

    if(repeatPassword !== password) {
      setErrorRepeatPassword("Repeat password isn't the same like password");
      isValid = false;
    } else {
      setErrorRepeatPassword(false);
    }

    return isValid;
  };

  const registerUser = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordRepeat = repeatPasswordRef.current.value;
    const isValid = validateForm(email, password, passwordRepeat);

    if(isValid) {
      const isSucces = await userCtx.register(email, password);
      if(isSucces) {
        setIsSucces(true);
      }
    }  
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-purple-300'>
        <div className='w-[400px] bg-purple-800 pt-10 pb-10 px-10 rounded-md shadow-lg shadow-purple-500'>
          {/* ICON */}
          <div className='flex justify-center pb-10'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="white" viewBox="0 0 24 24" stroke="white" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          {/* FORM */}
            <div>
              <form className='space-y-5' onSubmit={registerUser}>
                  <TextField id="email" placeholder="Email" type="text" label="Email" ref={emailRef} required={true} isError={errorEmail} />
                  <TextField id="password" placeholder="Password" type="password" label="Password" ref=   {passwordRef} required={true} isError={errorPassword} />
                  <TextField id="repeatPassword" placeholder="Repeat password" type="password" label="Repeat password" ref={repeatPasswordRef} required={true} isError={errorRepeatPassword} />

                <div className='pt-5'>
                  {error && (<div className='p-5 text-black font-semibold text-center bg-rose-300 rounded-lg'>{error}</div>)}
                  {isSucces && (<div className='p-5 text-black font-semibold text-center bg-emerald-300 rounded-lg'>The account has been created</div>)}
                  {fetching && <div className='flex justify-center text-white p-5'>Loading...</div>}
                </div>

                <div className='pt-2 flex space-x-2 justify-end'>
                  <Button type="submit" disabled={fetching}>Register</Button>
                  <Button type="reset" disabled={fetching}>Clear</Button>
                </div>
              </form>

              <div className='text-end pt-[40px]'>
                <div className='text-white text-base hover:cursor-pointer hover:text-slate-300'>
                  <Link to={"/login"}>Have account already? Login</Link>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Register;