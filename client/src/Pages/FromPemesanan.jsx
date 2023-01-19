import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { createPenonton, logOut } from '../API/tiketportal';

const FromPemesanan = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [umur, setUmur] = useState('');
  const [alamat, setAlamat] = useState('');
  const [nomor, setNomor] = useState('');
  const [pemesan, setPemesan] = useState(null);
  
  const navigate = useNavigate();

  useEffect(()=> {
      if(localStorage.getItem('token')){
          navigate('/')
      }
  },[])

  const createTiket = () => {
    setPemesan(null)
  }

  const logoutHandler = () => {
    logOut().then(res => {
      console.log(res)
      localStorage.removeItem("token")
      navigate('/login')
    })
  }

  const registerHandler = async(e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append('nama', nama);
      formData.append('email', email);
      formData.append('umur', umur);
      formData.append('alamat', alamat);
      formData.append('no_telp', nomor);

      console.log(formData)

      await createPenonton(formData).then(response => {
              console.log(response.data)
              setPemesan(response.data.penonton)
              setAlamat('')
              setNama('')
              setEmail('')
              setNomor('')
              setUmur('')
          })
          .catch(error => {
              console.log(error.response.data)
          })

  }

  return (
      <div className='bg-[#FAFAFA] w-[100%] min-h-[100vh] pb-8'>
          <div className='px-16 pt-9 flex justify-between'>
              <NavLink to="/" className="font-medium text-4xl">
                  <span className="font-subrayada text-blue-700">Agent</span>
                  <span className="font-subrayada text-yellow-400">X</span>
              </NavLink>

              { !localStorage.getItem('token') ? 
                (
                  <NavLink to="/login" >
                    <button className="w-fit h-fit p-4 flex font-medium bg-blue-700 text-white rounded-lg">Login sebagai admin</button>
                  </NavLink>
                )
                :
                (
                  <button onClick={logoutHandler} className="w-fit h-fit p-4 flex font-medium bg-blue-700 text-white rounded-lg">Logout</button>
                )
              }

          </div>

          {pemesan != null ? 
            (
              <div className="mx-auto mt-8 w-[670px] gap-4 h-auto px-8 py-10 flex flex-col justify-between bg-white rounded-lg">
                <div className='mb-5'>
                  <h1 className='text-4xl font-medium'>Tiket Created</h1>
                </div>

                <div className="flex flex-col gap-5 h-fit">
                    <div>
                        <span className='font-medium'>Fullname</span>
                        <input readOnly value={pemesan.nama} className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu backdrop-blur-none' type="text" />
                    </div>

                    <div>
                        <span className='font-medium'>Tiket ID</span>
                        <input readOnly value={pemesan.kode_tiket} className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu' type='text' />
                    </div>
                </div>

                <button onClick={createTiket} className='w-full h-[64px] bg-blue-700 text-white mt-5 rounded-lg'>Pesan Tiket Lagi</button>
              </div>
            )
            :
            (
              <form onSubmit={registerHandler} className="mx-auto mt-8 w-[670px] min-h-[670px] px-8 py-10 flex flex-col justify-between bg-white rounded-lg">
                  <div className='mb-5'>
                      <h1 className='text-4xl font-medium'>Hello there</h1>
                      <span className='text-base font-medium'>This is form to get tiket id</span>
                  </div>

                  <div className="flex flex-col gap-5 min-h-[400px]">
                      <div>
                          <span className='font-medium'>Fullname</span>
                          <input required value={nama} onChange={(e) => {setNama(e.target.value)}} className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu' type="text" />
                      </div>

                      <div>
                          <span className='font-medium'>Umur</span>
                          <input required value={umur} onChange={(e) => {setUmur(e.target.value)}} className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu' type='number' />
                      </div>

                      <div>
                          <span className='font-medium'>Email Address</span>
                          <input required value={email} onChange={(e) => {setEmail(e.target.value)}} className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu' type="text" />
                      </div>

                      <div className="login-frame7">
                          <span className='font-medium'>No HP</span>
                          <input required type='text' value={nomor} onChange={(e) => {setNomor(e.target.value)}} className='w-full h-[48px] mt-2 mb-[5px] rounded-lg border p-2 border-abu'/>
                      </div>

                      <div className="login-frame7">
                          <span className='font-medium'>Alamat</span>
                          <input required type='text' value={alamat} onChange={(e) => {setAlamat(e.target.value)}} className='w-full h-[48px] mt-2 mb-[5px] rounded-lg border p-2 border-abu' />
                      </div>

                  </div>

                  <button type='submit' className='w-full h-[64px] bg-blue-700 text-white mt-5 rounded-lg'>Register</button>
              </form>
            )
          }

      </div>
  )
}

export default FromPemesanan