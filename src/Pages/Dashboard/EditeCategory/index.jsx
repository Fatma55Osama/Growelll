import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { usedomain } from '../../../Store'
import { show_singletestdoctor } from '../../../data/API/show_singletestdoctor'
import { getData } from '../../../data/Repo/getData'
export default function EditeCategory() {
    const params = useParams()
    let id = params.id
    const { domain } = usedomain()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        getData.get_show_singleCategory(domain, id, tokenDoctor).then((res) => {


            setName(res.name || '');
            setDescription(res.description || '');
        })
            .catch((err) => {
                console.error("Error fetching Category data:", err);
            });
    }, [id]);

    const handelEditCategory = (e) => {
        e.preventDefault()
        if (
            !name || !description ) {
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
        axios.put(`https://localhost:7071/api/Category/Edit/${id}`, {
            "name": name,
            "description": description,

            
        }, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`,
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Category Updated',
                    text: 'Category updated successfully.',
                });
                setError('');
                navigate('/category')
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
                    <Link to={'/category'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{ fontSize: "50px" }} /></Link>
                    <h2> Edit Category </h2>
                    <form onSubmit={handelEditCategory} action="" className='col-12 mt-5 d-flex flex-column gap-5'>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {error?.name && <div className="text-danger">{error?.name[0]}</div>}

                            </div>


                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {error?.description && <div className="text-danger">{error?.description[0]}</div>}

                            </div>


                        </div>




                        <div className='d-flex justify-content-center'>

                            <button type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-3 '}> Save Changes </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
