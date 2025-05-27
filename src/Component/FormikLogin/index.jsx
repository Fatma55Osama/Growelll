import React from 'react'
import styles from './index.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import logo from '../../assets/header-logo2.png'
import * as Yup from 'yup'
export default function FormikLogin() {
  const validationSchema = Yup.object({

    userEmail: Yup.string().email('Invalid email').required('Email is required').test('no-spaces', 'Email must not contain spaces', value => !/\s/.test(value)).matches(/^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.(com|net|org|edu)$/, 'Please enter a valid and realistic email'),
    userPassword: Yup.string().required("password is required").min(8, 'Password must be at least 8 characters'),
    userremember: Yup.boolean()

  })
  const handallogin = (values) => {
    console.log(values)
  }
  return (
    <div>
      <div className='col-12'>
        <Formik validationSchema={validationSchema} initialValues={{ userPassword: "", userEmail: "", userremember: "" }} onSubmit={handallogin}>
          {({ errors, touched }) => (
            <Form className='col-12 d-flex flex-column justify-content-center align-items-center  gap-2 gap-md-3 gap-lg-4 '>
              <div className=' d-flex d-md-none' id={styles.logodiv}>
                <img src={logo} alt="" />
              </div>
              <div className='col-lg-10 col-md-12 col-11  px-lg-3 pe-5  d-flex flex-column gap-lg-1'>
                <h3>Welcome to Laborc</h3>
                <p className='m-0 ms-1 mt-1'>Need an account?<Link to={"/registerAdmin"} className='text-decoration-none '>Sign Up</Link> </p>
              </div>

              <div className={styles.inputGroup + ' position-relative   '}>
                <Field type="email" name="userEmail" placeholder="Enter Your Email" className={styles.formControl + ` ${errors.userEmail && touched.userEmail ? styles.error : ""}`} />
                <MdOutlineEmail className={styles.iconform + ' position-absolute top-50 translate-middle-y '} />
                <ErrorMessage component="div" name='userEmail' className={styles.errorMessage + ' text-danger animate__animated animate__bounce   pe-3 pt-1 '} />
              </div>

              <div className={styles.inputGroup + ' position-relative  '}>
                <Field type="password" name="userPassword" placeholder="Enter Your Password" className={styles.formControl + ` ${errors.userPassword && touched.userPassword ? styles.error : ""}`} />
                <TbLockPassword className={styles.iconform + ' position-absolute top-50 translate-middle-y '} />
                <ErrorMessage component="div" name='userPassword' className={styles.errorMessage + ' animate__animated animate__bounce  text-danger border-danger pt-1 '} />
              </div>
              <div className='d-flex justify-content-between' id={styles.remember}>
                <label className='d-flex gap-2'>
                  <Field type="checkbox" name="userremember" />
                  Remember me
                </label>
                <Link className='nav-link'>Forget Password?</Link>
              </div>



              <button className={styles.formControlbutton + " rounded-5"} type='submit'>Login</button>


            </Form>
          )}

        </Formik>
      </div>
    </div>
  )
}
