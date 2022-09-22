import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Demo from '../pages/Demo'
import Login from '../pages/Login'
import RegisterBike from '../pages/RegisterBike'
import SignUp from '../pages/Signup'
import Layout from './Layout'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="register-bike" element={<RegisterBike/>}/>
        </Route>
          
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default Router