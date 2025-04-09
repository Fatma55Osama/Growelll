import React from 'react'
import Nav from '../Nav'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='col-12 h-100 d-flex flex-column justify-content-between'>
       <Nav/>
       <Outlet/>
       <Footer/>
    </div>
  )
}
