import React from 'react'
import styles from './index.module.css'
import logo from '../../assets/Growell.svg'
import { Link } from 'react-router-dom'

export default function Changpassword() {
    return (
        <div className={styles.parentall + " col-12 d-flex flex-column justify-content-center align-items-center "}>
            <div className={styles.contnetpage + " col-md-6   my-3 d-flex flex-column justify-content-center flex-grow-1"}>
                <div className='container col-11 col-md-12 col-lg-10  '>
                    <img src={logo} alt="" />
                    <h2>CHANGE PASSWORD</h2>
                    <form className='d-flex flex-column gap-4'>
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='New Password' />
                        <input type="password" placeholder='Confirm new Password' />
                        <Link className={styles.btn + " py-2 text-center"}>Change password</Link>
                        <span className='text-center'>Already changed your password?  <Link to="/login" className={styles["link_gologin"]}> Go to Login</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}
