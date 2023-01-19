import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../API/tiketportal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //validation
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  useEffect(()=> {
      if(localStorage.getItem('token')){
          navigate('/')
      }
  },[])

  const loginHandler = async(e) => {
      e.preventDefault()

      const formData = new FormData();

      formData.append('email', email);
      formData.append('password', password);

      console.log(formData)
      login(formData).then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.authorisation.token)
      })
      .catch(error => {
        console.log(error.response.data)
        setValidation(error.response.data)
      })
  }
  return (
      <div className='bg-[#FAFAFA] w-[100%] min-h-[100vh] pb-3'>
          <div className='px-16 pt-9'>
              <NavLink to="/" className="font-medium text-4xl">
                  <span className="font-subrayada text-blue-700">Agent</span>
                  <span className="font-subrayada text-yellow-400">X</span>
              </NavLink>
          </div>

          <form onSubmit={loginHandler} className="mx-auto my-8 w-[670px] gap-7 px-8 py-10 flex flex-col justify-between bg-white rounded-lg">
              <div>
                  <h1 className='text-4xl font-medium'>Hello there</h1>
                  <span className='text-base font-medium'>Sign In to get started</span>
              </div>
  
              <div className="flex flex-col gap-7">
                  <div>
                      <span className='font-medium'>Email Address</span>
                      <input required value={email} onChange={e => setEmail(e.target.value)} className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu' type="text" />
                  </div>

                  <div className="login-frame7">
                      <span className='font-medium'>Password</span>
                      <input required value={password} onChange={e => setPassword(e.target.value)} className='w-full h-[48px] mt-2 mb-[5px] rounded-lg border p-2 border-abu' type="text" />
                  </div>

              </div>

              <button type='submit' className='w-full h-[64px] bg-blue-700 text-white rounded-lg'>Login</button>
          </form>
          
      </div>
  )
}

export default Login