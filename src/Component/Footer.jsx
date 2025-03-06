import React from 'react'
import './together.scss'
import logo from '../assets/Growell.svg'

import grop from '../assets/Group 8752.png'

export default function Footer() {
    return (
        <div className='col-12'>
            <div className='col-12 div9 bg-white d-flex  align-items-end '>

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
            </div>

        </div>
    )
}
