import React, { useEffect } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import OnMainPage from '../../data/OnMainPage'
import axios from 'axios'
import { getData } from '../../data/Repo/getData'
import { usedomain } from '../../Store'

export default function MainLayout() {
  const navigat = useNavigate()
  const { domain } = usedomain()

  useEffect(() => {
    let token = localStorage.getItem("token") || sessionStorage.getItem("token");
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
    if (token) {
      getData.get_profile(domain, token)
        .then(res => {
          console.log("userprofiletoken", res);
        }).catch((err) => {
          localStorage.clear()
          navigat("/login")
        })

    }
    if (tokenDoctor) {
      getData.get_profileDoctor(domain, tokenDoctor).then((res) => {
        console.log("DoctorPtofile", res);
        // navigat('/question')
      }).catch((err) => {
        localStorage.clear()
        navigat("/loginadmin")
      })
    }
    if (!token && !tokenDoctor) {
      navigat("/login"); 
    }
  }, [navigat,domain])
 console.log(domain)
  return (
    <div className='col-12 h-100 d-flex flex-column justify-content-between'>
      <Nav />
      <Outlet />
      <OnMainPage />
      <Footer />
    </div>
  )
}
