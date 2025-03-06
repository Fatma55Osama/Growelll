import React, { useEffect, useState } from 'react'
import loder from '../../assets/loder design.gif' 
import './Loader.scss'
import logo from '../../assets/Growell.svg'
import blog3 from '../../assets/Blob 3.png'
import blog4 from '../../assets/Blob 4 (1).png'
export default function Loader() {
   
  return (
    <div className='loadercontiner col-12  d-flex justify-content-center align-items-center align-content-center '>
        <div className=' mt-3 animatimg  d-flex justify-content-center align-items-center align-content-center'>
                <img className='animate__animated animate__bounceInUp ' src={logo} width="352px" height="187px" alt="" />
        </div>
         <div className='col-12 part2  '>
             <img src={blog3} alt="" />
             <img  src={blog4} style={{marginRight: "125px" }} alt="" />
         </div>
    </div>
  )
}
