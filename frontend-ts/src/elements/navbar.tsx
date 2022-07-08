import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const[open,setOpen] = useState(false)
  const navigate = useNavigate()

  const signout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>CRUD MERN</Link>
        <button onClick={() => setOpen(!open)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${open ? 'd-block' : ''}`} id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to={'/'}>Home</NavLink>
            <NavLink className="nav-link" to={'/user'}>Users</NavLink>
            {/* <NavLink className="nav-link" to={'/student'}>Students</NavLink>
            <NavLink className="nav-link" to={'/teacher'}>Teachers</NavLink>
            <NavLink className="nav-link" to={'/employe'}>Employe</NavLink> */}

          </div>
          <div className="navbar-nav ms-auto">
            {/* <NavLink className="nav-link" to={'/signout'}>Sign out</NavLink> */}
            <button onClick={signout} className='nav-link border-0 bg-light'>Signout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
