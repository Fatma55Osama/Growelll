import React from 'react'
import styles from './index.module.css'
import logo from '../../assets/Growell.svg'
import teamdoctor from '../../assets/bg-02.png'
import FormRegister from '../../Component/FromRegister'
import { Link } from 'react-router-dom'
export default function Registeradmin() {
  return (
    <div className={styles.register + " d-flex"}>
      <div className='col-12 d-flex flex-grow-1  '>
        <div className=' col-md-6  d-none  d-md-flex flex-md-column justify-content-md-center align-items-md-center gap-5' id={styles.sectionimg}>
          <div className='mt-lg-5' id={styles.logodiv}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.teamdoctor}>
            <img src={teamdoctor} alt="" />
          </div>

        </div>
        <div className='col-12 col-md-6 d-flex  align-items-center' id={styles.sectiondata}>
          <div className='container col-lg-9 d-flex flex-column justify-content-center align-items-baseline gap-2'>
            {/* <div className='bg-danger  d-flex flex-column align-items-start'>
               <h3>Sign Up</h3>
            <span>Enter details to create your account</span>
            </div> */}
 
            <div className='col-12'>
              <FormRegister/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
