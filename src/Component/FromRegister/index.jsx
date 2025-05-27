import React from 'react'
import styles from './index.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import { FaRegAddressBook, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { AiOutlinePhone } from "react-icons/ai";
import * as Yup from 'yup'
import logo from '../../assets/header-logo2.png'
export default function FormRegister() {
  // const auth = getAuth();
  const validationSchema = Yup.object({
    userName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").matches(
      /^[a-zA-Z]{2}[a-zA-Z\s]{1,48}$/,
      'Name must be at least 2 letters and may contain spaces only after that'
    ).required('Name is required'),
    userEmail: Yup.string().email('Invalid email').required('Email is required').test('no-spaces', 'Email must not contain spaces', value => !/\s/.test(value)).matches(/^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.(com|net|org|edu)$/, 'Please enter a valid and realistic email'),
    userPassword: Yup.string().required("password is required").min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
    userPhone: Yup.string().typeError('phone must be a number').required('phone is required').matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits'),
    userAddress: Yup.string().required('Address is required')

  })
  // const handelRegister = (values) => {
  //   console.log(values) 
  //  createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed up 
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });

  // }
  const handelRegister = (values) => {
    console.log(values)
  }



  // const app = initializeApp(firebaseConfig);
  return (
    <div className='col-12'>
      <Formik validationSchema={validationSchema} initialValues={{ userName: "", userEmail: "", userPassword: "", userPhone: "", userAddress: "" }} onSubmit={handelRegister}>
        {({ errors, touched }) => (
          <Form className='d-flex flex-column justify-content-center align-items-center  gap-2 gap-lg-3 '>
            <div className=' d-flex d-md-none' id={styles.logodiv}>
              <img src={logo}  alt="" />
            </div>
            <div className=' col-md-10 px-md-3  pe-5 pe-md-0'>
              <h3>Sign Up</h3> 
              <span>Enter details to create your account</span>
            </div>
            <div className={styles.inputGroup + ' position-relative  '}>
              <Field type="text" name="userName" placeholder="Enter Your Name" className={styles.formControl + ` ${errors.userName && touched.userName ? styles.error : ""}`} />
              <FaRegUser className={styles.iconform + ' position-absolute top-50 translate-middle-y  '} />
              <ErrorMessage component="div" name='userName' className={styles.errorMessage + ' animate__animated animate__bounce text-danger pe-3 pt-md-1'} />
            </div>

            <div className={styles.inputGroup + ' position-relative   '}>
              <Field type="email" name="userEmail" placeholder="Enter Your Email" className={styles.formControl + ` ${errors.userEmail && touched.userEmail ? styles.error : ""}`} />
              <MdOutlineEmail className={styles.iconform + ' position-absolute top-50 translate-middle-y '} />
              <ErrorMessage component="div" name='userEmail' className={styles.errorMessage + ' text-danger animate__animated animate__bounce   pe-3 pt-md-1 '} />
            </div>

            <div className={styles.inputGroup + ' position-relative  '}>
              <Field type="password" name="userPassword" placeholder="Enter Your Password" className={styles.formControl + ` ${errors.userPassword && touched.userPassword ? styles.error : ""}`} />
              <TbLockPassword className={styles.iconform + ' position-absolute top-50 translate-middle-y '} />
              <ErrorMessage component="div" name='userPassword' className={styles.errorMessage + ' animate__animated animate__bounce  text-danger border-danger pt-md-1 '} />
            </div>

            <div className={styles.inputGroup + ' position-relative  '}>
              <Field type="number" name="userPhone" placeholder="Enter Your Phone" className={styles.formControl + ` ${errors.userPhone && touched.userPhone ? styles.error : ""}`} />
              <AiOutlinePhone className={styles.iconform + ' position-absolute top-50 translate-middle-y '} />
              <ErrorMessage component="div" name='userPhone' className={styles.errorMessage + ' animate__animated animate__bounce text-danger border-danger pt-md-1'} />
            </div>

            <div className={styles.inputGroup + ' position-relative  '}>
              <Field type="text" name="userAddress" placeholder="Enter Your Address" className={styles.formControl + ` ${errors.userAddress && touched.userAddress ? styles.error : ""}`} />
              <FaRegAddressBook className={styles.iconform + ' position-absolute top-50 translate-middle-y '} />
              <ErrorMessage component="div" className={styles.errorMessage + ' animate__animated animate__bounce text-danger border-danger pt-md-1'} name='userAddress' />
            </div>
            <div className='d-flex align-items-start m-0 col-10 px-3'>

              <p className='m-0 mt-1'>Already Registered?<Link to={"/loginAdmin"} className='text-decoration-none '>Login</Link> </p>
            </div>
            <button className={styles.formControlbutton + " rounded-5"} type='submit'>Register</button>


          </Form>
        )}

      </Formik>
    </div>
  )
}
