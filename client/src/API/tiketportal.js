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

export const createPenonton = async(data) => {
  return await api.post(`penonton`, data)
}