import './index.scss'
import slid1 from '../../assets/Rectangle 136.png';
import slid2 from '../../assets/Rectangle 138.png';
import slid3 from '../../assets/Rectangle 139.png';
import strar from '../../assets/Group 8773.png'
import line from '../../assets/Line 27.png'
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './index.scss';

import { Pagination, Navigation } from 'swiper/modules';
import Nav from '../../Component/Nav';
import Footer from '../../Component/Footer';
import { useBooks, usedetailsbooks, usedetailsevent, usedomain } from '../../Store';
import { useParams } from 'react-router-dom';
import { getData } from '../../data/Repo/getData';
export default function DetailsEvent() {
    const [swiperRef, setSwiperRef] = useState(null);
  const {book,setbooks}=usedetailsbooks()
  const {event,setdetailsevent}=usedetailsevent()
  


   const params = useParams()
   const {domain} =usedomain()
   let id = params.idevent
   console.log("id this is " + id)
   useEffect(()=>{
    getData.get_show_singlebook(domain,id).then((res)=>{
      setbooks(res)
      console.log(res)
    }).catch((err)=>console.log(err))
    // getdetailsevent
     getData.get_show_singlevent(domain,id).then((res)=>{
      setdetailsevent(res)
      console.log(res)
    }).catch((err)=>console.log(err))
    
   },[])
    return (
        <div className="col-12 parents d-flex flex-column ">
            <div className="col-12 scrollswiper">

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

            <div className='div2paragraph  col-12 mt-5 d-flex justify-content-center align-items-center '>
                <div className='col-10 col-md-11 col-lg-8 py-3  divblue '>
                    <div className='container col-md-11 d-flex flex-column '>
                        <div className=' d-flex justify-content-between align-content-center'>
                            <h4>{book.bookTitle}</h4>
                            <button className='rounded-1 px-2 px-md-4 py-1 '>50/50 <img className='mb-1 ms-2' src={strar} width="40px" alt="" /></button>
                        </div>
                        <div className='col-md-10'> <p className='mt-3 mt-md-4'>{book.description}</p>
                            {/* <p className='mb-3 mb-md-5'>t velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p> */}
                            </div>

                    </div>
                </div>
            </div>

            <div className='div3swiper  col-12  d-flex flex-column justify-content-center '>

                <div className='container col-lg-8 pb-5   '>
                    <h3 className='text-center'>Tutorial</h3>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={2}
                        centeredSlides={true}
                        spaceBetween={0}

                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                        initialSlide={1}
                    >
                        {/* <SwiperSlide className='slid2'><img src={slid2} alt="" width={400} height={300} /></SwiperSlide> */}
                        <SwiperSlide className='slid1'><img src={`${domain}${book.bookImagePath}`} alt="" width={450} height={300} /></SwiperSlide>
                        {/* <SwiperSlide className='slid3'><img src={slid3} alt="" width={400} height={300} /></SwiperSlide> */}
                    </Swiper>
                    <div className='col-12  d-flex justify-content-around mt-5'>
                       <a href={book.bookUrl} target="_blank"> <button className='btn1 '>Play Now</button></a>
                        <button className='btn2 px-3'><img src={line} width={40} alt="" /></button>
                    </div>

                </div>



            </div>
        </div>
    );
}
