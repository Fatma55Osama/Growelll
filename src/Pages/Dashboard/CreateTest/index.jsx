import React, { useRef } from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { getData } from '../../../data/Repo/getData'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function CreateTest() {
//   {
//   
//   "testName": "string",
//   "description": "string",
//   "categoryID": 2147483647,
//   "numberOfQuestions": 100,
//   "isActive": true
// }
    const testName = useRef()
    const description = useRef()
    const categoryID = useRef()
    const numberOfQuestions = useRef()
    const isActive = useRef()
    
    // const DoctorID = useRef()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    const handelCreateTest = (e) => {
           e.preventDefault();

        let testNamevalue = testName.current.value
        let descriptionvalue = description.current.value
        let categoryIDvalue = categoryID.current.value
        let numberOfQuestionsvalue = numberOfQuestions.current.value
        let isActive4value = isActive.current.value
       
        // let DoctorIDvalue = DoctorID.current.value

        if (!testNamevalue || !descriptionvalue || !categoryIDvalue || !numberOfQuestionsvalue || !isActive4value ) {
            Swal.fire({
                icon: "warning",
                text: "All fields are required"
            })
            return
        }
        axios.post('https://localhost:7071/api/Test/Create', {
            "testName": testName.current.value,
            "description": description.current.value,
            "categoryID": categoryID.current.value,
            "numberOfQuestions": numberOfQuestions.current.value,
            "isActive": isActive.current.checked,
         
        }, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`
            }
        }).then((res) => {
            console.log("create Test", res)
            Swal.fire({
                icon: 'success',
                title: 'Submitted Successfully Test!',
                text: 'Your request has been sent.',
                confirmButtonColor: '#3085d6'
            })
        }).catch((err) => {

            console.error("create test error", err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Please try again later or check your inputs.',
                confirmButtonColor: '#d33'
            });
        })
    }
    return (
        <div className='col-12' id={styles.parent}>
            <div className='container  d-flex justify-content-center ' id={styles.create}>
                <div className='col-10 d-flex flex-column'>
                    <Link to={'/test'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{ fontSize: "50px" }} /></Link>
                    <h2>Create Test</h2>
                    <form action="" className='col-12 mt-5 d-flex flex-column gap-5' onSubmit={handelCreateTest}>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>TestName</label>
                                <input ref={testName} className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your testName ' />

                            </div>

                            {/* <div className='col-11 col-md-6 d-flex flex-column gap-2 '>
                            <label>Preferred Timer</label>
                            <input className='py-2 col-10' type="time" />
                          </div> */}

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Description</label>
                                <input ref={description} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your description ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>CategoryID</label>
                                <input ref={categoryID} className='py-2 col-10' type="number" placeholder='  Please Enter your categoryID ' />
                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Number Of Questions</label>
                                <input ref={numberOfQuestions} className='py-2 col-12 col-md-10' type="number" placeholder='  Please Enter your numberOfQuestions ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex gap-2  align-items-center '>
                                <label>isActive</label>
                                <input ref={isActive} className='py-2 ' type="checkbox" placeholder='  Please Enter your isActive ' />
                            </div>

                        </div>

                        <div className='d-flex justify-content-center'>

                            <button type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-3 '}>Save Test </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
