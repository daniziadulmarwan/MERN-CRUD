import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import UserList from '../../components/UserList'
import Navbar from '../../elements/Navbar'

function User() {

  const {alert} = useSelector(state => state.HomeReducer)

  return (
    <>
      <Navbar/>
      <div className='container mt-5'>
        <div className="row justify-content-center">
          <div className="col-md-10 mt-5">
            <Link to={'/user/create'} className="btn btn-primary rounded-1 mb-4">Add New User</Link>
            {/* ALERT */}
            {alert && (<div className="alert alert-success" role="alert">{alert}</div>)}
            {/* ALERT */}
            <UserList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default User