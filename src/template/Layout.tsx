import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Layout = () => {
  return (
    <>
    <NavBar/>
    <Container maxWidth="xl">
    <main>
        <Outlet/>
    </main> 
    </Container>
    </>
    
  )
}

export default Layout