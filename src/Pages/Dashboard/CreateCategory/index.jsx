import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { postcreatecategory } from '../../../data/API/createcategory';
import { usedomain } from '../../../Store';
import styles from './index.module.css'
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
export default function CreateCategory() {
    const { domain } = usedomain()
    const name = useRef()
    const description = useRef()
    const [error, setError] = useState()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
    const handelCreatecategory = (e) => {
        e.preventDefault()
        let namevalue = name.current.value
        let descriptionvalue = description.current.value
        if (!namevalue || !descriptionvalue) {
            Swal.fire({
                icon: "warning",
                text: "All fields are required"
            })
            return
        }
        let values = [namevalue, descriptionvalue];
        console.log(values)
        postcreatecategory(domain, tokenDoctor, values).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Submitted Successfully Test!',
                text: 'Your request has been sent.',
                confirmButtonColor: '#3085d6'
            })
            name.current.value = '';
            description.current.value = '';
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
            setError(err.response.data.errors)
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Please try again later or check your inputs.',
                confirmButtonColor: '#d33'
            });
        })


    }

    return (
        <div className={styles.createCategory}>
            <div className='container  d-flex justify-content-center ' id={styles.create}>
                <div className='col-10 d-flex flex-column'>
                    <Link to={'/category'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{ fontSize: "50px" }} /></Link>
                    <h2>Create Category</h2>
                    <form action="" className='col-12 mt-5 d-flex flex-column gap-5' onSubmit={handelCreatecategory}>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>Category Name</label>
                                <input ref={name} className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your category name ' />
                                {error?.name && <div className="text-danger">{error?.name[0]}</div>}
                            </div>


                        </div>


                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>Description</label>
                                <input ref={description} className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your description ' />
                                {error?.description && <div className="text-danger">{error?.description[0]}</div>}
                            </div>


                        </div>





                        <div className='d-flex justify-content-center'>

                            <button type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-3 '}>Save Category </button>
                        </div>

                    </form>
                </div>

            </div></div>
    )
}
