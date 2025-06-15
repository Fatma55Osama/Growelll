import React, { useState, useEffect } from 'react'
import './index.scss';
import WOW from 'wow.js';
import logo from '../../assets/Growell.svg'
import frame from '../../assets/Frame 8745.svg'
import Blob3 from '../../assets/Blob 3.svg'
import Blob4 from '../../assets/Blob 4.svg'
import Blob33 from '../../assets/Blob 3.png'
import logobtn from '../../assets/Group 8745.svg'
import doctor from '../../assets/smiling-doctor-with-strethoscope-isolated-grey.svg'
import boy from '../../assets/medium-shot-little-boy-posing.svg'
import underlayar from '../../assets/Blob 4.png'
import icon from '../../assets/Group 8746.svg'
import trueicon from '../../assets/trrrrue.svg'
import rightchild from '../../assets/Rectangle 130.svg'
import spanicon from '../../assets/span.cs_feature_icon.png'
import spanicon1 from '../../assets/span.cs_feature_icon (1).png'
import spanicon2 from '../../assets/span.cs_feature_icon (2).png'
import doctorsimg from '../../assets/Image.png'
import imgplay from '../../assets/Image play.png'
import Skaak from '../../assets/Image Wrapper.png'
import book from '../../assets/Rectangle 113.png'
import securedoctor from '../../assets/cta_img.png.png'
import i from '../../assets/i.png'
import appointment from '../../assets/appointment.jpeg.png'
import grop from '../../assets/Group 8752.png'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loadar/Loader';
import '../../Component/Nav'
import '../../Component/Footer'
import { $eventsState, useBooks, useData, usedomain, useEvents } from '../../Store';
import doctorsimg1 from "../../assets/Link → doctor_11.png.png";
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import Nav from '../../Component/Nav';
import Footer from '../../Component/Footer';
import ContactForm from '../../Component/ContactForm';
import { getData } from '../../data/Repo/getData';
export default function Homepage() {
  // const [doctors, setDoctors] = useState([{ img: doctorsimg, name: "Dr: Esraa Nagy", descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, { img: doctorsimg, name: "Dr: Esraa Nagy", descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, { img: doctorsimg, name: "Dr: Esraa Nagy", descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }])
  // const [events, setEvents] = useState([{ img: Skaak, name: "Full name", descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, { img: imgplay, name: "Full name", descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, { img: Skaak, name: "Full name", descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }])
  //   const [books, setBooks] = useState([{ img: book, name: "Full name", descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, { img: book, name: "Full name", descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }, { img: book, name: "Full name", descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }])
  // const events = useRecoilValue($eventsState);
  const { books, setbooks } = useBooks()
  // const doctors = useRecoilValue($doctorState)
  const navigat = useNavigate()
  const { events, setevents } = useEvents()
  const { domain } = usedomain()
  const [loderindex, setLoderindex] = useState(true)
  const { dataDoctor: doctors, setdataDoctor } = useData()
  useEffect(() => {
    setTimeout(() => {
      setLoderindex(false)
    }, 1500);
    new WOW({
      boxClass: 'wow',
      animateClass: 'animate__animated',
      offset: 200,
      mobile: true,
      live: true
    }).init();
  }, [])
  //  useEffect(() => {
  //     let token = localStorage.getItem("token") || sessionStorage.getItem("token");
  //     if (token) {
  //       getData.get_profile(domain, token)
  //         .then(res => {
  //           console.log("homeprofile", res);
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     } else {
  //       navigat("/login");
  //     }
  //   }, [domain, navigat]);

  return (
    <>
      {
        loderindex == true ? <Loader /> : (
          <div className='col-12  h-100'>

            <div className='parent col-12  '>




              {/* <Nav/> */}
              {/* start nav par bg-white of figma */}
              {/* 
              <div className=' allnavsuccess col-12  py-3 '>
                <div className='navpar col-11 col-md-9 bg-white container mt-3 d-flex flex-row align-items-center justify-content-between'>
                  <div className='logonav ms-md-5'> <img src={logo} width="120px" height="48px" alt="" /></div>
                  <div className='col-8 col-md-6 ' >
                    <nav className=' d-flex flex-row justify-content-between me-md-3'>
                      <Link className='nav-link' to="Contact">Contact</Link>
                      <Link className='nav-link' to="Event">Events</Link>
                      <Link className='nav-link' to="Finddoctor">Find Doctor</Link>
                      <Link className='nav-link' to="/">Home</Link>
                      <li><img src={frame} width="36px" height="20px" /></li>
                    </nav>
                  </div>
                </div>
              </div> */}

              {/* end nav par bg-white of figma */}
              <div id='orang' className='  py-5 '>
                <div className='imghight  d-flex justify-content-between'>
                  <img className='Blob33 ' src={Blob33} width="600px" height="500px" />
                  <img className='Blob4 ' src={Blob4} alt="" />
                </div>
              </div>

              <div className='textdoctor col-12 col-md-10 col-lg-12 container   d-flex flex-row align-items-center justify-content-between '>
                <div className='col-6 col-lg-5   div1 d-flex align-content-center align-items-center '>
                  <div className='col-12 bntdiv1 mt-5 h-75 d-flex flex-column align-items-baseline gap-1 gap-md-3'>
                    <h1>Discover Your <br /> Child’s Potential</h1>
                    <div className='col-12 col-md-10'>
                      <p>We help your child discover their cognitive skills through fun and interactive tests. Our platform provides smart tools to assess thinking and focus, supporting your child’s growth in a safe, easy way.
                      </p>
                    </div>
                    <Link className='nav-link' to={'/Finddoctor'}>

                      <button className='rounded-5 px-2 py-1 px-md-3 py-md-2'>Have your test Now <img src={logobtn} width="30px" height="30px" alt="" /></button>
                    </Link>
                  </div>
                </div>
                <div className='col-6 div2  d-flex  justify-content-center'>

                  <div className='parentunderlight  py-2  col-12  d-flex align-content-start align-items-end justify-content-center'>
                    <img className='underlight' src={underlayar} width="800px" height="460px" style={{ opacity: "0.5" }} alt="" />

                    <div className='imgboydoctor   ms-md-4 col-md-11 '>
                      <div className='gropicon px-lg-2 px-1 col-11 col-md-6 col-lg-5 d-flex flex-row align-items-center justify-content-between'>
                        <img className='icon1' src={icon} width="98px" height="56px" alt="" />
                        <h5 className='mt-md-2 m-0'>+90<p>Doctor</p> </h5>
                        <img className='truicon2' src={trueicon} width="40px" height="40px" alt="" />
                      </div>
                      <img className='doctor' src={doctor} width="500px" alt="" />
                      <img className='boy' src={boy} width="500px" alt="" />
                    </div>
                  </div>

                </div>
              </div>


            </div>

            <div className='col-12 bg-white h-100 allsection '>
              <div className='col-12 h-100 d-flex flex-row justify-content-center '>
                <div className='numberdiv  container py-3 py-md-5 col-11 col-md-10 d-flex flex-row '>

                  <div className='div11  col-md-3 col-3 d-flex flex-column align-items-center'>
                    <h3>12%</h3>
                    <span>Metric description</span>
                  </div>

                  <div className='div11  col-md-3  d-flex flex-column align-items-center'>
                    <h3>87%</h3>
                    <span>Metric description</span>
                  </div>

                  <div className='div11 col-md-3   d-flex flex-column align-items-center'>
                    <h3>$5000</h3>
                    <span>Metric description</span>
                  </div>

                  <div className='div11 col-md-3   d-flex flex-column align-items-center'>
                    <h3>87%</h3>
                    <span>Metric description</span>
                  </div>

                </div>
              </div>

              <div className='col-12  divsuuccess'>
                <div className='container controldiv col-11  d-flex justify-content-between'>

                  <div className='col-md-6 rightchild'>
                    <img src={rightchild} width="600px" height="430px" alt="" />
                  </div>

                  <div className='col-lg-5 leftchid d-flex align-content-center align-items-center'>
                    <div className='container allabutandp col-md-10 py-5  d-flex flex-column  gap-4 '>

                      <div className='aboutus col-8 col-md-11 col-lg-7 d-flex justify-content-around align-items-center gap-md-2 '>
                        <h1>About us</h1>
                        <img src={logobtn} width="38px" height="38px" alt="" />

                      </div>

                      <div className='d-flex flex-column pargraph  align-content-around gap-4'>
                        <p>We are a smart digital platform dedicated to supporting cognitive growth and early detection of intellectual delays. Our mission is to connect individuals with specialized doctors through accurate IQ assessments, personalized recommendations, and educational content to enhance mental abilities.</p>
                        <p>Our platform allows doctors to create custom cognitive tests, monitor users’ progress, and communicate directly with them. Users can take scientifically designed tests, view detailed reports, and access tools to improve their mental skills.</p>
                      </div>


                    </div>
                  </div>
                </div>
              </div>




            </div>

            <div className=' col-12 div3 d-flex align-items-center'>
              <div className='container services py-5 d-flex flex-column justify-content-center'>

                <div className='d-flex justify-content-center py-2 '>
                  <h1>Services</h1>
                </div>

                <div className='container   sonservices py-4 col-11 col-lg-10 d-flex justify-content-between flex-wrap gap-3 gap-lg-0  '>

                  <div className='col-lg-4 col-md-5 d-flex  align-items-end'>
                    <div className='container col-11  secondry1 py-4 col-md-10  d-flex flex-column gap-2 align-items-center'>

                      <div className=' col-8 d-flex knowledg py-2 mt-1 justify-content-around align-items-center justify-content-center'>
                        <img src={spanicon1} width="40px" height="40px" alt="" />
                        <h3>IQ Testing</h3>
                      </div>

                      <div className='mt-2'>
                        <p>We offer comprehensive and scientifically designed IQ tests suitable for all ages. These tests help identify cognitive abilities, pinpoint areas of delay, and provide a foundation for early intervention.

                        </p>
                      </div>

                    </div>
                  </div>

                  <div className='col-lg-4 col-md-5 d-flex align-items-center'>
                    <div className='container col-11 secondry1 py-3 col-md-10  d-flex flex-column  align-content-center gap-2'>

                      <div className='d-flex flex-row  ms-3 col-11  knowledg  py-2 mt-1 justify-content-around align-content-center align-items-center'>
                        <img src={spanicon} width="40px" height="40px" alt="" />
                        <h3> Cognitive Tools</h3>
                      </div>

                      <div className='mt-2'>
                        <p>
                          We provide a curated library of educational videos, articles, books, and interactive exercises designed to improve memory, attention, reasoning, and overall mental capacity.</p>
                      </div>

                    </div>
                  </div>

                  <div className='col-lg-4 integrity col-md-5 d-flex align-items-end'>
                    <div className='container col-11 secondry1 py-3 col-md-10  d-flex flex-column align-items-center  gap-2'>

                      <div className='d-flex  col-9 knowledg py-2 mt-1 justify-content-around align-items-center'>
                        <img src={spanicon2} width="40px" height="40px" alt="" />
                        <h3>Complaints</h3>
                      </div>

                      <div className='mt-2'>
                        <p>Users can easily submit complaints, concerns, or feedback via a structured form, which is promptly reviewed by doctors to ensure timely response and support.</p>
                      </div>

                    </div>
                  </div>

                </div>


              </div>


            </div>

            <div className='col-12 div4 bg-white'>
              <div className='container  col-lg-9 d-flex flex-column align-items-center gap-5'>
                <div className='col-md-10 mt-5 mt-md-0 title container d-flex justify-content-between align-items-center'>
                  <h3>Doctors</h3>
                  <Link to={"/Finddoctor"} className='button px-3 py-1 px-md-5 py-md-2 rounded-5'>See more</Link>
                </div>
                <div className='col-11 col-lg-10 divcard gap-4 gap-md-5 gap-lg-0'>
                  {
                    doctors.slice(0, 3).map((el, index) => {
                      return (
                        <div className="card card1 d-flex flex-column justify-content-center  " style={{ width: "18rem" }} key={index}>
                          <div className='d-flex justify-content-center'>

                            <img src={`${domain}/${el.image}`} className="card-img-top mt-2" alt="..." />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title mb-1">Dr:{el.fullName}</h5>
                            <p className="card-text">{el.specialization}</p>
                            <Link to={`/DetailsDoctor/${el.id}`} className="btn  col-12 rounded-5">Enroll</Link>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>


            <div className='col-12 div5 bg-white'>
              <div className='container  col-md-9 d-flex  flex-column align-items-center  gap-5'>
                <div className='col-md-10 mt-5 mt-md-5 mt-lg-0 title container d-flex justify-content-between align-items-center'>
                  <h3>Events</h3>
                  <Link to={"/Event"} className='button px-3 py-1 px-md-5 py-md-2 rounded-5'>See more</Link>
                </div>
                <div className='col-11 col-lg-10 col-md-12 divcard d-flex justify-content-between flex-wrap gap-4 gap-lg-0'>
                  {
                    events.slice(0, 3).map((el, index) => {
                      return (

                        <div key={el.videoEventId} className="card  card1  d-flex flex-column justify-content-center align-content-center align-items-center" style={{ width: "18rem" }} >
                          <img src={el.videoImagePath.replace('/api/HomeEvents/GetImage/', '')} className="card-img-top mt-3" height={152} alt="..." />
                          <div className="card-body d-flex flex-column justify-content-end">
                            <h5 className="card-title mb-1">{el.videoTitle}</h5>
                            <p className="card-text">{el.aboutOfVideo}</p>
                            <Link to={`/detailsvedio/${el.videoEventId}`} className="btn  col-12 rounded-5">Enroll</Link>
                          </div>
                        </div>

                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className='col-12 div6 bg-white'>
              <div className='container  col-lg-9 d-flex  flex-column align-items-center gap-5'>
                <div className='col-md-10 mt-5 mt-md-5 mt-lg-0 title container  d-flex justify-content-between align-items-center'>
                  <h3>Events</h3>
                </div>
                <div className='col-11 col-md-10 divcard d-flex justify-content-between flex-wrap gap-md-5 gap-lg-0'>
                  {
                    books.slice(0, 3).map((el, index) => {
                      return (
                        <div className="card card1 d-flex flex-column justify-content-center align-content-center align-items-center" style={{ width: "18rem" }} key={index}>
                          <img src={el.bookImagePath.replace('/api/HomeEvents/GetImage/', '')} className="card-img-top mt-3" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title mb-1">{el.bookTitle}</h5>
                            <p className="card-text">{el.aboutOfBook}</p>
                            <Link className="btn col-12 rounded-5" to={`/DetailsEvent/${el.bookEventId}`}>Enroll</Link>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className='col-12 div7 bg-white d-flex align-items-center '>
              <div className='col-12 bluesecur d-flex justify-content-between align-content-center align-items-center'>

                <div className='col-5 col-md-4 contentblue '>
                  <h1>Don’t Let Your Health
                    <br /> Take a Backseat!</h1>
                  <p>"Discover your child's potential with our smart assessment today!"</p>
                </div>
                <div className='triangle d-none d-md-flex'></div>
                <div className='banner_img  col-2'>
                  <img src={securedoctor} width="400px" alt="" />
                </div>

              </div>

            </div>
            {/* 
            <div className='col-12 div8 bg-white'>
              <div className='container contentform  d-flex justify-content-between'>

                <div className='col-md-6 half1 mb-5 mb-md-0 d-flex flex-column align-content-around gap-5'>
                  <div className='col-12'>
                    <span>BOOK AN</span>
                    <h3>Appointment</h3>
                  </div>
                  <form className=' ms-md-3 d-flex flex-column gap-4 gap-md-4 '>

                    <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                      <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                        <label>Name</label>
                        <input className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your Name ' />
                      </div>

                      <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                        <label>Phone Number</label>
                        <input className='py-2 col-10' type="number" placeholder='  Please Enter your phone ' />
                      </div>
                    </div>

                    <div className='col-12'>
                      <label htmlFor="">Medical Record Number</label>
                      <input className='py-2 col-9 col-md-10' type="number" placeholder='  Please Enter your Record Number ' />
                    </div>

                    <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                      <div className='col-11 col-md-6 d-flex flex-column gap-2'>
                        <label>Preferred Date</label>
                        <input className='py-2 col-10' type="date" />
                      </div>

                      <div className='col-11 col-md-6 d-flex flex-column gap-2 '>
                        <label>Preferred Timer</label>
                        <input className='py-2 col-10' type="time" />
                      </div>

                    </div>

                    <div className='col-12 col-md-8 d-flex flex-row flex-wrap gap-2 gap-md-2'>
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
                    </div>
                    <button className='py-2 py-md-2 col-5 text-white col-lg-3 rounded-5'>Submit <img className='ms-1' src={i} alt="" /></button>

                  </form>
                </div>
                <div className='col-md-5 appointment  d-md-flex justify-content-center align-items-center'>
                  <img src={appointment} width="450px" height="550px" alt="" />
                </div>
              </div>

            </div> */}




            {/* <div className='col-12 div9 bg-white d-flex  align-items-end '>

              <div className='col-12 babyblue d-flex flex-column align-content-center align-items-center justify-content-end gap-5'>

                <div className='gropimge'>
                  <img src={grop} width="258px" height="279px" alt="" />
                </div>

                <div className='col-12 col-md-10 mb-3 mb-md-0 d-flex flex-row justify-content-between align-items-center flex-wrap'>
                  <div className='col-md-3  mb-5 d-none d-md-flex justify-content-center'>
                    <img src={logo} width="130px" height="43px" alt="" />
                  </div>

                  <div className='col-md-5  d-flex flex-row justify-content-between'>

                    <div>
                      <ul>
                        <h5>COMPANY</h5>
                        <li>How it works</li>
                        <li>Pricing</li>
                        <li>Demo</li>
                      </ul>
                    </div>

                    <div>
                      <ul>
                        <h5>RESOURCES</h5>
                        <li>Blog post name goes here</li>
                        <li>Blog post name goes here</li>
                        <li>Blog post name goes here</li>
                        <li>See all resources</li>
                      </ul>
                    </div>

                    <div>
                      <ul>
                        <h5>ABOUT</h5>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='col-9 d-flex justify-content-center mb-4'>
                  <span>Copyright © 2022 Company name</span>
                </div>
              </div>
            </div> */}
            {/* <Footer/> */}
            {/* <ContactForm />
            <Chat/> */}
          </div>

        )
      }
    </>


  )
}
