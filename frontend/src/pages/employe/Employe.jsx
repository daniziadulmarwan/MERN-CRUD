import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Navbar from '../../elements/Navbar'

function Employe() {
  const BASEURL = 'http://localhost:5000/api';

  const[employe,setEmploye] = useState([])
  const[page,setPage] = useState(0)
  const[limit,setLimit] = useState(10)
  const[pages,setPages] = useState(0)
  const[rows,setRows] = useState(0)
  const[keyword,setKeyword] = useState("")
  const[query,setQuery] = useState("")

  const getAllEmploye = async () => {
    const response = await axios.get(`${BASEURL}/employe?search=${keyword}&page=${page}&limit=${limit}`)

    setEmploye(response.data.result)
    setPages(response.data.totalPage)
    setRows(response.data.totalRows)
    setPage(response.data.page)
  }

  useEffect(() => {
    getAllEmploye()
  },[page,keyword])

  const changePage = ({selected}) => {
    setPage(selected)
  }

  const searchData = (e) => {
    e.preventDefault()
    setPage(0)
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

            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {
                  employe.map((item,index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <p>Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}</p>

            <nav aria-label="Page navigation example">
                <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={pages} onPageChange={changePage} containerClassName={"pagination"} pageLinkClassName={"page-link"} previousClassName={"page-item page-link"} nextClassName={"page-link"} activeClassName={"active"} pageClassName={"page-item"} disabledClassName={'disabled'} />
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Employe