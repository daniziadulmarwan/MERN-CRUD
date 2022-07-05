import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import AuthNavbar from '../../elements/AuthNavbar'

function Dashboard() {
  const BASEURL = 'http://localhost:5000/api'
  const[name,setName] = useState("")
  const[token,setToken] = useState("")
  const[expire,setExpire] = useState("")
  const[users,setUsers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getRefreshToken()
    handleGetUser()
  }, [])

  const getRefreshToken = async () => {
    try {
      const response = await axios.get(`${BASEURL}/token`)
      setToken(response.data.newAccessToken)
      const decodedToken = jwtDecode(response.data.newAccessToken)
      setName(decodedToken.name)
      setExpire(decodedToken.exp)
    } catch (error) {
      if(error.response) {
        navigate('/login')
      }
    }
  }

  const axiosJwt = axios.create()

  axiosJwt.interceptors.request.use(async (config) => {
    const currentDate = new Date()

    if(expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(`${BASEURL}/token`)
      config.headers.Authorization = `Bearer ${response.data.newAccessToken}`
      setToken(response.data.newAccessToken)
      const decodedToken = jwtDecode(response.data.newAccessToken)
      setName(decodedToken.name)
      setExpire(decodedToken.exp)
    }

    return config
  }, (error) => {
    return Promise.reject(error)
  })

  const handleGetUser = async () => {
    try {
      const response = await axiosJwt.get(`${BASEURL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsers(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <AuthNavbar />
      <div className="container mt-3">
        <h6>CRUD MERN Fullstack App</h6>
        <p>Welcome: <span className='fw-bold'>{name}</span></p>

        <button onClick={handleGetUser} type='button' className='btn btn-primary'>Get Users</button>
      
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((u,i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dashboard