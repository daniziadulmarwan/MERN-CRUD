import axios from 'axios'
import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UserList = () => {
  const BASEURL = 'http://localhost:5000/api'

  const MySwal = withReactContent(Swal)

  const dispatch = useDispatch()
  const {UserReducer} = useSelector(state => state)

  useEffect(() => {
    getAllUser()
  }, [])
  
  const getAllUser = async () => {
    const response = await axios.get(`${BASEURL}/user`);
    const datas = response.data;
    dispatch({type:'UPDATE_USER', payload: datas.data})
  }

  const deleteData = async (id) => {
    await axios.delete(`${BASEURL}/user/${id}`);
    getAllUser()
    MySwal.fire({
      title:'Data has been deleted',
      icon:'success'
    })
  }

  const handleDelete = (e,id) => {
    e.preventDefault()
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
    <table className="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Gender</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {
          UserReducer.users.map((user, index) => {
            return (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <Link to={'/user/edit/' + user.id} className='btn btn-success rounded-0'>Edit</Link>
                  <button type='button' onClick={(e) => handleDelete(e,user.id)} className='btn btn-danger rounded-0'>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default UserList