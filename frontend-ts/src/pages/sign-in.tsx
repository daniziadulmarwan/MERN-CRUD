import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from '../configs/axios'
import Navbar from "../elements/navbar"

export default function SignIn() {
  // const selector:any = useSelector(state => state)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  const signin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // const res = await axios.post('/login', {email,password})
    localStorage.setItem('user', email)
    navigate('/user')
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Form Sign In</div>
              <div className="card-body">
                <form onSubmit={signin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="form-control" id="email" autoComplete="off" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="password" />
                  </div>

                  <button className="btn btn-dark rounded-1 w-100">Sign In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}