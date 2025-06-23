import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useCategory, usedomain } from '../../../Store'
import { show_singletestdoctor } from '../../../data/API/show_singletestdoctor'
import { getData } from '../../../data/Repo/getData'
export default function EditeTest() {
    const params = useParams()
    let id = params.id
    const { domain } = usedomain()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
    const [error, setError] = useState('');
    const [testName, setTestName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [isActive, setisActive] = useState('');
    const { category, setcategory } = useCategory()

    const navigate = useNavigate()
    useEffect(() => {
        show_singletestdoctor(domain, id, tokenDoctor).then((res) => {
            setTestName(res.testName || '');
            setDescription(res.description || '');
            setCategoryID(res.categoryID?.toString() ?? '');
            setNumberOfQuestions(res.numberOfQuestions?.toString() ?? '');
            setisActive(res.isActive === true || res.isActive === "true");
        })
            .catch((err) => {
                console.error("Error fetching test data:", err);
            });

    }, [id]);
    useEffect(() => {
        getData.get_store_Category(domain, tokenDoctor).then((res) => {
            setcategory(res)
            console.log("get_store_Category", res)
        })
            .catch((err) => {
                console.error("Error fetching Category data:", err);
            });
    }, [])
    const handelEditTest = (e) => {
        e.preventDefault()
        if (
            !testName ||
            !description ||
            !categoryID ||
            !numberOfQuestions
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all the required fields.',
            });
            return;
        }
        // if (!numberOfQuestions) {
        //     setError('Please enter Number Of Questions.');
        //     return;
        // }
        axios.put(`https://localhost:7071/api/Test/Edit/${id}`, {
            "testName": testName,
            "description": description,
            "categoryID": parseInt(categoryID),
            'numberOfQuestions': Number(numberOfQuestions),
            'isActive': isActive,
        }, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`,
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Test Updated',
                    text: 'Test updated successfully.',
                });
                setError('');
                navigate('/test')
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
                });

            });
    }
    return (
        <div className='col-12' id={styles.parent}>
            <div className='container  d-flex justify-content-center ' id={styles.create}>
                <div className='col-10 d-flex flex-column'>
                    <Link to={'/test'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{ fontSize: "50px" }} /></Link>
                    <h2> Edit Test </h2>
                    <form onSubmit={handelEditTest} action="" className='col-12 mt-5 d-flex flex-column gap-5'>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>TestName</label>
                                <input
                                    type="text"
                                    value={testName}
                                    onChange={(e) => setTestName(e.target.value)}
                                />
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
                                <input value={description} onChange={(e) => setDescription(e.target.value)} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your Description ' />
                                {error?.Description && <div className="text-danger">{error?.Description[0]}</div>}

                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>CategoryID</label>
                                <select value={categoryID} onChange={(e) => setCategoryID(e.target.value)}>
                                    {/* <option value=""></option> */}
                                    {Array.isArray(category) && category?.map((el) => {
                                        console.log('categoryID', categoryID)
                                        return (
                                            <option key={el.categoryID} value={el.categoryID}>{el.name}</option>

                                        )
                                    })}
                                </select>
                                {/* <input value={categoryID} onChange={(e) => setCategoryID(e.target.value)} className='py-2 col-10' type="number" placeholder='  Please Enter your CategoryID ' /> */}
                                {error?.CategoryID && <div className="text-danger">{error?.CategoryID[0]}</div>}


                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Number Of Question</label>
                                <input value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} className='py-2 col-12 col-md-10' type="number" placeholder='  Please Enter your Number Of Test ' />
                                {error?.NumberOfQuestions && <div className="text-danger">{error?.NumberOfQuestions[0]}</div>}

                            </div>
                            <div className='col-10 col-md-6 d-flex gap-2  justify-content-start align-items-center '>
                                <label>isActive</label>
                                <input
                                    checked={isActive}
                                    onChange={(e) => { console.log("Checked:", e.target.checked); setisActive(e.target.checked) }}
                                    type="checkbox"
                                />                            </div>


                        </div>


                        {error?.updatedTest && <div className="text-danger">{error.updatedTest[0]}</div>}


                        <div className='d-flex justify-content-center'>

                            <button type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-3 '}> Save Changes </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
