import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut, showDetail, updateStatus } from '../API/tiketportal';

const CheckTiket = () => {
  const [pemesan, setPemesan] = useState(null);
  
  const navigate = useNavigate();

  useEffect(()=> {
      if(!localStorage.getItem('token')){
          navigate('/login')
      }
  },[])

  const setStatus = () => {
    updateStatus(pemesan.kode_tiket).then(res => {
      console.log(res.data)
      console.log("berhasil")
    }).catch(err => {
      console.log("data tidak ada")
      setPemesan(null)
    })
  }

  const logoutHandler = () => {
    logOut().then(res => {
      console.log(res)
      localStorage.removeItem("token")
      navigate('/login')
    })
  }

  const checkHandler = async(e) => {
      e.preventDefault();
      console.log(e.target[0].value)

      showDetail(e.target[0].value).then(res => {
        console.log(res.data)
        setPemesan(res.data.penonton)
      }).catch(err => {
        console.log("ID tiket tidak valid")
      })
  }

  return (
      <div className='bg-[#FAFAFA] w-[100%] min-h-[100vh] pb-8'>
          <div className='px-16 pt-9 flex justify-between'>
              <NavLink to="/" className="font-medium text-4xl">
                  <span className="font-subrayada text-blue-700">Agent</span>
                  <span className="font-subrayada text-yellow-400">X</span>
              </NavLink>

              <div className='flex justify-between items-center'>
                <NavLink to="/admin" className="font-medium text-xl mr-8">
                  Pemesan
                </NavLink>
                <NavLink to="/check" className="font-medium text-xl mr-8">
                  Check Tiket
                </NavLink>
                <NavLink to="/laporan" className="font-medium text-xl mr-8">
                  Laporan
                </NavLink>
              </div>

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

          {pemesan === null ? 
            (
              <form onSubmit={checkHandler} className="mx-auto my-8 w-[670px] gap-7 px-8 py-10 flex flex-col justify-between bg-white rounded-lg">
                    <div>
                        <h1 className='text-4xl font-medium'>Check-in Tiket</h1>
                        <span className='text-base font-medium'>Masukan id tiket disini</span>
                    </div>
        
                    <div className="flex flex-col gap-7">
                        <div>
                            <span className='font-medium'>ID Tiket</span>
                            <input required className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu' type="text" />
                        </div>
                    </div>

                    <button type='submit' className='w-full h-[64px] bg-blue-700 text-white rounded-lg'>Check Tiket</button>
                </form>
            )
            :
            (
              <form className="mx-auto mt-8 w-[670px] min-h-[670px] px-8 py-10 flex flex-col justify-between bg-white rounded-lg">
                  <div className='mb-5'>
                      <h1 className='text-4xl font-medium'>Hello there</h1>
                      <span className='text-base font-medium'>This is form to get tiket id</span>
                  </div>

                  <div className="flex flex-col gap-5 min-h-[400px]">
                      <div>
                          <span className='font-medium'>Fullname</span>
                          <input value={pemesan.nama} readOnly className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu' type="text" />
                      </div>

                      <div>
                          <span className='font-medium'>Umur</span>
                          <input value={pemesan.umur} readOnly className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu' type='number' />
                      </div>

                      <div>
                          <span className='font-medium'>Email Address</span>
                          <input value={pemesan.email} readOnly className='w-full h-[48px] mt-2 rounded-lg border p-2 border-abu' type="text" />
                      </div>

                      <div className="login-frame7">
                          <span className='font-medium'>No HP</span>
                          <input type='text' value={pemesan.no_telp} readOnly className='w-full h-[48px] mt-2 mb-[5px] rounded-lg border p-2 border-abu'/>
                      </div>

                      <div className="login-frame7">
                          <span className='font-medium'>Alamat</span>
                          <input type='text' value={pemesan.alamat} readOnly className='w-full h-[48px] mt-2 mb-[5px] rounded-lg border p-2 border-abu' />
                      </div>

                  </div>

                  <button type='button' onClick={setStatus} className='w-full h-[64px] bg-blue-700 text-white mt-5 rounded-lg'>Update Status</button>
              </form>
            )
          }

      </div>
  )
}

export default CheckTiket