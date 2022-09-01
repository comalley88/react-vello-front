import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Demo from '../pages/Demo'
import Login from '../pages/Login'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Demo/>}/>
        <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Router