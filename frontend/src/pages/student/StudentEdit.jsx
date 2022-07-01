import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

function StudentEdit() {
  const BASEURL = 'http://localhost:5000/api/student';
  const params = useParams()

  const[name,setName] = useState("")
  const[image,setImage] = useState("")
  const[preview,setPreview] = useState("")

  const navigate = useNavigate()

  const imagePreview = (e) => {
    const img = e.target.files[0]
    setImage(img)
    setPreview(URL.createObjectURL(img))
  }

  const getDataById = async () => {
    const student = await axios.get(`${BASEURL}/${params.id}`)
    const res = student.data.data
    setName(res.name)
    setImage(res.image)
    setPreview(res.url)
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', image)
    try {
      await axios.put(`${BASEURL}/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      navigate('/student')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataById()
  },[])


  return (
    <div className='container mt-5'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className='form-label'>Student Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control' id='name' autoComplete='off' />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Default file input example</label>
              <input className="form-control" type="file" id="formFile" onChange={imagePreview} />
            </div>

            <div className='mb-4'>
              {
                preview ? (
                  <img src={preview} className="img-thumb" height={200} />
                ) : ("")
              }
            </div>

            <button type='button' onClick={handleUpdate} className='btn btn-success w-100'>Update Student</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudentEdit