import React, { useEffect, useRef } from 'react'
import styles from './index.module.css'
import { Link, useNavigate } from 'react-router-dom'

import { FaAngleRight, FaRegClock } from 'react-icons/fa6'
import ContactForm from '../../Component/ContactForm';
import { useBooks } from '../../Store';
export default function Contactus() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const Addrese = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const dateRef = useRef();
  const messageRef = useRef();
  const navigate = useNavigate();


  // const { books, setbooks } = useBooks()
  // console.log("this is books", books)

  return (
    <div className={styles.parentalldiv + " col-12 h-100"}>
      {/* <div className={styles.div1 + " col-12 d-flex flex-column h-100 "}>
        <div className={styles.textdiv + ' container  col-9  flex-grow-1 d-flex flex-column justify-content-center gap-2'}>
          <h1>Contact Us</h1>
          <span className='d-flex align-items-center '>
            <Link className='nav-link' to={"/"}>Home</Link>
            <FaAngleRight />
            <Link className='nav-link' to={"/Contact"}>Contact Us</Link>
          </span>
        </div>
      </div> */}
      <div className='py-5 container col-9  d-flex flex-column justify-content-center align-items-center gap-5 ' id={styles.contactus2}>
        <div className='col-9 d-flex flex-column justify-content-center align-items-center text-center' id={styles.divform}>
          <h2>Contact Us</h2>
          <p>We’d love to hear from you! Whether you have questions about our cognitive tests, need support, or want to know how we can help your child grow, feel free to get in touch. Our team is always ready to assist you.</p>
        </div>
        <ContactForm />
      </div>
      {/* <div className='col-12 d-flex justify-content-center mb-5'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.9494711155876!2d-82.31911212459755!3d34.80721307288194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88582f44c1c93631%3A0x7f6b9fb259bc4b42!2s123%20Innovation%20Dr%2C%20Greenville%2C%20SC%2029607%2C%20USA!5e0!3m2!1sen!2seg!4v1746498649013!5m2!1sen!2seg" width="95%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div> */}
    </div>
  )
}
