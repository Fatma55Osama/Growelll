import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { getData } from '../../../data/Repo/getData'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function CreateVedio() {

    const videoTitle = useRef()
    const description = useRef()
    const videoUrl = useRef()
    const aboutOfVideo = useRef()
    const VideoImage  = useRef()
    const [error, setError] = useState()

    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    const handelCreatevedio = (e) => {
        e.preventDefault();

        let videoTitlevalue = videoTitle.current.value;
        let descriptionvalue = description.current.value;
        let videoUrlvalue = videoUrl.current.value;
        let aboutOfVideovalue = aboutOfVideo.current.value;
        let VideoImagevalue = VideoImage.current.files[0];

        if (!videoTitlevalue || !descriptionvalue || !videoUrlvalue || !aboutOfVideovalue || !VideoImagevalue) {
            Swal.fire({
                icon: "warning",
                text: "All fields are required"
            });
            return;
        }

        const formData = new FormData();
        formData.append("videoTitle", videoTitlevalue);
        formData.append("description", descriptionvalue);
        formData.append("videoUrl", videoUrlvalue);
        formData.append("aboutOfVideo", aboutOfVideovalue);
        formData.append("VideoImage", VideoImagevalue);

        axios.post('https://localhost:7071/api/VideoEvent/CreateVideoEvent', formData, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            console.log("create Vedio", res);
            Swal.fire({
                icon: 'success',
                title: 'Submitted Successfully Vedio!',
                text: 'Your request has been sent.',
                confirmButtonColor: '#3085d6'
            });
           videoTitle.current.value = '';
             description.current.value = '';
             videoUrl.current.value = '';
            aboutOfVideo.current.value = '';
            VideoImage.current.value = '';
            setError('');
        }).catch((err) => {
            console.error("create Vedio error", err);
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
                title: 'Submission Failed',
                text: 'Please try again later or check your inputs.',
                confirmButtonColor: '#d33'
            });
        });
    };

    return (
        <div className='col-12' id={styles.parent}>
            <div className='container  d-flex justify-content-center ' id={styles.create}>
                <div className='col-10 d-flex flex-column'>
                    <Link to={'/vediodoctor'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{ fontSize: "50px" }} /></Link>
                    <h2>Create Vedio</h2>
                    <form action="" className='col-12 mt-5 d-flex flex-column gap-5' onSubmit={handelCreatevedio}>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>Vedio Title</label>
                                <input ref={videoTitle} className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your video Title ' />
                                {error?.VideoTitle && <div className="text-danger">{error?.VideoTitle[0]}</div>}
                            </div>



                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Description</label>
                                <input ref={description} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your description ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>Vedio Url</label>
                                <input ref={videoUrl} className='py-2 col-10' type="text" placeholder='Please Enter your video URL' />
                                {error?.VideoUrl && <div className="text-danger">{error?.VideoUrl[0]}</div>}

                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>About Of Vedio</label>
                                <input ref={aboutOfVideo} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your About Of Vedio ' />
                                {/* {error?.NumberOfQuestions && <div className="text-danger">{error?.NumberOfQuestions[0]}</div>} */}

                            </div>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Vedio Image</label>
                                <input ref={VideoImage} className='py-2 col-12 col-md-10' type="file" placeholder='  Please Enter your Vedio Image  ' />

                            </div>

                        </div>

                        <div className='d-flex justify-content-center'>

                            <button type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-3 '}>Save Book </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
