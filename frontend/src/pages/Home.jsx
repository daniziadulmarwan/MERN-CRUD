import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../elements/Navbar'

function Home() {
  const stateGlobal = useSelector(state => state)
  const dispatch = useDispatch()

  console.log(stateGlobal.users)

  useEffect(() => {
    setTimeout(() => {
      dispatch({type:'UPDATE_NAME'})
    },3000)
  }, [])

  return (
    <>
      <Navbar/>
      <div className="container mt-3">
        <h6>CRUD MERN Fullstack App</h6>
        <span>Created by <a href="https://daniziadulmarwan.github.io" target={'_blank'}>{stateGlobal.name}</a></span>
      </div>
    </>
  )
}

export default Home