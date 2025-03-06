import React from 'react'
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
export default function Finddoctor() {
  return (
    <div className={styles.parent}>
      <Nav />
      <div className={styles.contandivcenter + ' container   d-flex align-items-center justify-content-center'}>
        <div className={styles.div1 + ' col-11 px-4  d-flex flex-column  gap-5'}>
          <div className={styles.divresearsh + ' col-12 d-flex flex-wrap flex-row justify-content-between align-items-center'} >
            <span className='d-flex gap-1'><Link className='nav-link' to={"/"}>Home</Link> / <Link to={"/Finddoctor"} className='nav-link'>Doctors</Link></span>
            <div className={styles.divinput + ' col-6 col-md-4 col-lg-2   px-md-2 rounded-5 d-flex  align-items-center  py-md-2'}>
              <input className='col-8 col-md-8 ms-3' placeholder='Search Doctors' type="text" />
              <img className='ms-2 ms-md-3' src={iconsearch} width="25px" height="25px" alt="" />
            </div>

          </div>
          <div className={styles.doctorswiper + " d-flex flex-column gap-4 pb-5"}>
            <span>Top Rated</span>
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
                <SwiperSlide> <Card className={styles.Cardstyl} style={{ width: '22rem' }}>
                <Card.Img variant="top" src={girle} />
                <Card.Body>
                  <Card.Title className={styles.titlecard}>Dr: Esraa Nagy</Card.Title>
                  <Card.Img src={star} style={{ width: "100px" }} />
                  <Card.Text className={styles.textcaed}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Link className={styles.linkcard + ' nav-link btn rounded-5 py-1'}>Enroll</Link>
                </Card.Body>
              </Card></SwiperSlide>
                <SwiperSlide> <Card className={styles.Cardstyl} style={{ width: '22rem' }}>
                <Card.Img variant="top" src={girle} />
                <Card.Body>
                  <Card.Title className={styles.titlecard}>Dr: Esraa Nagy</Card.Title>
                  <Card.Img src={star} style={{ width: "100px" }} />
                  <Card.Text className={styles.textcaed}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Link className={styles.linkcard + ' nav-link btn rounded-5 py-1'}>Enroll</Link>
                </Card.Body>
              </Card></SwiperSlide>
                <SwiperSlide> <Card className={styles.Cardstyl} style={{ width: '22rem' }}>
                <Card.Img variant="top" src={girle} />
                <Card.Body>
                  <Card.Title className={styles.titlecard}>Dr: Esraa Nagy</Card.Title>
                  <Card.Img src={star} style={{ width: "100px" }} />
                  <Card.Text className={styles.textcaed}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Link className={styles.linkcard + ' nav-link btn rounded-5 py-1'}>Enroll</Link>
                </Card.Body>
              </Card></SwiperSlide>
                <SwiperSlide> <Card className={styles.Cardstyl} style={{ width: '22rem' }}>
                <Card.Img variant="top" src={girle} />
                <Card.Body>
                  <Card.Title className={styles.titlecard}>Dr: Esraa Nagy</Card.Title>
                  <Card.Img src={star} style={{ width: "100px" }} />
                  <Card.Text className={styles.textcaed}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Link className={styles.linkcard + ' nav-link btn rounded-5 py-1'}>Enroll</Link>
                </Card.Body>
              </Card></SwiperSlide>
                <SwiperSlide> <Card className={styles.Cardstyl} style={{ width: '22em' }}>
                <Card.Img variant="top" src={girle} />
                <Card.Body>
                  <Card.Title className={styles.titlecard}>Dr: Esraa Nagy</Card.Title>
                  <Card.Img src={star} style={{ width: "100px" }} />
                  <Card.Text className={styles.textcaed}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Link className={styles.linkcard + ' nav-link btn rounded-5 py-1'}>Enroll</Link>
                </Card.Body>
              </Card></SwiperSlide>
                <SwiperSlide> <Card className={styles.Cardstyl} style={{ width: '22rem' }}>
                <Card.Img variant="top" src={girle} />
                <Card.Body>
                  <Card.Title className={styles.titlecard}>Dr: Esraa Nagy</Card.Title>
                  <Card.Img src={star} style={{ width: "100px" }} />
                  <Card.Text className={styles.textcaed}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Text>
                  <Link className={styles.linkcard + ' nav-link btn rounded-5 py-1'}>Enroll</Link>
                </Card.Body>
              </Card></SwiperSlide>
                
              </Swiper>
            </div>
          </div>
          

          </div>
        </div>
          <div className={styles.div2}>

      </div>
    </div>
  )
}
