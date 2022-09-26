import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import RegisterBike from '../pages/bikeListing/RegisterBike'
import SignUp from '../pages/Signup'
import Layout from './Layout'
import RegisterBike2 from '../pages/bikeListing/RegisterBike-2'
import RegisterBike3 from '../pages/bikeListing/RegisterBike-3'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="register-bike" element={<RegisterBike/>}/>
          <Route path='register-bike/page2' element={<RegisterBike2/>}/>
          <Route path='register-bike/page3' element={<RegisterBike3/>}/>
        </Route> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default Router