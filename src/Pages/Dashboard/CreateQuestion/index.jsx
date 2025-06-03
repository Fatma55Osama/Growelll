import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { getData } from '../../../data/Repo/getData'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function CreateQuestion() {
    //     {
    //   "questionID": 0,
    //   "questionText": "string",
    //   "answerOption1": "string",
    //   "answerOption2": "string",
    //   "answerOption3": "string",
    //   "answerOption4": "string",
    //   "correctAnswer": "string",
    //   "orderNumber": 2147483647,
    //   "createdBy": 0,
    //   "createdAt": "2025-05-29T12:59:56.436Z",
    //   "testID": 0,
    // "DoctorID":"24"
    // }
    const questionText = useRef()
    const answerOption1 = useRef()
    const answerOption2 = useRef()
    const answerOption3 = useRef()
    const answerOption4 = useRef()
    const correctAnswer = useRef()
    const orderNumber = useRef()
    const createdBy = useRef()
    const createdAt = useRef()
    const testID = useRef()
    const [error, setError] = useState('');

    // const DoctorID = useRef()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    const handelCreateQuestion = (e) => {
        e.preventDefault();

        let questionTextvalue = questionText.current.value
        let answerOption1value = answerOption1.current.value
        let answerOption2value = answerOption2.current.value
        let answerOption3value = answerOption3.current.value
        let answerOption4value = answerOption4.current.value
        let correctAnswervalue = correctAnswer.current.value
        let orderNumbervalue = orderNumber.current.value
        let createdByvalue = createdBy.current.value
        let testIDvalue = testID.current.value
        // let DoctorIDvalue = DoctorID.current.value

        if (!questionTextvalue || !answerOption1value || !answerOption2value || !answerOption3value || !answerOption4value || !correctAnswervalue || !orderNumbervalue || !createdByvalue || !testIDvalue) {
            Swal.fire({
                icon: "warning",
                text: "All fields are required"
            })
            return
        }
        axios.post('https://localhost:7071/api/Question/Create', {
            "questionText": questionText.current.value,
            "answerOption1": answerOption1.current.value,
            "answerOption2": answerOption2.current.value,
            "answerOption3": answerOption3.current.value,
            "answerOption4": answerOption4.current.value,
            "correctAnswer": correctAnswer.current.value,
            "orderNumber": orderNumber.current.value,
            "createdBy": createdBy.current.value,
            "createdAt": new Date().toISOString(),
            "testID": testID.current.value
        }, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`
            }
        }).then((res) => {
            console.log("create Questions", res)
            Swal.fire({
                icon: 'success',
                title: 'Submitted Successfully!',
                text: 'Your request has been sent.',
                confirmButtonColor: '#3085d6'
            })
            questionText.current.value=''
            answerOption1.current.value=''
            answerOption2.current.value=''
            answerOption3.current.value=''
            answerOption4.current.value=''
            correctAnswer.current.value=''
            orderNumber.current.value=''
            createdBy.current.value=''
            testID.current.value=''
            setError('')

        }).catch((err) => {
            if (err.response && err.response.data) {
                const validationErrors = err.response.data.errors;
                if (validationErrors) {
                    console.log("Validation errors:", validationErrors);
                    setError(validationErrors);
                } else {
                    setError({ general: [err.response.data.message || "Unknown error occurred"] });
                }
            }
            console.error("create question error", err);
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
                    <Link to={'/question'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{ fontSize: "50px" }} /></Link>
                    <h2>Create Question</h2>
                    <form action="" className='col-12 mt-5 d-flex flex-column gap-5' onSubmit={handelCreateQuestion}>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>QuestionText</label>
                                <input ref={questionText} className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your QuestionText ' />
                                {/* {error.TestName && <div className="text-danger">{error.TestName[0]}</div>} */}

                            </div>

                            {/* <div className='col-11 col-md-6 d-flex flex-column gap-2 '>
                            <label>Preferred Timer</label>
                            <input className='py-2 col-10' type="time" />
                          </div> */}

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>AnswerOption1</label>
                                <input ref={answerOption1} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your AnswerOption1 ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>AnswerOption2</label>
                                <input ref={answerOption2} className='py-2 col-10' type="text" placeholder='  Please Enter your AnswerOption2 ' />
                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>AnswerOption3</label>
                                <input ref={answerOption3} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your AnswerOption3 ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>AnswerOption4</label>
                                <input ref={answerOption4} className='py-2 col-10' type="text" placeholder='  Please Enter your AnswerOption4 ' />
                            </div>

                        </div>

                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>CorrectAnswer</label>
                            <input ref={correctAnswer} className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your CorrectAnswer ' />

                        </div>

                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>OrderNumber</label>
                            <input ref={orderNumber} className='py-2 col-12 col-md-11' type="number" placeholder='  Please Enter your OrderNumber ' />
                            {error.OrderNumber && <div className="text-danger">{error.OrderNumber[0]}</div>}

                        </div>


                        {/* <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>createdAt</label>
                            <input className='py-2 col-11' type="date"
                               />
                        </div> */}
                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>testID</label>
                            <input ref={testID} className='py-2 col-12 col-md-11' type="number" placeholder='  Please Enter your testID ' />
                            {error.TestID && <div className="text-danger">{error.TestID[0]}</div>}

                        </div>
                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>CreatedBy</label>
                            <input ref={createdBy} className='py-2 col-12 col-md-11' type="number" placeholder='  Please Enter your testID ' />

                        </div>
                        {/* <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>DoctorID</label>
                            <input ref={DoctorID} className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your DoctorID ' />

                        </div> */}
                        <div className='d-flex justify-content-center'>

                            <button type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-3 '}>Save Question </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
