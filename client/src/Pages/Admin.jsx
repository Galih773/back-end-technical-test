import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { editPemesan, hapusPemesan, listPemesan } from '../API/tiketportal';

const Admin = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [umur, setUmur] = useState('');
  const [alamat, setAlamat] = useState('');
  const [nomor, setNomor] = useState('');
  const [id, setId] = useState('');
  const [pemesan, setPemesan] = useState(null);
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  useEffect(()=> {
      if(!localStorage.getItem('token')){
          navigate('/login')
      }
      listPemesan().then(res => {
        console.log(res.data)
        setPemesan(res.data.penonton)
      })
  },[])

  const logoutHandler = () => {
    logOut().then(res => {
      console.log(res)
      localStorage.removeItem("token")
      navigate('/login')
    })
  }

  const submitEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('id', id)
    formData.append('nama', nama);
    formData.append('email', email);
    formData.append('umur', umur);
    formData.append('alamat', alamat);
    formData.append('no_telp', nomor);

    console.log(formData)

    editPemesan( formData).then(res => {
      console.log(res.data)
      setPemesan( res.data.penonton)
      cancelEdit()
    }).catch(err => {
      console.log(err.response.data)
    })

  }

  const cancelEdit = () => {
    setNama('')
    setAlamat('')
    setEmail('')
    setNomor('')
    setUmur('')
    setId('')
    setEdit(false)
  }

  const editHandler = (id) => {
    let customer = pemesan.find(pemesan => pemesan.id === id)
    setNama(customer.nama)
    setAlamat(customer.alamat)
    setEmail(customer.email)
    setNomor(customer.no_telp)
    setUmur(customer.umur)
    setId(customer.id)
    setEdit(true)
  }

  const deleteHandler = (id) => {
    hapusPemesan(id).then(res => {
      console.log(res.data)
      setPemesan( pemesan.filter(pemesan => pemesan.id !== id) )
      cancelEdit()
    }).catch(err => {
      console.log(err.response.data)
    })
  }

  return (
      <div className='bg-[#FAFAFA] w-[100%] min-h-[100vh] pb-3'>
          <div className='px-16 pt-9 flex justify-between items-center'>
              <NavLink to="/admin" className="font-medium text-4xl">
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

          <div className="mt-10 w-full min-h-[670px] px-8 py-10 flex justify-around ">
            <div className='w-[60%] rounded-lg overflow-x-auto'>
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
                              <span>action</span>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        pemesan != null ? (
                          pemesan.map((item, index) => (
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
                                <td className="px-6 py-4 text-left flex justify-between">
                                    <a href="#" onClick={()=>editHandler(item.id)} className="font-medium text-blue-600 hover:underline">Edit</a>
                                    <a href="#" onClick={()=>deleteHandler(item.id)} className="font-medium text-blue-600 hover:underline">Hapus</a>
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

            <form onSubmit={submitEdit} className="w-[670px] min-h-[670px] px-8 py-10 flex flex-col justify-between bg-white rounded-lg">
                <div className='mb-5'>
                    <h1 className='text-4xl font-medium'>Edit Data Pemesan</h1>
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
                {
                  edit ? 
                  (
                    <div className='w-full h-[64px] flex justify-between'>
                      <button type='button' onClick={cancelEdit} className='w-[45%] h-full bg-red-600 text-white mt-5 rounded-lg'>Cancel</button>
                      <button type='submit' className='w-[45%] h-full bg-yellow-400 text-white mt-5 rounded-lg'>Edit</button>
                    </div>
                  ) : 
                  <></>
                }
                
            </form>
          </div>


          
      </div>
  )
}

export default Admin