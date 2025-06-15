import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { usedomain } from '../../../Store'
import { single_vediodoctor } from '../../../data/API/single_vediodoctor'
export default function EditeVedio() {
    const params = useParams()
    let id = params.id
    const { domain } = usedomain()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
    const [error, setError] = useState('');
    const [VideoTitle, setVideoTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [AboutOfVideo, setAboutOfVideo] = useState('');
    const [VideoUrl, setVideoUrl] = useState('');
    const [VideoImage, setVideoImage] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        single_vediodoctor(domain, tokenDoctor, id).then((res) => {

            console.log('single_vediodoctor', res)
            setVideoTitle(res.videoTitle || '');
            setDescription(res.description || '');
            setAboutOfVideo(res.aboutOfVideo?.toString() ?? '');
            setVideoUrl(res.videoUrl?.toString() ?? '');
            setVideoImage(res.videoImagePath || '');
        })
            .catch((err) => {
                console.error("Error fetching test data:", err);
            });
    }, [id]);

    const handelEditvedio = (e) => {
        e.preventDefault()
        // if (
        //     !VideoTitle ||
        //     !Description ||
        //     !AboutOfVideo ||
        //     !VideoUrl ||
        //     !VideoImage
        // ) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Missing Fields',
        //         text: 'Please fill in all the required fields.',
        //     });
        //     return;
        // }
        // if (!numberOfQuestions) {
        //     setError('Please enter Number Of Questions.');
        //     return;
        // }

        const formData = new FormData();
        formData.append('VideoTitle', VideoTitle);
        formData.append('Description', Description);
        formData.append('AboutOfVideo', AboutOfVideo);
        formData.append('VideoUrl', VideoUrl);

        // الصورة: تأكد إنها File مش مجرد string
        if (typeof VideoImage === 'object') {
            formData.append('VideoImage', VideoImage);
        }
        axios.put(`https://localhost:7071/api/VideoEvent/EditVideoEvent/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${tokenDoctor}`,
                // 'Content-Type': 'application/json',
            }
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Video Updated',
                    text: 'Video updated successfully.',
                });
                setError('');
                navigate('/vediodoctor')
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
                    <Link to={'/vediodoctor'}>  <IoIosArrowRoundBack className='mb-3 text-black' style={{ fontSize: "50px" }} /></Link>
                    <h2> Edit Vedio </h2>
                    <form onSubmit={handelEditvedio} action="" className='col-12 mt-5 d-flex flex-column gap-5'>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>VedioTitle</label>
                                <input
                                    type="text"
                                    value={VideoTitle}
                                    onChange={(e) => setVideoTitle(e.target.value)}
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
                                <label>AboutOfVideo</label>
                                <input value={AboutOfVideo} onChange={(e) => setAboutOfVideo(e.target.value)} className='py-2 col-10' type="text" placeholder='  Please Enter your CategoryID ' />
                                {/* {error?.AboutOfVideo && <div className="text-danger">{error?.AboutOfVideo[0]}</div>} */}


                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>


                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Videoimg</label>
                                {VideoImage && typeof VideoImage === 'string' && (
                                    <img src={`${domain}/${VideoImage}`} alt="Current Video" style={{ width: '100px' }} />
                                )}
                                <input onChange={(e) => setVideoImage(e.target.files[0])} className='py-2 col-12 col-md-10' type="file" />                                {/* {error?.VideoUrl && <div className="text-danger">{error?.VideoUrl[0]}</div>} */}
                                {error?.VideoImage && <div className="text-danger">{error?.VideoImage[0]}</div>}

                            </div>
                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>videoUrl</label>
                                <input value={VideoUrl} onChange={(e) => setVideoUrl(e.target.value)} className='py-2 col-10' type="text" placeholder='  Please Enter your CategoryID ' />
                                {/* {error?.AboutOfVideo && <div className="text-danger">{error?.AboutOfVideo[0]}</div>} */}


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
