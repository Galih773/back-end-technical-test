import axios from "axios";

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

export const registration = async(data) => {
  return await api.post(`register`, data)
}

export const login = async(data) => {
  return await api.post(`login`, data)
}

export const logOut = async() => {
  const token = localStorage.getItem('token')
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const response = await api.post(`logout`)
  return response.data
}

export const createPenonton = async(data) => {
  return await api.post(`penonton`, data)
}

export const listPemesan = async() => {
  const token = localStorage.getItem('token')
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return await api.get(`penonton`)
}

export const hapusPemesan = async(id) => {
  const token = localStorage.getItem('token')
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return await api.delete(`penonton/${id}`)
}

export const editPemesan = async(data) => {
  const token = localStorage.getItem('token')
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return await api.post(`editPenonton`, data)
}

export const showDetail = async(id) => {
  const token = localStorage.getItem('token')
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return await api.get(`penonton/${id}`)
}

export const updateStatus = async(id) => {
  const token = localStorage.getItem('token')
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return await api.put(`penonton/${id}`)
}