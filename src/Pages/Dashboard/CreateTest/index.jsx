import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { getData } from '../../../data/Repo/getData'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useCategory, usedomain } from '../../../Store'
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
    const [error, setError] = useState()
    const { domain } = usedomain()
    const { category, setcategory } = useCategory()


    // const DoctorID = useRef()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
    useEffect(() => {
        getData.get_store_Category(domain, tokenDoctor).then((res) => {
            setcategory(res)
            console.log(res)
        })
            .catch((err) => {
                console.error("Error fetching Category data:", err);
            });
    }, [])
    const handelCreateTest = (e) => {
        e.preventDefault();
        if (!testName.current || !description.current || !categoryID.current || !numberOfQuestions.current || !isActive.current) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Form inputs are not ready yet. Please wait a moment.',
            });
            return;
        }
        let testNamevalue = testName.current.value
        let descriptionvalue = description.current.value
        let categoryIDvalue = categoryID.current.value
        let numberOfQuestionsvalue = numberOfQuestions.current.value
        let isActive4value = isActive.current.checked

        // let DoctorIDvalue = DoctorID.current.value
        console.log("categoryID.current is:", categoryID.current)

        if (!testNamevalue || !descriptionvalue || !categoryIDvalue || !numberOfQuestionsvalue) {
            Swal.fire({
                icon: "warning",
                text: "All fields are required"
            });
            return;
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
            testName.current.value = '';
            description.current.value = '';
            categoryID.current.value = '';
            numberOfQuestions.current.value = '';
            isActive.current.checked = false;
            setError('')
        }).catch((err) => {

            console.error("create test error", err);

            if (err.response && err.response.data) {
                const validationErrors = err.response.data.errors;
                if (validationErrors) {
                    console.log("Validation errors:", validationErrors);
                    setError(validationErrors);
                } else {
                    setError({ general: [err.response.data.message || "Unknown error occurred"] });
                }
            }
            setError(err.response.data.errors)
            console.error("Error fetching Category data:", err);
            Swal.fire({
                icon: "error",
                text: "Failed to load categories. Please refresh the page.",
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
                                {error?.TestName && <div className="text-danger">{error?.TestName[0]}</div>}
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
                                <select ref={categoryID} className='py-2 col-10'>
                                    <option value="">-- Select a category --</option>
                                    {Array.isArray(category) && category.map((el) => (
                                        <option className='text-black' key={el.categoryID} value={el.categoryID}>{el.name}</option>
                                    ))}

                                </select>
                                {/* <input ref={categoryID} className='py-2 col-10' type="number" placeholder='  Please Enter your categoryID ' /> */}
                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Number Of Questions</label>
                                <input ref={numberOfQuestions} className='py-2 col-12 col-md-10' type="number" placeholder='  Please Enter your numberOfQuestions ' />
                                {error?.NumberOfQuestions && <div className="text-danger">{error?.NumberOfQuestions[0]}</div>}

                            </div>

                            <div className='col-10 col-md-6 d-flex gap-2  align-items-center '>
                                <label>isActive</label>
                                <input ref={isActive} className='py-2 ' type="checkbox" placeholder='  Please Enter your isActive ' />
                            </div>

                        </div>

                        <div className='d-flex justify-content-center'>

                            <button disabled={category.length === 0} type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-3 '}>Save Test </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
