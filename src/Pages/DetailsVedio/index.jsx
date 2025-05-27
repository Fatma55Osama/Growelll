import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import slid1 from '../../assets/Rectangle 136.png';
import slid2 from '../../assets/Rectangle 138.png';
import slid3 from '../../assets/Rectangle 139.png';
import strar from '../../assets/Group 8773.png'
import line from '../../assets/Line 27.png'
// import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import { usedetailsevent, usedomain, useModalevedio, usePlay } from '../../Store';
import { useParams } from 'react-router-dom';
import { getData } from '../../data/Repo/getData';
export default function DetailsVedio() {
    const [swiperRef, setSwiperRef] = useState(null);
    const { isplaying, setIsplaying } = usePlay()

    const params = useParams()
    const { domain } = usedomain()
    const { event, setdetailsevent } = usedetailsevent()
    const { modalindex, openModal, closeModal } = useModalevedio()
    function getYoutubeId(url) {
        if (!url || typeof url !== 'string') return null;

        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    let id = params.id
    useEffect(() => {

        // getdetailsevent
        getData.get_show_singlevent(domain, id).then((res) => {
            setdetailsevent(res)
            console.log(res)
        }).catch((err) => console.log(err))

    }, [])
    return (
        <div className={`${styles.parents} col-12  d-flex flex-column `}>
            <div className={` ${styles.scrollswiper} col-12 `}>

                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide> <img src={slid1} className="d-block w-100" height={576} alt="..." /></SwiperSlide>
                    {/* <SwiperSlide> <img src={slid1} className="d-block w-100" alt="..." /></SwiperSlide>
                    <SwiperSlide> <img src={slid1} className="d-block w-100" alt="..." /></SwiperSlide> */}

                </Swiper>


            </div>

            <div className={`${styles.div2paragraph}   col-12 mt-5 d-flex justify-content-center align-items-center `}>
                <div className={`${styles.divblue} col-10 col-md-11 col-lg-8 py-3   `}>
                    <div className='container col-md-11 d-flex flex-column '>
                        <div className=' d-flex justify-content-between align-content-center'>
                            <h4 className='col-9'>{event.videoTitle}</h4>
                            <button className='rounded-1 px-2 px-md-4 py-1 '>50/50 <img className='mb-1 ms-2' src={strar} width="40px" alt="" /></button>
                        </div>
                        <div className='col-md-10'> <p className='mt-3 mt-md-4'>{event.description}</p>
                            {/* <p classNam-3 mb-md-5'>t velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p> */}
                        </div>

                    </div>
                </div>
            </div>

            <div className={`${styles.div3swiper}  col-12  d-flex flex-column justify-content-center `}>

                <div className='container col-lg-8 pb-5 d-flex justify-content-center flex-column align-items-center  '>
                    <h3 className='text-center me-3'>Watch the video</h3>
                    {/* <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={2}
                        centeredSlides={true}
                        spaceBetween={0}

                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                        initialSlide={1}
                    >
                        <SwiperSlide className='slid2'><img src={slid2} alt="" width={400} height={300} /></SwiperSlide>
                        <SwiperSlide className={`${styles.slid1}`}><img src={`${domain}${event.videoImagePath}`} alt="" width={450} height={300} /></SwiperSlide>
                        <SwiperSlide className='slid3'><img src={slid3} alt="" width={400} height={300} /></SwiperSlide>
                    </Swiper> */}
                       <div className={`rounded-4 mb-5 position-relative d-flex justify-content-center flex-column align-items-center  ${styles.videodiv} `}>
                        {
                            !isplaying && (
                                <div className={styles.bgcontainerimg + ' position-relative col-10 h-100 d-flex justify-content-center align-items-center '}>
                                    <img src={`${domain}${event.videoImagePath}`} className={styles.bgimg} style={{ objectFit: "cover", backgroundAttachment: "fixed" ,borderRadius:"20px",width:"778px",height:"440px"}} alt="" />
                                    <div className={styles.filter}></div>
                                    <button onClick={() => openModal(true)} className='position-absolute bg-white d-flex justify-content-center align-items-center' id={styles.button1}>
                                        <span></span>
                                    </button>

                                </div>
                            )
                        }

                    </div>
                    <div className='col-11  d-flex justify-content-around mt-5'>
                        <a href={event.videoUrl} target="_blank"> <button className={`${styles.btn1} `}>Play Now</button></a>
                        <button className={`${styles.btn2} px-2`}><img src={line} width={40} alt="" /></button>
                    </div>
                 
                </div>



            </div>
            {
                modalindex && (
                    <div onClick={() => closeModal()} className={styles.modal2 + " d-flex justify-content-center align-items-center "}>
                        <div onClick={(e) => e.stopPropagation()} className={styles.contentModal2}>
                            {event?.videoUrl && getYoutubeId(event.videoUrl) && (
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYoutubeId(event.videoUrl)}`}
                                    width="800"
                                    height="700"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}                        </div>
                    </div>)
            }
        </div>
    )
}
