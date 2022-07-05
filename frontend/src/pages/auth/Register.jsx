import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Navbar from '../../elements/navbar'

function Register() {
  const BASEURL = 'http://localhost:5000/api'
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[confirmPassword,setConfirmPassword] = useState("")
  
  const[nameValidate,setNameValidate] = useState([])
  const[emailValidate,setEmailValidate] = useState([])
  const[passValidate,setPassValidate] = useState([])
  const[confPassValidate,setConfPassValidate] = useState([])

  const handleRegister = async () => {
    try {
      await axios.post(`${BASEURL}/register`, {
        name, email, password, confirmPassword
      })
      dispatch({type: "ALERT", payload: "Berhasil register"})
      navigate('/login')
    } catch (error) {
      let nameErrors = [];
      let emailErrors = [];
      let passErrors = [];
      let confPassErrors = [];
      if(error) {
        error.response.data.error.map(e => {
          if(e.param === 'name') {
            nameErrors.push(e)
          }
          if(e.param === 'email') {
            emailErrors.push(e)
          }
          if(e.param === 'password') {
            passErrors.push(e)
          }
          if(e.param === 'confirmPassword') {
            confPassErrors.push(e)
          }
        })
        setNameValidate(nameErrors)
        setEmailValidate(emailErrors)
        setPassValidate(passErrors)   
        setConfPassValidate(confPassErrors)    
      }
    }
  }

  return (
    <>
    <Navbar />
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className='form-label fw-bold'>Nama Lengkap</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id='name' placeholder='Enter your name' autoComplete='off' />
                    {nameValidate.map((v,i) => (
                        i === 0 && <small key={i} className='text-danger'>{v.msg}</small>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className='form-label fw-bold'>Alamat Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id='email' placeholder='Enter your email' autoComplete='off' />
                    {emailValidate.map((v,i) => (
                        i === 0 && <small key={i} className='text-danger'>{v.msg}</small>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className='form-label fw-bold'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id='password' placeholder='******' />
                    {passValidate.map((v,i) => (
                        i === 0 && <small key={i} className='text-danger'>{v.msg}</small>
                    ))}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className='form-label fw-bold'>Password Confirmation</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" id='confirmPassword' placeholder='******' />
                    {confPassValidate.map((v,i) => (
                        i === 0 && <small key={i} className='text-danger'>{v.msg}</small>
                    ))}
                  </div>

                  <button type='button' onClick={handleRegister} className='btn btn-primary w-100 border-0' style={{backgroundColor:"#14C38E"}}>Sign In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Register