import axios from 'axios'
import React,{ useState,useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Navbar from '../../elements/Navbar'

function Teacher() {
  const BASEURL = 'http://localhost:5000/api/teacher'

  const[teacher,setTeacher] = useState([])
  const[lastId,setLastId] = useState(0)
  const[tempId,setTempId] = useState(0)
  const[limit,setLimit] = useState(20)
  const[keyword,setKeyword] = useState("")
  const[query,setQuery] = useState("")
  const[hasMore,setHasMore] = useState(true)

  const getAllUser = async () => {
    const response = await axios.get(`${BASEURL}?search_query=${keyword}&last_id=${lastId}&limit=${limit}`);
    const teacherResult = response.data.result
    setTeacher([...teacher,...teacherResult])
    setTempId(response.data.lastId)
    setHasMore(response.data.hasMore)
  }

  useEffect(() => {
    getAllUser()
  },[lastId,keyword])

  const fetchMore = () => {
    setLastId(tempId)
    console.log('Running...')
  }

  const searchData = (e) => {
    e.preventDefault()
    setLastId(0)
    setTeacher([])
    setKeyword(query)
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="col-md-12">

          {/* TODO::SEARCH */}
            <form onSubmit={searchData} className="input-group mb-3">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Enter keyword..." />
              <button className="btn btn-outline-success" type="submit" id="button-addon2">Search</button>
            </form>
          {/* TODO::SEARCH */}

          {/* TODO::TABLE */}
          <InfiniteScroll dataLength={teacher.length} next={fetchMore} hasMore={hasMore} loader={<p>Loading...</p>}>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {
                  teacher.map((item,index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <th>{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.email.toLowerCase()}</td>
                      <td>{item.phone}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </InfiniteScroll>
          {/* TODO::TABLE */}


          </div>
        </div>
      </div>
    </>
  )
}

export default Teacher