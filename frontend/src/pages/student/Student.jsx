import React from 'react'
import {Link} from 'react-router-dom'
import StudentList from '../../components/StudentList'
import Navbar from '../../elements/Navbar'

function Student() {
  return (
    <>
    <Navbar />
    <div className='container mt-5'>
        <Link to={'/student/create'} className="btn btn-success mb-3">Create New Student</Link>
          <StudentList/>
    </div>
    </>
  )
}

export default Student