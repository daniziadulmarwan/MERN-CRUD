import { Routes, Route } from 'react-router-dom'
import NotFound from '../pages/404'
import SignIn from '../pages/sign-in'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='*' element={<NotFound />} /> 
    </Routes>
  )
}
