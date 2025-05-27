import React, { useEffect } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import OnMainPage from '../../data/OnMainPage'
import axios from 'axios'

export default function MainLayout() {
    const navigat = useNavigate()
  
    useEffect(()=>{
    let token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if(token){
        axios.get('https://localhost:7071/api/DoctorHome?page=1&pageSize=10',{
          headers:
          {
            Authorization:`Bearer ${token}`
          }
        }).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          localStorage.clear()
          navigat("/login")
        })
  
      }else{
        navigat("/login")
      }
    },[navigat])
  
  return (
    <div className='col-12 h-100 d-flex flex-column justify-content-between'>
       <Nav/>
       <Outlet/>
       <OnMainPage/>
       <Footer/>
    </div>
  )
}
