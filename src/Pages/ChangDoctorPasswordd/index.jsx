import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import logo from '../../assets/Growell.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { usedomain } from '../../Store'
import Swal from 'sweetalert2'

export default function ChangDoctorPasswordd() {
    const formrefs = useRef([])
    const { domain } = usedomain()
    const navigate = useNavigate()
    const [error, setError] = useState('');


    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    const handelchange = (event) => {
        event.preventDefault()
        let email = formrefs.current[0].value
        let oldpass = formrefs.current[1].value
        let newpass = formrefs.current[2].value
        if (!email || !oldpass || !newpass) {
            Swal.fire({
                icon: "warning",
                text: "All fields are required"
            })
            return
        }
        axios.put(`${domain}/api/AccountDoctor/change-password`, {
            "email": email,
            "oldPassword": oldpass,
            "newPassword": newpass
        }, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`
            }
        })
            .then((res) => {
                console.log(res)
                Swal.fire({
                    icon: "success",
                    text: "Password changed successfully"
                })
                navigate('/loginadmin')
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    const validationErrors = err.response.data.errors;
                    if (validationErrors) {
                        console.log("Validation errors:", validationErrors);
                        setError(validationErrors);
                    } else {
                        setError({ general: [err.response.data.message || "Unknown error occurred"] });
                    }
                }
                console.log(err.response?.data)
                console.log(err.message)

                Swal.fire({
                    icon: "error",
                    text: "Field Change Password"
                })
            })


    }
    return (
        <div className={styles.parentall + " col-12 d-flex flex-column justify-content-center align-items-center "}>
            <div className={styles.contnetpage + " col-md-6   my-3 d-flex flex-column justify-content-center flex-grow-1"}>
                <div className='container col-11 col-md-12 col-lg-10  '>
                    <img src={logo} alt="" />
                    <h2>CHANGE PASSWORD Doctor</h2>
                    <form className='d-flex flex-column gap-4' onSubmit={handelchange}>
                        <input ref={(el) => (formrefs.current[0] = el)} type="email" placeholder='Email' />

                        <input ref={(el) => (formrefs.current[1] = el)} type="password" placeholder='old Password' />
                        {error.OldPassword && <div className="text-danger">{error.OldPassword[0]}</div>}

                        <input ref={(el) => (formrefs.current[2] = el)} type="password" placeholder=' new Password' />
                        {error.NewPassword && <div className="text-danger">{error.NewPassword[0]}</div>}

                        
                        <button type='submit' className={styles.btn + " py-2 text-center"}>Change password</button>
                        <span className='text-center'>Already changed your password?  <Link to="/loginadmin" className={styles["link_gologin"]}> Go to Login</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}
