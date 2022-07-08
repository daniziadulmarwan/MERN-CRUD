import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignIn from '../pages/sign-in'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
    </Routes>
  )
}
