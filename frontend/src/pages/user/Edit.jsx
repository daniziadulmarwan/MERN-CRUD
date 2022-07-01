import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function Edit() {
  const BASEURL = 'http://localhost:5000/api'
  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[gender,setGender] = useState("")

  const params = useParams()
  const navigate = useNavigate()

  useState(async() => {
    const data = await axios.get(`${BASEURL}/user/${params.id}`);
    const res = data.data;
    setName(res.data.name)
    setEmail(res.data.email)
    setGender(res.data.gender)
  },[])

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASEURL}/user/${params.id}`, {
      name, email, gender
      });
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container mt-5'>
      <div className="row justify-content-center">
        <div className="col-md-10 mt-5">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Fullname</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" autoComplete='off' />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" autoComplete='off' />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Choose Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-select">
                <option hidden>Choose One</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button onClick={handleUpdate} type='button' className='btn btn-primary rounded-1 w-100'>Update User</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit