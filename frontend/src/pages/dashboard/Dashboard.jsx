import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import AuthNavbar from '../../elements/AuthNavbar'
import axios from 'axios'

function Dashboard() {
  const[name,setName] = useState("")
  const[token,setToken] = useState("")
  const[expire,setExpire] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    getRefreshToken()
  }, [])

  const getRefreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/token')
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

  return (
    <>
      <AuthNavbar />
      <div className="container mt-3">
        <h6>CRUD MERN Fullstack App</h6>
        <p>Welcome: <span className='fw-bold'>{name}</span></p>
      </div>
    </>
  )
}

export default Dashboard