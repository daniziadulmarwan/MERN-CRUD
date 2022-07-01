import {Routes, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import Home from './pages/Home'
import Student from './pages/student/Student'
import StudentCreate from './pages/student/StudentCreate'
import StudentEdit from './pages/student/StudentEdit'
import Teacher from './pages/teacher/Teacher'
import Create from './pages/user/Create'
import Edit from './pages/user/Edit'
import User from './pages/user/User'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App