import React,{useState} from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const[open,setOpen] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>CRUD MERN</Link>
        <button onClick={() => setOpen(!open)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${open ? 'd-block' : ''}`} id="navbarNavAltMarkup">
          {/* <div className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to={'/'}>Home</NavLink>
            <NavLink className="nav-link" to={'/user'}>Users</NavLink>
            <NavLink className="nav-link" to={'/student'}>Students</NavLink>
            <NavLink className="nav-link" to={'/teacher'}>Teachers</NavLink>
            <NavLink className="nav-link" to={'/employe'}>Employe</NavLink>
          </div> */}

          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to={'/login'}>Login</NavLink>
            <NavLink className="nav-link" to={'/register'}>Register</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar