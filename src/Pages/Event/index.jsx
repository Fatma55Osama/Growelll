import React from 'react'
import Footer from '../../Component/Footer'
import Nav from '../../Component/Nav'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $active, $booksState, $eventsState } from '../../Store'
import './index.scss'
import iconsearch from '../../assets/Vector.png'
import { Link } from 'react-router-dom'
export default function Event() {
  const events = useRecoilValue($eventsState);
  const books = useRecoilValue($booksState);
  return (
    <div className='col-12 parentspage'>
      <Nav/>
      <div className='col-12  div1page '>

        <div className='col-10 col-lg-8 divresearsh   '>
          <div className='col-12 d-flex flex-wrap flex-row justify-content-between' >
            <span className='d-flex gap-1'><Link className='nav-link' to={"/"}>Home</Link> / <Link to={"/Event"} className='nav-link'>Event</Link></span>
            <div className='col-6 col-md-4 col-lg-3 divinput  px-md-2 rounded-5 d-flex  align-items-center  py-md-2'>
              <input className='col-8 col-md-8 ms-3' placeholder='Search Doctors' type="text" />
              <img className='ms-2 ms-md-3' src={iconsearch} width="25px" height="25px" alt="" />
            </div>

          </div>
          <div className='col-12 div2page d-flex flex-column gap-5'>
            <h3>Events</h3>
            <div className='col-11 col-lg-11 col-md-12 divcard d-flex justify-content-between flex-wrap gap-4 gap-lg-5'>
              {
                events.map((el, index) => {
                  return (
                    <div className="card card1 d-flex flex-column justify-content-center align-content-center align-items-center" style={{ width: "19rem" }} key={index}>
                      <img src={el.img} className="card-img-top mt-3" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title mb-1">{el.name}</h5>
                        <p className="card-text">{el.descript}</p>
                        <Link to={`/DetailsEvent/${el.id}`} className="btn  col-12 rounded-5">Enroll</Link>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='col-10 ms-3 ms-md-5 mt-5 hrline'>
            </div>
          </div>
        </div>

      </div>

      <div className='divbooks col-12 d-flex justify-content-center'>
        <div className='col-10 col-lg-8 '>
          <div className='col-12 col-lg-11 col-md-12 mt-5 mb-5 divcard d-flex justify-content-between flex-wrap gap-4 gap-lg-5'>
            {
              books.map((el, index) => {
                return (
                  <div className="card card1 d-flex flex-column justify-content-center align-content-center align-items-center" style={{ width: "19rem" }} key={index}>
                    <img src={el.img} className="card-img-top mt-3" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title mb-1">{el.name}</h5>
                      <p className="card-text">{el.descript}</p>
                      <Link className="btn  col-12 rounded-5">Enroll</Link>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

     <Footer/>
    </div>
  )
}
