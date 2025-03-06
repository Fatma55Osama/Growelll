import React, { useRef } from 'react'
import styles from './index.module.css'
import logo from '../../assets/Growell.svg'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
export default function Register() {
  const formRefs = useRef([])
  const HandelRegist = (event) => {
    event.preventDefault()
    let first_name = formRefs.current[0].value
    let last_name = formRefs.current[1].value
    let address = formRefs.current[2].value
    let email = formRefs.current[3].value
    let pass = formRefs.current[4].value
    let confirm = formRefs.current[5].value
    if (!first_name || !last_name || !address || !email || !pass || !confirm) {
      Swal.fire({
        icon: "warning",
        text: "All fields are required"
      })
      return
    }
    if (pass !== confirm) {
      Swal.fire({
        icon: "warning",
        text: "Passwords do not match"
      })
      return
    }
    console.log({
      "Email": email,
      "Address": address,
      "LastName": last_name,
      "FristName": first_name,
      "Password": pass,
      "ConfirmPassword": confirm,
    });


    let params = {
      "FristName": formRefs.current[0].value,
      "LastName": formRefs.current[1].value,
      "Email": formRefs.current[3].value,
      "Address": formRefs.current[2].value,
      "Password": formRefs.current[4].value,
      "ConfirmPassword": formRefs.current[5].value,
    }
    axios.post("https://localhost:7071/api/AccountAccount/Register?", {}, {
      params: params
    }).then((res) => {

      console.log(res)
      Swal.fire({
        icon: "success",
        text: "Registration successful"
      })
    }).catch((err) => {
      console.log(err.response?.data)
      console.log(err.message)

      Swal.fire({
        icon: "error",
        text: "Error occurred"
      })
    })
  }
  return (
    <div className={styles.parent + " col-12 d-flex flex-column justify-content-center align-items-center "}>
      <div className={styles.contnetpage + " col-md-6   my-3 d-flex flex-column flex-grow-1 mt-lg-0"}>
        <div className='container col-md-12 col-lg-10  mt-3  mt-md-5 '>
          <img src={logo} alt="" />
          <h2>REGISTER AS USER</h2>
          <form onSubmit={HandelRegist} className='d-flex flex-column gap-4'>
            <input ref={(el) => (formRefs.current[0] = el)} type="text" placeholder='First Name' />
            <input ref={(el) => (formRefs.current[1] = el)} type="text" placeholder='Last Name' />
            <input ref={(el) => (formRefs.current[2] = el)} type="text" placeholder='Address' />
            <input ref={(el) => (formRefs.current[3] = el)} type="email" placeholder='Email' />
            <input ref={(el) => (formRefs.current[4] = el)} type="password" placeholder='Password' />
            <input ref={(el) => (formRefs.current[5] = el)} type="password" placeholder='Confirm Password' />
            <button type='submit' className={styles.btn + " text-center btn py-2"}>Register</button>
            <span className='text-center'>Already have an account? <Link to="/login" className={styles["link_gologin"]}> Go to Login</Link></span>


          </form>
        </div>
      </div>
    </div>
  )
}
