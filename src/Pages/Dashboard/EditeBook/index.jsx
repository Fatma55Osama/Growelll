import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { usedomain } from '../../../Store'
import { show_singletestdoctor } from '../../../data/API/show_singletestdoctor'
import { Single_bookdoctor } from '../../../data/API/Single_bookdoctor'
export default function EditeBook() {
    const params = useParams()
    let id = params.id
    const { domain } = usedomain()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
    const [error, setError] = useState('');
    const [BookTitle, setBookTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [AboutOfBook, setAboutOfBook] = useState('');
    const [BookUrl, setBookUrl] = useState('');
    const [BookImage, setBookImage] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        Single_bookdoctor(domain, id, tokenDoctor).then((res) => {


            setBookTitle(res.bookTitle || '');
            setDescription(res.description || '');
            setAboutOfBook(res.aboutOfBook?.toString() ?? '');
            setBookUrl(res.bookUrl?.toString() ?? '');
            setBookImage(res.bookImagePath || '');
        })
            .catch((err) => {
                console.error("Error fetching test data:", err);
            });
    }, [id]);

    const handelEditbook = (e) => {
        e.preventDefault()
        if (
            !BookTitle ||
            !Description ||
            !AboutOfBook ||
            !BookUrl ||
            !BookImage
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

        const formData = new FormData();
        formData.append('BookTitle', BookTitle);
        formData.append('Description', Description);
        formData.append('AboutOfBook', AboutOfBook);
        formData.append('BookUrl', BookUrl);

        // الصورة: تأكد إنها File مش مجرد string
        if (typeof BookImage === 'object') {
            formData.append('BookImage', BookImage);
        }
        axios.put(`https://localhost:7071/api/BookEvent/EditBookEvent/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`,
                // 'Content-Type': 'application/json',
            }
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Book Updated',
                    text: 'Book updated successfully.',
                });
                setError('');
                navigate('/bookdoctor')
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
                    <Link to={'/bookdoctor'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{ fontSize: "50px" }} /></Link>
                    <h2> Edit Test </h2>
                    <form onSubmit={handelEditbook} action="" className='col-12 mt-5 d-flex flex-column gap-5'>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>BookTitle</label>
                                <input
                                    type="text"
                                    value={BookTitle}
                                    onChange={(e) => setBookTitle(e.target.value)}
                                />
                                {/* {error?.TestName && <div className="text-danger">{error?.TestName[0]}</div>} */}

                            </div>

                            {/* <div className='col-11 col-md-6 d-flex flex-column gap-2 '>
                            <label>Preferred Timer</label>
                            <input className='py-2 col-10' type="time" />
                          </div> */}

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Description</label>
                                <input value={Description} onChange={(e) => setDescription(e.target.value)} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your Description ' />
                                {/* {error?.Description && <div className="text-danger">{error?.Description[0]}</div>} */}

                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>AboutOfBook</label>
                                <input value={AboutOfBook} onChange={(e) => setAboutOfBook(e.target.value)} className='py-2 col-10' type="text" placeholder='  Please Enter your CategoryID ' />
                                {/* {error?.AboutOfBook && <div className="text-danger">{error?.AboutOfBook[0]}</div>} */}


                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>


                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>BookUrl</label>
                                {BookImage && typeof BookImage === 'string' && (
                                    <img src={`${domain}/${BookImage}`} alt="Current Book" style={{ width: '100px' }} />
                                )}
                                <input onChange={(e) => setBookImage(e.target.files[0])} className='py-2 col-12 col-md-10' type="file" />                                {/* {error?.BookUrl && <div className="text-danger">{error?.BookUrl[0]}</div>} */}
                                {error?.BookImage && <div className="text-danger">{error?.BookImage[0]}</div>}

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
