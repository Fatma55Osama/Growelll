import React from 'react'
import bgimgerror from '../../assets/404-error-page-examples-65ccb7d85bc41-sej.webp'
import './index.scss'
import { Link } from 'react-router-dom'
export default function Errorpage() {
 

  return (

    <div className='imgesbg d-flex flex-column justify-content-end'>
      <div className='  d-flex flex-column justify-content-center align-items-center  mb-5'><Link className='col-12 d-flex justify-content-center' l to="/"><button className='goback rounded-5 col-3 py-2'> Go Back Home</button></Link></div>

    </div>

  )
}
