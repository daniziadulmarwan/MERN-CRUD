import axios from 'axios'
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../elements/Navbar'

function Login() {
  const BASEURL = 'http://localhost:5000/api/login'
  const {alert} = useSelector(state => state.HomeReducer)
  const navigate = useNavigate()

  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[validate,setvalidate] = useState("")

  const handleLogin = async () => {
    try {
      const response = await axios.post(BASEURL, {email, password})
      if(response.data) {
        setvalidate("")
      }
      navigate('/dashboard')
      // console.log(response.data.accessToken);
    } catch (error) {
      setvalidate(error.response.data)
    }
  }

  return (
    <>
      <Navbar/>
      <div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-5">
              {alert && (<div className="alert alert-success" role="alert">{alert}</div>)}
              {validate && (<div className="alert alert-danger" role="alert">{validate.message}</div>)}
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="email" className='form-label fw-bold'>Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id='email' placeholder='Enter your email' />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className='form-label fw-bold'>Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id='password' placeholder='******' />
                    </div>

                    <button onClick={handleLogin} type="button" className='btn btn-primary w-100 border-0' style={{backgroundColor:"#14C38E"}}>Sign In</button>
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

export default Login