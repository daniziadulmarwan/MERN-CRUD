import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../elements/navbar'

function Home() {
  const {HomeReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch({type:"UPDATE_NAME"})
    },3000)
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h6>CRUD MERN Fullstack App</h6>
        <span>Created by <a href="https://daniziadulmarwan.github.io" target={'_blank'}>{HomeReducer.name}</a></span>
      </div>
    </>
  )
}

export default Home