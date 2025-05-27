import React from 'react'
import styles from './index.module.css'
import logo from '../../assets/Growell.svg'
import teamdoctor from '../../assets/bg-02.png'
import FormikLogin from '../../Component/FormikLogin'
import { Link } from 'react-router-dom'
export default function Loginadmin() {
  return (
    <div>
       <div className={styles.login + " d-flex"}>
            <div className='col-12 d-flex flex-grow-1  '>
              <div className=' col-md-6  d-none  d-md-flex flex-md-column justify-content-md-center align-items-md-center gap-5' id={styles.sectionimg}>
                <div className='mt-lg-5'>
                  <img src={logo} alt="" />
                </div>
                <div className={styles.teamdoctor}>
                  <img src={teamdoctor} alt="" />
                </div>
      
              </div>
              <div className='col-12 col-md-6 d-flex  align-items-center' id={styles.sectiondata}>
                <div className='container col-lg-9 d-flex flex-column justify-content-center align-items-baseline gap-2 '>
                  {/* <div>
                     <h3>Welcome to Laborc</h3>
                     <p className='m-0 ms-1 mt-1'>Need an account?<Link to={"/registerAdmin"} className='text-decoration-none '>Sign Up</Link> </p>
                  </div> */}
                 
                  <div className='col-12'>
                    <FormikLogin/>
                  </div>
                </div>
      
              </div>
            </div>
          </div>
    </div>
  )
}
