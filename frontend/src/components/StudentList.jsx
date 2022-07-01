import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const StudentList = () => {
  const BASEURL = 'http://localhost:5000/api/student';
  const[students, setStudents] = useState([])

  const MySwal = withReactContent(Swal)

  const getAllUser = async () => {
    const response = await axios.get(BASEURL);
    setStudents(response.data.data)
  }

  useEffect(() => {
    getAllUser()
  },[])

  const deleteData = async (id) => {
    try {
      await axios.delete(`${BASEURL}/${id}`)
      getAllUser()
      MySwal.fire({
        title:'Data has been deleted',
        icon:'success'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const studentDelete = (id) => {
    MySwal.fire({
      title: 'Are you  sure ?',
      icon:'warning',
      showCancelButton:true,
      showConfirmButton:true,
      confirmButtonText:'Yes, delete it!',
      cancelButtonText:'No, cancel!',
      confirmButtonColor: '#14C38E',
      cancelButtonColor: '#F32424'
    }).then((value) => {
      if(value.isConfirmed) {
        deleteData(id);
      }
    })
  }

  return (
    <div className='row'>
      {/* CARD */}
      {
        students.map((item,index) => {
          return (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100" >
                <img src={item.url} className="card-img-top" alt="kbjgx" />
                <div className="card-body">
                  <div className='d-flex justify-content-between'>
                    <h5 className="card-title">{item.name}</h5>
                    <small className="text-muted">{
                      <ReactTimeAgo date={new Date(item.createdAt)} />
                    }</small>
                  </div>
                </div>
                <div className="card-footer text-center">
                  <Link to={'/student/edit/' + item.id} className='btn btn-primary rounded-0'>Updated</Link>
                  <button type='button' onClick={() => studentDelete(item.id)} className='btn btn-danger rounded-0'>Delete</button>
                </div>
              </div>
            </div>
          )
        })
      }
      {/* CARD */}
    </div>
  )
}

export default StudentList