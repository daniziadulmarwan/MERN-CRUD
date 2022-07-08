import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../components/organisems/user-card'
import Navbar from '../elements/navbar'

const date = new Date()

const datas = [
  {id:1,title:'Title One', body: 'Body One', footer: 'Footer One', date: date.getFullYear()},
  {id:2,title:'Title Two', body: 'Body Two', footer: 'Footer Two', date: date.getFullYear()},
  {id:3,title:'Title Three', body: 'Body Three', footer: 'Footer Three', date: date.getFullYear()},
]

const envi = import.meta.env.VITE_NAME

function Home() {
  const {HomeReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch({type:"UPDATE_NAME"})
    },3000)
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h6>CRUD MERN Fullstack App</h6>
        <span>Created by <a href="https://daniziadulmarwan.github.io" target={'_blank'}>{HomeReducer.name}</a></span>
      </div>

      <div className="container mt-4">
        <div className="row">
          {
            datas.map(data => (
              <UserCard key={data.id} title={data.title} body={data.body} footer={data.footer} date={data.date} />
            ))
          }
        </div>
      </div>

      <p>{envi}</p>
    </>
  )
}

export default Home