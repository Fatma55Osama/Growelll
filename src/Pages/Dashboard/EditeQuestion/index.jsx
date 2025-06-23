import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { getData } from '../../../data/Repo/getData'
import { useDoctorTest, usedomain } from '../../../Store'
export default function EditeQuestion() {
    const params = useParams()
    let id = params.id
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
    const [error, setError] = useState('');

    const [questionText, setQuestionText] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [createdBy, setcreatedBy] = useState('');
    const [testID, setTestID] = useState('');
    const createdAt = new Date().toISOString();
    const { domain } = usedomain()
    const { Doctortest, setDoctortest } = useDoctorTest()
    useEffect(() => {
        if (tokenDoctor) {
            getData.get_store_test(tokenDoctor, domain).then((res) => {
                console.log("Doctorstore_Doctortest", res);
                setDoctortest(res)
                // navigat('/question')
            }).catch((err) => {
                console.log(err)
            })
        } else {
            navigate('/')
        }
        axios.get(`${domain}/api/Question/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`
            }
        })
            .then((res) => {
                const data = res.data.data;
                console.log(res.data.data)
                setQuestionText(data.questionText || '');
                setAnswer1(data.answerOption1 || '');
                setAnswer2(data.answerOption2 || '');
                setAnswer3(data.answerOption3 || '');
                setAnswer4(data.answerOption4 || '');
                setCorrectAnswer(data.correctAnswer || '');
                setOrderNumber(data.orderNumber || '');
                setTestID(data.testID || '');
                setcreatedBy(data.createdBy || '');
            })
            .catch((err) => {
                console.error("Error fetching question data:", err);
            });
    }, [id]);

    const handelEditQuestion = (e) => {
        e.preventDefault()
        if (
            !questionText ||
            !answer1 ||
            !answer2 ||
            !answer3 ||
            !answer4 ||
            !correctAnswer ||
            !orderNumber ||
            !testID ||
            !createdBy
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all the required fields.',
            });
            return;
        }

        axios.put(`https://localhost:7071/api/Question/Edit/${id}`, {
            "questionText": questionText,
            "answerOption1": answer1,
            "answerOption2": answer2,
            'answerOption3': answer3,
            'answerOption4': answer4,
            'correctAnswer': correctAnswer,
            'orderNumber': orderNumber,
            'testID': testID,
            'createdBy': createdBy,
            'createdAt': new Date().toISOString(),
        }, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`,
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Question Updated',
                    text: 'Question updated successfully.',
                });
                setError('')
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    const validationErrors = err.response.data.errors;
                    if (validationErrors) {
                        console.log("Validation errors:", validationErrors);
                        setError(validationErrors);
                    } else {
                        setError({ general: [err.response.data.message || "Unknown error occurred"] });
                    }
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: err.message || 'Failed to update question.',
                });

            });
    }
    return (
        <div className='col-12' id={styles.parent}>
            <div className='container  d-flex justify-content-center ' id={styles.create}>
                <div className='col-10 d-flex flex-column'>
                    <Link to={'/question'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{ fontSize: "50px" }} /></Link>
                    <h2> Edit Question </h2>
                    <form onSubmit={handelEditQuestion} action="" className='col-12 mt-5 d-flex flex-column gap-5'>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>QuestionText</label>
                                <input
                                    type="text"
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                />
                                {error.QuestionText && <div className="text-danger">{error.QuestionText[0]}</div>}

                            </div>

                            {/* <div className='col-11 col-md-6 d-flex flex-column gap-2 '>
                            <label>Preferred Timer</label>
                            <input className='py-2 col-10' type="time" />
                          </div> */}

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>AnswerOption1</label>
                                <input value={answer1} onChange={(e) => setAnswer1(e.target.value)} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your AnswerOption1 ' />

                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>AnswerOption2</label>
                                <input value={answer2} onChange={(e) => setAnswer2(e.target.value)} className='py-2 col-10' type="text" placeholder='  Please Enter your AnswerOption2 ' />
                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>AnswerOption3</label>
                                <input value={answer3} onChange={(e) => setAnswer3(e.target.value)} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your AnswerOption3 ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>AnswerOption4</label>
                                <input value={answer4} onChange={(e) => setAnswer4(e.target.value)} className='py-2 col-10' type="text" placeholder='  Please Enter your AnswerOption4 ' />
                            </div>

                        </div>

                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>CorrectAnswer</label>
                            <input value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your CorrectAnswer ' />

                        </div>

                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>OrderNumber</label>
                            <input value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} className='py-2 col-12 col-md-11' type="number" placeholder='  Please Enter your OrderNumber ' />

                        </div>


                        {/* <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>OrderNumber</label>
                            <input className='py-2 col-11' type="date"
                                min={new Date().toISOString().split('T')[0]}
                                max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} />
                        </div> */}
                        <div className='col- col-md-12 d-flex flex-column gap-2'>
                            <label>testID</label>
                            <select valu12e={testID} onChange={(e) => setTestID(e.target.value)} className='py-2 col-12 col-md-11'>
                                {Doctortest.map((el) => (
                                    <option value={el.testId} key={el.testId}>{el.testName}</option>
                                ))}

                            </select>
                            {/* <input value={testID} onChange={(e) => setTestID(e.target.value)} className='py-2 col-12 col-md-11' type="number" placeholder='  Please Enter your testID ' /> */}

                        </div>
                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>createdBy</label>
                            <input value={createdBy} onChange={(e) => setcreatedBy(e.target.value)} className='py-2 col-12 col-md-11' type="number" placeholder='  Please Enter your testID ' />
                        </div>
                        {/* <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>DoctorID</label>
                            <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your DoctorID ' />

                        </div> */}
                        <div className='d-flex justify-content-center'>

                            <button type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-3 '}> Save Changes </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
