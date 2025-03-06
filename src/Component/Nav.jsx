import React from 'react'
import './together.scss'
import logo from '../assets/Growell.svg'
import { Link } from 'react-router-dom'
import frame from '../assets/Frame 8745.svg'
import { atom, useRecoilState } from 'recoil'; 


export default function Nav() {
  return (
    <div>
          {/* start nav par bg-white of figma */}

              <div className=' allnavsuccess col-12  py-3 '>
                <div className='navpar col-11 col-md-9 bg-white container mt-3 d-flex flex-row align-items-center justify-content-between py-1'>
                  <div className='logonav ms-md-5'> <img src={logo} width="120px" height="48px" alt="" /></div>
                  <div className='col-8 col-md-6 me-lg-5' >
                    <nav className=' d-flex flex-row justify-content-between me-md-3'>
                      <Link className='nav-link me-lg-3' to="/Contact">Contact</Link>
                      <Link  className='nav-link  me-lg-3'   to="/Event">Events</Link>
                      <Link  className='nav-link  me-lg-3' to="/Finddoctor">Find Doctor</Link>
                      <Link  className='nav-link  me-lg-5' to="/">Home</Link>
                      <li><img src={frame} width="36px" height="20px" /></li>
                    </nav>
                  </div>
                </div>
              </div>

              {/* end nav par bg-white of figma */}
    </div>
  )
}
