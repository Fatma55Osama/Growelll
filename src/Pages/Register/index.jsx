import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import logo from '../../assets/Growell.svg'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
export default function Register() {
  const formRefs = useRef([])
  const [errors, setErrors] = useState({});
  const HandelRegist = (event) => {
    event.preventDefault()
    let first_name = formRefs.current[0].value
    let last_name = formRefs.current[1].value
    let address = formRefs.current[2].value
    let email = formRefs.current[3].value
    let pass = formRefs.current[4].value
    let confirm = formRefs.current[5].value
    let phone = formRefs.current[6].value
    let gender = formRefs.current[7].value
    if (!first_name || !last_name || !address || !email || !pass || !confirm || !phone || !gender ) {
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
      "PhoneNumber": phone,
      "Password": pass,
      "ConfirmPassword": confirm,
    });


    // let params = {
    //   "FristName": formRefs.current[0].value,
    //   "LastName": formRefs.current[1].value,
    //   "Email": formRefs.current[3].value,
    //   "Address": formRefs.current[2].value,
    //   "Password": formRefs.current[4].value,
    //   "ConfirmPassword": formRefs.current[5].value,
    // }
    const formData = new FormData();
    formData.append("FristName", first_name);
    formData.append("LastName", last_name);
    formData.append("Email", email);
    formData.append("Address", address);
    formData.append("PhoneNumber", phone)
    formData.append("Password", pass);
    formData.append("ConfirmPassword", confirm);
    formData.append("Gender", gender);
    axios.post("https://localhost:7071/api/Account/Register", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {

      console.log(res)
      Swal.fire({
        icon: "success",
        text: "Registration successful"
      })
      setErrors('')
    }).catch((err) => {
      const apiErrors = err.response?.data || {};
      if (apiErrors && apiErrors.errors) {
        setErrors(apiErrors.errors);
      } else {
        Swal.fire({
          icon: "error",
          text: "Error occurred"
        });
      }
    })
  }
  return (
    <div className={styles.parent + " col-12 d-flex flex-column justify-content-center align-items-center "}>
      <div className={styles.contnetpage + " col-md-6   my-3 d-flex flex-column flex-grow-1 mt-lg-0"}>
        <div className='container col-md-12 col-lg-10  mt-3  mt-md-4 '>
          <img src={logo} alt="" />
          <h2>REGISTER </h2>
          <form onSubmit={HandelRegist} className='d-flex flex-column gap-4'>
            <input ref={(el) => (formRefs.current[0] = el)} type="text" placeholder='First Name' />
            {errors.FristName && <div className="text-danger">{errors.FristName[0]}</div>}
            <input ref={(el) => (formRefs.current[1] = el)} type="text" placeholder='Last Name' />
            {errors.LastName && <div className="text-danger">{errors.LastName[0]}</div>}

            <input ref={(el) => (formRefs.current[2] = el)} type="text" placeholder='Address' />
            {errors.Address && <div className="text-danger">{errors.Address[0]}</div>}

            <input ref={(el) => (formRefs.current[3] = el)} type="email" placeholder='Email' />
            {errors.Email && <div className="text-danger">{errors.Email[0]}</div>}

            <input ref={(el) => (formRefs.current[6] = el)} type="Phone" placeholder='Phone' />
            {errors.PhoneNumber && <div className="text-danger">{errors.PhoneNumber[0]}</div>}
            <div>
              <label className="me-3">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) => (formRefs.current[7] = { value: e.target.value })}
                />Female
              </label>
              <label className="ms-3">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => (formRefs.current[7] = { value: e.target.value })}
                /> Male
              </label>
            </div>
            {errors.gender && <div className="text-danger">{errors.gender[0]}</div>}


            <input ref={(el) => (formRefs.current[4] = el)} type="password" placeholder='Password' />
            {errors.Password && <div className="text-danger">{errors.Password[0]}</div>}

            <input ref={(el) => (formRefs.current[5] = el)} type="password" placeholder='Confirm Password' />
            {errors.ConfirmPassword && <div className="text-danger">{errors.ConfirmPassword[0]}</div>}
            <button type='submit' className={styles.btn + " text-center btn py-2"}>Register</button>
            <span className='text-center'>Already have an account? <Link to="/login" className={styles["link_gologin"]}> Go to Login</Link></span>


          </form>
        </div>
      </div>
    </div>
  )
}
