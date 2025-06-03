import React, { useEffect, useState } from 'react'
import Loader from '../Loadar/Loader'
import { Link, useLoaderData } from 'react-router-dom'
import styles from './index.module.css'
import iconsearch from '../../assets/Vector.png'
import Nav from '../../Component/Nav'
import girle from '../../assets/Imagegrile.png'
import Card from 'react-bootstrap/Card';
import star from '../../assets/Frame 8823.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import './index.scss'
import "swiper/css/navigation";
import { useData, usedomain, usePagenation, useSearch } from '../../Store'
import doctor from '../../assets/Group 8756.png'
import doctorsimg from "../../assets/Link → doctor_11.png.png";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { CiClock2, CiTwitter } from "react-icons/ci";
import { GoArrowRight } from "react-icons/go";
import { getData } from '../../data/Repo/getData'
import DoctorRating from '../../Component/DoctorRating'
import { Search } from '../../data/API/Search'
export default function Finddoctor() {
  const { dataDoctor: doctors, setdataDoctor } = useData()
  const { domain } = usedomain()
  const { page, pageSize, setPage, setPageSize, currentPage } = usePagenation()
  const { Searchs, setsearch } = useSearch();
  const [searchText, setSearchText] = useState("");
  // const totalPages = Math.ceil(totalItems / pageSize);
  useEffect(() => {
    getData.get_all_doctor(domain, page, pageSize).then((res) => {
      console.log("Doctors fetched:", res);
      setdataDoctor(res);
    });
  }, [domain, page, pageSize]);

  const handleSearch = () => {
    Search(domain, searchText).then((res) => {
      setsearch(res)
      console.log(res)
    })
  }
  return (
    <div className={styles.parent}>
      {/* <Nav /> */}
      <div className={styles.contandivcenter + ' container   d-flex flex-column align-items-center justify-content-center'}>
        <div className={styles.div1 + ' col-11 px-4  d-flex flex-column  gap-5'}>
          <div className={styles.divresearsh + ' col-12 d-flex flex-wrap flex-row justify-content-between align-items-center'} >
            <span className='d-flex gap-1'><Link className='nav-link' to={"/"}>Home</Link> / <Link to={"/Finddoctor"} className='nav-link'>Doctors</Link></span>
            <div className={styles.divinput + ' col-6 col-md-4 col-lg-3   px-md-2 rounded-5 d-flex  align-items-center  py-md-2'}>
              <input
                className='col-8 col-md-8 ms-3'
                placeholder='Search Doctors'
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={handleSearch}
              />              <img className='ms-2 ms-md-3' src={iconsearch} width="25px" height="25px" alt="" />
            </div>

          </div>
          <div className={styles.doctorswiper + " d-flex flex-column gap-4 pb-5"}>
            <span id={styles.span}>Top Rated</span>
            <div>
              {/* <Card className={styles.Cardstyl} style={{ width: '20rem' }}>
                <Card.Img variant="top" src={girle} />
                <Card.Body>
                  <Card.Title className={styles.titlecard}>Dr: Esraa Nagy</Card.Title>
                  <Card.Img src={star} style={{ width: "100px" }} />
                  <Card.Text className={styles.textcaed}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Link className={styles.linkcard + ' nav-link btn rounded-5 py-1'}>Enroll</Link>
                </Card.Body>
              </Card> */}
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                navigation={true}
                modules={[FreeMode, Navigation]}
                onSlideChange={(swiper) => setIsBeginning(swiper.isBeginning)}
                className="mySwiper"
              >
                {
                  doctors.slice(5, 10).map((el, index) => (
                    <SwiperSlide>

                      <Card key={el.id} className={styles.Cardstyl} style={{ width: '22rem' }}>
                        <Card.Img variant="top" width={350} height={350} style={{ objectFit: "contain" }} src={`${domain}/${el.image}`} />

                        <Card.Body>
                          <Card.Title className={styles.titlecard}>{el.fullName}</Card.Title>
                          {/* <Card.Img src={star} style={{ width: "100px" }} /> */}
                          <DoctorRating value={el.aveRating} id={styles.star} />

                          <Card.Text className={styles.textcaed}>
                            {el.specialization}
                          </Card.Text>
                          <Link to={el.id ? `/DetailsDoctor/${el.id}` : '#'} className={styles.linkcard + ' nav-link btn rounded-5 py-1'}>Enroll</Link>
                        </Card.Body>
                      </Card>

                    </SwiperSlide>
                  ))
                }


              </Swiper>
            </div>
          </div>


        </div>
        <div className={styles.div2 + " col-11 d-flex flex-column gap-5"}>
          <span className='ms-4 mt-2'>Doctors</span>
          {
            searchText.trim() === '' ? (
              doctors.length > 0 ? (
                doctors.map((el) => (
                  <div key={el.id} className='col-12 '>
                    <div className='col-12 d-flex align-items-center justify-content-between '>
                      <div className={styles.imgdiv + " col-4"}>
                        <img src={`${domain}/${el.image}`} width={280} alt="" style={{ borderRadius: "50%" }} />
                      </div>
                      <div className={styles.contantdata + " col-7 d-flex flex-column"}>
                        <div className='ps-5 py-3 d-flex flex-column gap-3'>
                          <div className='d-flex flex-column gap-1'>
                            <Link className='nav-link' to={el.id ? `/DetailsDoctor/${el.id}` : '#'}>
                              <h4>Dr: {el.fullName}</h4>
                            </Link>
                            <span>{el.specialization}</span>
                            <p className='col-6'>{el.bio}</p>
                          </div>
                          <div className={styles.divicons + " d-flex gap-3"}>
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
                              <Link to={`/DetailsDoctor/${el.id}/tests`} className='nav-link'>
                                <span>Have the test <GoArrowRight /></span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <h4>No doctors available.</h4>
                </div>
              )
            ) : (
              Searchs.length > 0 ? (
                Searchs.map((el) => (
                  <div key={el.id} className='col-12 '>
                    <div className='col-12 d-flex align-items-center justify-content-between '>
                      <div className={styles.imgdiv + " col-4"}>
                        <img src={`${domain}/${el.image}`} width={280} alt="" style={{ borderRadius: "50%" }} />
                      </div>
                      <div className={styles.contantdata + " col-7 d-flex flex-column"}>
                        <div className='ps-5 py-3 d-flex flex-column gap-3'>
                          <div className='d-flex flex-column gap-1'>
                            <Link className='nav-link' to={el.id ? `/DetailsDoctor/${el.id}` : '#'}>
                              <h4>Dr: {el.fullName}</h4>
                            </Link>
                            <span>{el.specialization}</span>
                            <p className='col-6'>{el.bio}</p>
                          </div>
                          <div className={styles.divicons + " d-flex gap-3"}>
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
                              <Link to={`/DetailsDoctor/${el.id}/tests`} className='nav-link'>
                                <span>Have the test <GoArrowRight /></span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <h4>No results found.</h4>
                </div>
              )
            )
          }



          <div className="d-flex justify-content-center gap-3 py-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            <span className="align-self-center">Page {page}</span>

            <button
              className="btn btn-outline-primary"
              onClick={() => setPage(page + 1)}
              disabled={doctors.length < pageSize}
            >
              Next
            </button>
          </div>


        </div>

      </div>
    </div>
  )
}
