import { Routes, Route } from 'react-router-dom'
import NotFound from '../pages/404'
import SignIn from '../pages/sign-in'
import User from '../pages/user'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/user' element={<User />} />
      <Route path='*' element={<NotFound />} /> 
    </Routes>
  )
}
