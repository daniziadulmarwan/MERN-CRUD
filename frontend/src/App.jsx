import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Student from './pages/student/Student'
import StudentCreate from './pages/student/StudentCreate'
import StudentEdit from './pages/student/StudentEdit'
import Teacher from './pages/teacher/Teacher'
import Create from './pages/user/Create'
import Edit from './pages/user/Edit'
import User from './pages/user/User'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      
      <Route path='/user' element={<User />} />
      <Route path='/user/create' element={<Create />} />
      <Route path='/user/edit/:id' element={<Edit />} />

      <Route path='/student' element={<Student />} />
      <Route path='/student/create' element={<StudentCreate />} />
      <Route path='/student/edit/:id' element={<StudentEdit />} />

      <Route path='/teacher' element={<Teacher />} />
    </Routes>
  )
}

export default App