import React from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
export default function CreateQuestion() {
    return (
        <div className='col-12' id={styles.parent}>
            <div className='container  d-flex justify-content-center ' id={styles.create}>
                <div className='col-10 d-flex flex-column'>
                 <Link to={'/question'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{fontSize:"50px"}} /></Link> 
                    <h2>Create Question</h2>
                    <form action="" className='col-12 mt-5 d-flex flex-column gap-5'>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>QuestionText</label>
                                <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your QuestionText ' />

                            </div>

                            {/* <div className='col-11 col-md-6 d-flex flex-column gap-2 '>
                            <label>Preferred Timer</label>
                            <input className='py-2 col-10' type="time" />
                          </div> */}

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>AnswerOption1</label>
                                <input className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your AnswerOption1 ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>AnswerOption2</label>
                                <input className='py-2 col-10' type="text" placeholder='  Please Enter your AnswerOption2 ' />
                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>AnswerOption3</label>
                                <input className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your AnswerOption3 ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>AnswerOption4</label>
                                <input className='py-2 col-10' type="text" placeholder='  Please Enter your AnswerOption4 ' />
                            </div>

                        </div>

                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>CorrectAnswer</label>
                            <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your CorrectAnswer ' />

                        </div>

                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>OrderNumber</label>
                            <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your OrderNumber ' />

                        </div>


                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>OrderNumber</label>
                            <input className='py-2 col-11' type="date"
                                min={new Date().toISOString().split('T')[0]}
                                max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} />
                        </div>
                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>testID</label>
                            <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your testID ' />

                        </div>
                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>DoctorID</label>
                            <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your DoctorID ' />

                        </div>
                        <div className='d-flex justify-content-center'>

                        <button type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-3 '}>Save Question </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
