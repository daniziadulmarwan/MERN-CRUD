import axios from 'axios'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

function UserAdd() {
  const navigate = useNavigate()
  const BASEURL = 'http://localhost:5000/api'

  const dispatch = useDispatch()

  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[gender,setGender] = useState("")

  const[validate,setValidate] = useState([])

  const clearForm = () => {
    setName("")
    setEmail("")
    setGender("")
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${BASEURL}/user`, {
        name,email,gender
      })
      clearForm()
      dispatch({type:"ALERT", payload:"Berhasil create data"})
      navigate('/user')
    } catch (error) {
      setValidate(error.response.data.error)
    }
  }

  return (
    <>
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Fullname</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" autoComplete='off' />
        {
          validate?.map((v,index) => {
            if(v.param === 'name') {
              return <small key={index} className='text-danger'>{v.msg}</small>
            }
          })
        }
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" autoComplete='off' />
        {
          validate?.map((v,index) => {
            if(v.param === 'email') {
              return <small key={index} className='text-danger d-block'>{v.msg}</small>
            }
          })
        }
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Choose Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-select">
          <option hidden value="">Choose One</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {
          validate?.map((v,index) => {
            if(v.param === 'gender') {
              return <small key={index} className='text-danger'>{v.msg}</small>
            }
          })
        }
      </div>
      <button type='button' onClick={handleSubmit} className='btn btn-primary rounded-1 w-100'>Create User</button>
    </form>

    <div className='text-center mt-5'>
      <Link to={"/user"} className="btn btn-link">Back To Previous</Link>
    </div>
    </>
  )
}

export default UserAdd