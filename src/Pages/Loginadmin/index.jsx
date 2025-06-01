import React, { useRef } from 'react'
import styles from './index.module.css'
import logo from '../../assets/Growell.svg'
import teamdoctor from '../../assets/appointment.jpeg.png'
import FormikLogin from '../../Component/FormikLogin'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
export default function Loginadmin() {
  const navigate = useNavigate()
  const formrefs = useRef([])
  // "id": 0,
  // "emailAddress": "user@example.com",
  // "password": "stringst",
  // "rememberMe": true
  const handelform = (event) => {
    event.preventDefault()
    let email = formrefs.current[0].value
    let pass = formrefs.current[1].value
    let remember = formrefs.current[2].checked
    if (!email || !pass) {
      Swal.fire({
        icon: "warning",
        text: "All fields are required"
      })
      return
    }
    if (email && pass) {
      axios.post("https://localhost:7071/api/AccountDoctor/login", {
        "email": email,
        "password": pass,
        "rememberMe": remember

      }).then((res) => {
        console.log(res)
        const token = res.data.token;
        console.log('tokenDoctor:', res.data.token);
        if (res.data.err) {
          Swal.fire({
            icon: "error",
            text: "Wrong username or password"
          })
        } else {
          if (remember) {
            localStorage.setItem("tokenDoctor", res.data.token)
          } else {
            sessionStorage.setItem("tokenDoctor", res.data.token)
          }
          Swal.fire({
            icon: "success",
            text: "Password changed successfully"
          })
          navigate("/question")
        }
      }).catch((err) => {
        Swal.fire({
          icon: "error",
          text: "Wrong username or password"
        })
      })
    } else {
      Swal.fire({
        icon: "error",
        text: "Wrong username or password"
      })
    }
  }
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
            <div className='container col-lg-10 d-flex flex-column justify-content-center align-items-baseline gap-2 '>
              {/* <div>
                     <h3>Welcome to Laborc</h3>
                     <p className='m-0 ms-1 mt-1'>Need an account?<Link to={"/registerAdmin"} className='text-decoration-none '>Sign Up</Link> </p>
                  </div> */}

              <div className='col-12'>
                <div className={styles.right + " col-12 col-md-6 col-lg-12 d-flex  align-items-center"}>
                  <div className='container col-12 col-md-12 col-lg-12 mt-md-5 d-flex flex-column py-md-3 mb-4 mb-lg-0 mb-md-0 gap-4'>
                    <h2>LOGIN</h2>
                    <form onSubmit={handelform} className='d-flex flex-column col-12 col-lg-10 col-md-11 align-content-between gap-5'>
                      <input ref={(el) => (formrefs.current[0] = el)} type="text" placeholder='Username' />
                      <input ref={(el) => (formrefs.current[1] = el)} type="password" placeholder='Password' />
                      <div className='d-flex justify-content-between'>
                        <div className='d-flex gap-2'>
                          <input id='remeber' ref={(el) => (formrefs.current[2] = el)} className='form-check' type="checkbox" />
                          <label htmlFor="remeber">Remember Me</label>
                        </div>
                        {/* <Link className={styles["link-lab"]} to="/changdoctorpassword">Forgot Password</Link> */}
                      </div>
                      <div className='col-12 d-flex flex-column align-items-center gap-3'>
                        <button type='submit' className={styles.btn1 + ' col-12 py-2 text-center btn-primary'} >Login</button>
                        <h5 className='text-primary'>Or</h5>
                        <Link className={styles.btn2 + ' col-12 py-2 text-center'} to="/registeradmin2">Register</Link>
                      </div>
                    </form>

                  </div>
                </div>                  </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
