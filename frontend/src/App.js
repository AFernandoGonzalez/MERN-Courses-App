import React from 'react'
import { Routes, Route } from 'react-router-dom'

import CoursesList from './courses/CoursesList'
import AddCourse from './courses/AddCourse'
import EditCourse from './courses/EditCourse'
import Nav from './components/Nav'
import Error from './components/Error'

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<CoursesList />} />
        <Route path='/courses/add/' element={<AddCourse />} />
        <Route path='/course/edit/:id' element={<EditCourse />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App