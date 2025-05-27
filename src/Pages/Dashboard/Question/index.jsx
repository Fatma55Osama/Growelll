import React from 'react'
import styles from './index.module.css'
import doctor from '../../../assets/Frame.png'
import { Link } from 'react-router-dom'
import { CiClock2 } from "react-icons/ci";
import { GoArrowRight } from 'react-icons/go';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
export default function Question() {
    return (
        <div className={styles.parent}>
            <div className='d-flex justify-content-center ' id={styles.question1}>
                <div className='d-flex justify-content-center container'>
                    <div className={styles.div2 + " container   justify-content-center d-flex align-items-center mt-5"}>

                        <img src={doctor} width={190} height={199} alt="" />
                        <div className={styles.contantdata + " col-5 d-flex flex-column"}>
                            <div className="ps-3 py-3 d-flex flex-column gap-3">
                                <div className="d-flex flex-column gap-1 container">
                                    <h4>Dr:nmbmbmbnmbmm</h4>
                                    <span>hmhhhhhhhhhhhhh</span>
                                    <p className='col-6'>tdhdghdh</p>
                                    {/* <span>Date: {new Date(report[0]?.takenAt).toLocaleDateString()}</span> */}
                                </div>
                            </div>
                            <div className={styles.HaveTest + " px-5 py-4"}>
                                {/* <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center gap-2'>
                                    <CiClock2 />
                                    <span>Avaibility</span>
                                </div>
                                <div>
                                    <Link className='nav-link' ><span>Have the test <GoArrowRight /></span></Link>
                                </div>
                            </div> */}

                            </div>
                        </div>
                    </div>
                    <div className=' col-2 d-flex justify-content-end align-items-end'>
                        <Link className='nav-link text-white py-4 px-4 me-4' to={'/createquestion'} id={styles.btnadd}> <IoIosAddCircleOutline /> Add new Questions</Link>
                    </div>
                </div>

            </div>



            <div className={styles.divqqa}>
                <div className='container col-10' id={styles.Qa}>
                    <div className='text-white container d-flex justify-content-between align-items-center' id={styles.singleqa}>
                        <div className='ms-3 py-3 d-flex flex-column  gap-2'>
                            <h6 className=''>Q1</h6>
                            <div className=' ms-3 d-flex flex-column gap-2 mb-4'>
                                <h4>what is 4+4 ?</h4>
                                <div className='d-flex gap-5'>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.icon + " d-flex gap-5 me-3"}>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><FiEdit /><span>Edit</span></Link>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><RiDeleteBin6Line /><span>Delete</span></Link>
                        </div>
                    </div>
                </div>
                <div className='container col-10' id={styles.Qa}>
                    <div className='text-white container d-flex justify-content-between align-items-center' id={styles.singleqa}>
                        <div className='ms-3 py-3 d-flex flex-column  gap-2'>
                            <h6 className=''>Q1</h6>
                            <div className=' ms-3 d-flex flex-column gap-2 mb-4'>
                                <h4>what is 4+4 ?</h4>
                                <div className='d-flex gap-5'>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.icon + " d-flex gap-5 me-3"}>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><FiEdit /><span>Edit</span></Link>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><RiDeleteBin6Line /><span>Delete</span></Link>
                        </div>
                    </div>
                </div>
                <div className='container col-10' id={styles.Qa}>
                    <div className='text-white container d-flex justify-content-between align-items-center' id={styles.singleqa}>
                        <div className='ms-3 py-3 d-flex flex-column  gap-2'>
                            <h6 className=''>Q1</h6>
                            <div className=' ms-3 d-flex flex-column gap-2 mb-4'>
                                <h4>what is 4+4 ?</h4>
                                <div className='d-flex gap-5'>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.icon + " d-flex gap-5 me-3"}>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><FiEdit /><span>Edit</span></Link>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><RiDeleteBin6Line /><span>Delete</span></Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
