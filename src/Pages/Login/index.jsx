import React, { useRef } from 'react'
import styles from './index.module.css'
import doctor from '../../assets/Group 8742.png'
import logo from '../../assets/Growell.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function Login() {
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
      axios.post("https://localhost:7071/api/AccountAccount/Login", {
        "emailAddress": email,
        "password": pass,
        "rememberMe": remember

      }).then((res) => {
        console.log(res)
        // const token = response.headers['authorization']; // أو حسب اسم الـ header
        // console.log('Token:',res.data.id);
        if (res.data.err) {
          Swal.fire({
            icon: "error",
            text: "Wrong username or password"
          })
        } else {
          if (remember) {
            localStorage.setItem("token", res.data.data)
          } else {
            sessionStorage.setItem("token", res.data)
          }
          navigate("/")
        }
      }).catch((err) => {
        Swal.fire({
          icon: "error",
          text: "Connection problem"
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
    <div className={styles.parent + " col-12 d-flex  justify-content-between "}>
      <div className={styles.left + " col-11 col-lg-5 col-md-6 my-3  "}>
        <div className={styles["left_content"] + " container col-11 d-flex flex-column  align-items-start align-content-between justify-content-between"}>
          <img src={logo} width={180} className={styles.imglogo + " mt-md-4 ms-lg-4"} />
          <div className={styles.imgdoctor + " col-12  d-flex justify-content-center align-items-center"}>
            <img src={doctor} width={450} alt="" /></div>
        </div>

      </div>
      <div className={styles.right + " col-12 col-md-6 col-lg-6 d-flex  align-items-center"}>
        <div className='container col-12 col-md-12 col-lg-11 mt-md-5 d-flex flex-column py-md-3 mb-4 mb-lg-0 mb-md-0 gap-4'>
          <h2>LOGIN AS USER</h2>
          <form onSubmit={handelform} className='d-flex flex-column col-12 col-lg-10 col-md-11 align-content-between gap-5'>
            <input ref={(el) => (formrefs.current[0] = el)} type="text" placeholder='Username' />
            <input ref={(el) => (formrefs.current[1] = el)} type="password" placeholder='Password' />
            <div className='d-flex justify-content-between'>
              <div className='d-flex gap-2'>
                <input id='remeber' ref={(el) => (formrefs.current[2] = el)} className='form-check' type="checkbox" />
                <label htmlFor="remeber">Remember Me</label>
              </div>
              <Link className={styles["link-lab"]} to="/changpassword">Forgot Password</Link>
            </div>
            <div className='col-12 d-flex flex-column align-items-center gap-3'>
              <button type='submit' className={styles.btn1 + ' col-12 py-2 text-center'} >Login</button>
              <h5 className='text-primary'>Or</h5>
              <Link className={styles.btn2 + ' col-12 py-2 text-center'} to="/register">Register</Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
