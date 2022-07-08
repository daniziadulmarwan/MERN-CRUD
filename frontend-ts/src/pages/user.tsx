import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/organisems/navbar'

export default function User() {
  const user = 'Dani'
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem('user')) {
      navigate('/')
    }
  }, [])

  console.log(localStorage.getItem('user'))

  return (
    <>
      <Navbar />
      <div>User Page</div>
    </>
  )
}
