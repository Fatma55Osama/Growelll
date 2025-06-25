import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { Link, useParams } from 'react-router-dom'
import iconsearch from '../../assets/Vector.png'
import frams from '../../assets/Frame.png'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { CiClock2, CiTwitter } from "react-icons/ci";
import { useData, usedomain } from '../../Store'
import { GoArrowRight, GoClockFill } from "react-icons/go";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { Box, Rating } from '@mui/material'
import DoctorRating from '../../Component/DoctorRating'
import { getData } from '../../data/Repo/getData'
export default function DetailsDoctor() {
   const {detailsdoctor,setdailsdoctor}=useData()
   const params = useParams()
   const {domain} =usedomain()
   let id = params.id
   console.log("id this is " + id)
   useEffect(()=>{
    getData.get_single_dotor(domain,id).then((res)=>{
      setdailsdoctor(res)
      console.log(res)
    }).catch((err)=>console.log(err))
   },[])
  return (
    <div className={styles.sectionParent}>
      <div className={styles.div1}>
        <div className='container d-flex flex-column justify-content-center'>
          <div className={' col-11 px-5  d-flex flex-column  gap-5'}>
            <div className={styles.divresearsh + ' py-2 col-12 d-flex flex-wrap flex-row justify-content-between align-items-center'} >
              <span className='d-flex gap-1'><Link className='nav-link' to={"/"}>Home</Link> / <Link to={"/Finddoctor"} className='nav-link'>Doctors</Link>/<Link to={`/DetailsDoctor/${id}`} className='nav-link'>Doctor Details</Link></span>
              {/* <div className={styles.divinput + ' col-6 col-md-4 col-lg-3   px-md-2 rounded-5 d-flex  align-items-center  py-md-2'}>
                <input className='col-8 col-md-8 ms-3' placeholder='Search Doctors' type="text" />
                <img className='ms-2 ms-md-3' src={iconsearch} width="25px" height="25px" alt="" />
              </div> */}

            </div>


          </div>
          <div className={styles.div2 + " ms-5 mt-2 d-flex align-items-center"}>
            <img  src={`${domain}/${detailsdoctor.imgUrl}`} width={490} height={499} alt="" />
            <div className={styles.contantdata + " col-6 d-flex flex-column  "}>
              <div className='ps-5 py-3 d-flex flex-column gap-3'>
                <div className='d-flex flex-column gap-1'>
                  <h4>Dr: {detailsdoctor.fullName}</h4>
                  <span>{detailsdoctor.description}</span>
                  <p className='col-6'>{detailsdoctor.bio}</p>
                </div>
                <div className={styles.divicons + " d-flex  gap-3"}>
                  <div className={styles.bordericon + " d-flex align-items-center justify-content-center"}>
                    <FaFacebookF />
                  </div>
                  <div className={styles.bordericon + " d-flex align-items-center justify-content-center"}>
                    <FaLinkedinIn />
                  </div>
                  <div className={styles.bordericon + " d-flex align-items-center justify-content-center"}>
                    <FaTwitter />
                  </div>
                </div>
              </div>

              <div className={styles.HaveTest + " px-5 py-3"}>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex align-items-center gap-2'>
                    <CiClock2 />
                    <span>Avaibility</span>
                  </div>
                  <div>
                   <Link className='nav-link' to={`/DetailsDoctor/${id}/tests`}><span>Have the Category <GoArrowRight /></span></Link> 
                  </div>
                </div>

              </div>



            </div>
          </div>
        </div>

      </div>
      <div className={styles.sectioncontact}>
        <div className={' container my-5 d-flex justify-content-between '}>
          <div className={styles.about + " col-6 py-5"}>
            <div className='px-5 d-flex flex-column gap-5'>
              <div className='d-flex flex-column gap-3'>
                <div className='d-flex  align-items-center  gap-4'><RiCalendarScheduleFill className={styles.bordericon} /> <h5>Contact Info</h5></div>
                <div className='d-flex  align-items-center  gap-3'><FiPhone className={styles.bordericon} /> <span>{detailsdoctor.phoneNumber}</span></div>
                <div className='d-flex  align-items-center  gap-3'><TfiEmail className={styles.bordericon} /><span>{detailsdoctor.email}</span></div>
              </div>
              <div className='d-flex flex-column gap-3'>
                <div className='d-flex gap-4'><RiCalendarScheduleFill className={styles.bordericon} /> <h5>Appointment Schedules</h5></div>
                <div className={styles.Dates + " px-5 py-5"}>
                  <div className=' px-1 d-flex flex-column gap-4'>
                    <div className='d-flex align-items-center justify-content-between fw-semibold'>Monday <div className='d-flex align-items-center gap-3'><GoClockFill className={styles.bordericon2} /> 09.00-12.00</div></div>
                    <div className='d-flex align-items-center justify-content-between fw-semibold'>Wednesday <div className='d-flex align-items-center gap-3'><GoClockFill className={styles.bordericon2} />15.00-18.00</div></div>
                    <div className='d-flex align-items-center justify-content-between fw-semibold'>Friday <div className='d-flex align-items-center gap-3'><GoClockFill className={styles.bordericon2} />09.00-12.00</div></div>
                  </div>
                </div>
              </div>
              <Link className='nav-link py-2 rounded-5 text-white text-center' to={`/booking/${id}`} id={styles.buttonbooking}>Booking</Link>
            </div>

          </div>
          <div className='col-6  d-flex justify-content-center align-items-center ' id={styles.textaboutme}>
            <div className='d-flex col-8 '>
              <div className='d-flex flex-column gap-3'>
                <h3>About me</h3>
                <div className='ms-3'><p className='fw-semibold'>{detailsdoctor.aboutMe} {detailsdoctor.specialization}</p>
                  <p className='fw-semibold'>{detailsdoctor.education}</p></div>

              </div>
            </div>

          </div>
        </div>


      </div>
      <div className={styles.sectionkid}>
        <div className='container' id={styles.kidAbout}>
          <div className='col-12  py-5 text-white'>
            <div className=' ms-5 d-flex justify-content-between align-items-center'>
              <h3>About the kid</h3>
              <div className={styles.divbtn + "  rounded-3 d-flex justify-content-center align-items-center "}>
                <button className=' bg-white rounded-3 py-2 px-5'>{detailsdoctor.targetAgeGroup}</button>

              </div>
            </div>
            <div className=' ms-5 d-flex justify-content-between align-items-center'>
              <p className='col-11 text-white ms-3 mt-3'>{detailsdoctor.aboutOfKids}</p>
            </div>
            <div className=' ms-5 d-flex justify-content-between align-items-center'>
              <div className={styles.divbtn2 + "   d-flex justify-content-center align-items-center "}>
                          <Link className='nav-link col-12' to={`/DetailsDoctor/${id}/tests`}><button className='col-12 '>Have the Category</button></Link>
              </div>
              <div className='col-6 '>
                <p className='mt-3 text-white'>Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis </p>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rating}>
        <div className='container py-5'>
          <h2>Rating</h2>
          <p className='col-5'>Rating and reviews are verified and from people who use the service</p>
          <DoctorRating value={detailsdoctor?.aveRating} withText={true}  />
          <div>

          </div>
        </div>

      </div>
    </div>
  )
}
{/* <Rating
  name="text-feedback"
  value={value}
  readOnly
  precision={0.5}
  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
/>
<Box sx={{ ml: 2 }}>{labels[value]}</Box> */}