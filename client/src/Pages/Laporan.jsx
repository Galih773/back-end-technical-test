import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { listPemesan, logOut } from '../API/tiketportal';

const Laporan = () => {
  const [penonton, setPenonton] = useState(null);
  
  const navigate = useNavigate();

  useEffect(()=> {
      if(!localStorage.getItem('token')){
          navigate('/login')
      }
      listPemesan().then(res => {
        console.log(res.data)
        setPenonton(res.data.penonton)
      }).catch(err => {
        if(err.response.data.message === "Unauthenticated.") {
          localStorage.removeItem('token')
          navigate('/login')
        }
      })
  },[])

  const logoutHandler = () => {
    logOut().then(res => {
      console.log(res)
      localStorage.removeItem("token")
      navigate('/login')
    }).catch(err => {
      console.log(err.response.data)
      localStorage.removeItem("token")
      navigate('/login')
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

          <div className="mx-auto my-8 w-[60%] gap-7 px-8 py-10 flex flex-col justify-between bg-white rounded-lg overflow-x-auto">
            <h1 className='text-4xl mb-10'>Table Laporan</h1>
            <table className="w-full h-fit text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-400 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Fullname
                            </th>
                            <th scope="col" className="px-6 py-3">
                                email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No. HP
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Umur
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TiketID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          penonton != null ? (
                            penonton.map((item, index) => (
                              <tr key={index} className="bg-white border-b  hover:bg-gray-50 ">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                      {item.nama}
                                  </th>
                                  <td className="px-6 py-4">
                                      {item.email}
                                  </td>
                                  <td className="px-6 py-4">
                                      {item.no_telp}
                                  </td>
                                  <td className="px-6 py-4">
                                      {item.umur}
                                  </td>
                                  <td className="px-6 py-4">
                                      {item.kode_tiket}
                                  </td>
                                  <td className={`px-6 py-4 ${item.status === "unchecked" ? "text-red-600" : "text-blue-700"}`}>
                                      {item.status}
                                  </td>
                              </tr>
                            ))
                          ):
                          (
                            <tr className="bg-white border-b  hover:bg-gray-50 ">
                              <td className="px-6 py-4">Tidak ada data</td>
                            </tr>
                          )
                        }
                    </tbody>
                </table>
          </div>

      </div>
  )
}

export default Laporan