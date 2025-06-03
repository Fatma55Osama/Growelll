import React, { useEffect, useRef } from 'react'
import appointment from '../../assets/appointment.jpeg.png'
import i from '../../assets/i.png'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Bounce, toast, ToastContainer } from 'react-toastify';
export default function ContactForm() {
  const title = useRef();
  const description = useRef();
  const date = useRef();

  const navigate = useNavigate();
  let token = localStorage.getItem('token') || sessionStorage.getItem('token')


  const handelsubmit = (e) => {
    e.preventDefault();
    let titlevalue = title.current.value
    let descriptionvalue = description.current.value
    let datevalue = date.current.value
    if (!titlevalue || !descriptionvalue || !datevalue) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all the required fields.',
        confirmButtonColor: '#f0ad4e'
      });
      return;
    }
    axios.post('https://localhost:7071/api/ContactUs', {
      title: titlevalue,
      description: descriptionvalue,
      createdAt: datevalue,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Submitted Successfully!',
        text: 'Your request has been sent.',
        confirmButtonColor: '#3085d6'
      })
      title.current.value = '';
      description.current.value = '';
      date.current.value = '';

    }).catch(err => {
      if (err.response && err.response.status === 401) {
        toast.error("Doctors are not allowed to submit complaints", {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        title.current.value = '';
        description.current.value = '';
        date.current.value = '';
      } else {
        toast.error("Submission failed. Please try again later.", {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  }


  return (
    <div className={`${styles.div8} col-12  bg-white`}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className={` ${styles.contentform} container   d-flex justify-content-between align-items-center`}>

        <div className={` ${styles.half1} col-md-6  mb-5 mb-md-0 d-flex flex-column align-content-around gap-5`}>
          {/* <div className='col-12'>
                        <span>BOOK AN</span>
                        <h3>Appointment</h3>
                      </div> */}
          <form className=' ms-md-3 d-flex flex-column gap-4 gap-md-4 ' onSubmit={handelsubmit}>

            <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

              <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                <label>Title</label>
                <input ref={title} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your title ' />
              </div>

              <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                <label>Description</label>
                <input ref={description} className='py-2 col-10' type="text" placeholder='  Please Enter your description ' />
              </div>
            </div>

            {/* <div className='col-12'>
                          <label htmlFor="">Medical Record Number</label>
                          <input className='py-2 col-9 col-md-10' type="number" placeholder='  Please Enter your Record Number ' />
                        </div>
     */}
            <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

              <div className='col-12 col-md-10 d-flex flex-column gap-2'>
                <label> Date</label>
                <input ref={date} className='py-2 col-12' type="date"
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} />
              </div>

              {/* <div className='col-11 col-md-6 d-flex flex-column gap-2 '>
                            <label>Preferred Timer</label>
                            <input className='py-2 col-10' type="time" />
                          </div> */}

            </div>

            {/* <div className='col-12 col-md-8 d-flex flex-row flex-wrap gap-2 gap-md-2'>
                          <h5 htmlFor="">Reason for Visit</h5>
                          <div className='col-12  d-flex flex-row flex-wrap gap-2 gap-md-3  '>
                            <input id='Routine Checkup' type="radio" name='checkup' />
                            <label htmlFor="Routine Checkup">Routine Checkup</label>
    
                            <input id='New Patient Visit' type="radio" name='checkup' />
                            <label htmlFor="New Patient Visit">New Patient Visit</label>
                          </div>
    
                          <input id='Specific Concern' type="radio" name='checkup' />
                          <label htmlFor="Specific Concern">Specific Concern</label>
                        </div>
    
                        <div className='col-12 col-md-10  d-flex flex-row flex-wrap gap-3 gap-md-2'>
                          <h5 htmlFor="">Department</h5>
    
                          <div className='col-12  d-flex flex-row align-items-center flex-wrap gap-2 gap-md-3 '>
                            <input id='Pediatric' type="radio" name='depart' />
                            <label htmlFor="Pediatric">Pediatric</label>
    
                            <input id='Obstetrics and Gynecology' type="radio" name='depart' />
                            <label htmlFor="Obstetrics and Gynecology">Obstetrics and Gynecology</label>
    
                            <input id='Cardiology' type="radio" name='depart' />
                            <label htmlFor="Cardiology">Cardiology</label>
    
    
                          </div>
    
                          <input id='Neurology' type="radio" name='depart' />
                          <label htmlFor="Neurology">Neurology</label>
                        </div> */}
            <button type='submit' className='py-2 py-md-2 col-5 text-white col-lg-3 rounded-5' id={styles.button}>Submit <img className='ms-1' src={i} alt="" /></button>

          </form>
        </div>
        <div className='col-md-5 appointment  d-md-flex justify-content-center align-items-center'>
          <img src={appointment} width="450px" height="550px" alt="" />
        </div>
      </div>

    </div>
  )
}
