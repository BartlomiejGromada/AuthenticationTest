import React, { useContext, useRef } from 'react';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const userCtx = useContext(UserContext);

  const loginUser = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if(email && password)
        userCtx.login(email, password);
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-[400px] bg-purple-700 pt-20 pb-10 px-10 rounded-md'>
            <form className='space-y-5' onSubmit={loginUser}>
                <TextField id="email" placeholder="Email" type="text" label="Email"
                ref={emailRef} 
                />
                <TextField id="password" placeholder="Password" type="password" label="Password" 
                ref={passwordRef} />

                <div className='pt-5 flex space-x-2 justify-end'>
                    <Button type="submit">Register</Button>
                    <Button type="reset">Clear</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login