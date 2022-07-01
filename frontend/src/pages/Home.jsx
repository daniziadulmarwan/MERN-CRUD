import React from 'react'
import Navbar from '../elements/Navbar'

function Home() {
  return (
    <>
      <Navbar/>
      <div className="container mt-3">
        <h6>CRUD MERN Fullstack App</h6>
        <span>Created by <a href="https://daniziadulmarwan.github.io" target={'_blank'}>Zeiteim Tech</a></span>
      </div>
    </>
  )
}

export default Home