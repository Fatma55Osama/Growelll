import React, { useEffect } from 'react'
import styles from './index.module.css'
import doctor from '../../../assets/Frame.png'
import { Link, useNavigate } from 'react-router-dom'
import { CiClock2 } from "react-icons/ci";
import { GoArrowRight } from 'react-icons/go';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { getData } from '../../../data/Repo/getData';
import { useDoctorQuestion, usedomain } from '../../../Store';
import { DeleteQuestions } from '../../../data/API/DeleteQuestions';
import Swal from 'sweetalert2';
export default function Question() {
    const { domain } = usedomain()
    const navigate = useNavigate()

    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    const { Doctorquestion, setDoctorquestion } = useDoctorQuestion()

    useEffect(() => {
        if (tokenDoctor) {
            getData.get_store_question(tokenDoctor).then((res) => {
                console.log("Doctorstore_questiontoken", res);
                setDoctorquestion(res)
                // navigat('/question')
            }).catch((err) => {
                console.log(err)
            })
        } else {
            navigate('/')
        }

    }, [])
    const fetchQuestions = () => {
        getData.get_store_question(tokenDoctor)
            .then(res => {
                setDoctorquestion(res);
            })
            .catch(err => console.log(err));
    };
    // const handelDeleteQuestions = (id) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "This question will be permanently deleted!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         cancelButtonColor: '#3085d6',
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             DeleteQuestions(tokenDoctor, domain, id)
    //                 .then(res => {

    //                     Swal.fire('Deleted!', 'The question has been deleted.', 'success');
    //                     setDoctorquestion(prev => Array.isArray(prev) ? prev.filter(q => q.questionID !== id) : []);
    //                     window.location.reload();
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                     Swal.fire('Error!', 'Something went wrong while deleting the question.', 'error');
    //                 });
    //         }

    //     });

    // }
    const handelDeleteQuestions = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This question will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteQuestions(tokenDoctor, domain, id)
                    .then(res => {
                        Swal.fire('Deleted!', 'The question has been deleted.', 'success');
                        
                        fetchQuestions();
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'Something went wrong while deleting the question.', 'error');
                    });
            }
        });
    };

    return (
        <div className={styles.parent}>
            <div className='d-flex justify-content-center ' id={styles.question1}>
                <div className='d-flex justify-content-center container'>
                    <div className={styles.div2 + " container   justify-content-center d-flex align-items-center mt-5"}>
                        {
                            Doctorquestion.length > 0 ? (
                                <>
                                    <img src={`${domain}/${Doctorquestion[0]?.doctor?.imgUrl}`} width={190} height={199} alt="" />
                                    <div className={styles.contantdata + " col-5 d-flex flex-column"}>
                                        <div className="ps-3 py-3 d-flex flex-column gap-3">
                                            <div className="d-flex flex-column gap-1 container">
                                                <h4>Dr: {Doctorquestion[0]?.doctor?.firstName} {Doctorquestion[0]?.doctor?.lastName}</h4>
                                                <span>{doctor.bio}</span>
                                                <p className='col-11'>{Doctorquestion[0]?.doctor?.bio} </p>
                                                {/* <span>Date: {new Date(report[0]?.takenAt).toLocaleDateString()}</span> */}
                                            </div>
                                        </div>
                                        <div className={styles.HaveTest + " px-5 py-4"}>
                                            {/* <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center gap-2'>
                                    <CiClock2 />
                                    <span>Avaibility</span>
                                </div>
                                <div>
                                    <Link className'nav-link' ><span>Have the test <GoArrowRight /></span></Link>
                                </div>=
                            </div> */}

                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img src={`${domain}/${Doctorquestion?.doctor?.imgUrl}`} width={190} height={199} alt="" />
                                    <div className={styles.contantdata + " col-5 d-flex flex-column"}>
                                        <div className="ps-3 py-3 d-flex flex-column gap-3">
                                            <div className="d-flex flex-column gap-1 container">
                                                <h4>Dr: {Doctorquestion?.doctor?.firstName} {Doctorquestion?.doctor?.lastName}</h4>                                                <span>{doctor.bio}</span>
                                                <p className='col-11'>{Doctorquestion?.doctor?.bio} </p>
                                                {/* <span>Date: {new Date(report[0]?.takenAt).toLocaleDateString()}</span> */}
                                            </div>
                                        </div>
                                        <div className={styles.HaveTest + " px-5 py-4"}>
                                            {/* <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center gap-2'>
                                    <CiClock2 />
                                    <span>Avaibility</span>
                                </div>
                                <div>
                                    <Link className'nav-link' ><span>Have the test <GoArrowRight /></span></Link>
                                </div>=
                            </div> */}

                                        </div>
                                    </div>
                                </>
                            )
                        }



                    </div>
                    <div className=' col-3 d-flex justify-content-end align-items-end ' >
                        <Link className='nav-link text-white py-4 px-4 me-3  text-white' to={'/createquestion'} id={styles.btnadd}> <IoIosAddCircleOutline /> Add new Questions</Link>
                    </div>
                </div>

            </div>



            <div className={styles.divqqa}>
                {
                    Array.isArray(Doctorquestion) && Doctorquestion.length > 0 ? (
                        Doctorquestion.map((el, index) => (
                            <div key={el.questionID} className='container col-10 ' id={styles.Qa}>
                                <div className='text-white container d-flex justify-content-between align-items-center ' id={styles.singleqa}>
                                    <div className='ms-3 py-3 d-flex flex-column gap-2 '>
                                        <h6 className=''>Q{index + 1}</h6>
                                        <div className='ms-3 d-flex flex-column gap-2 mb-4' id={styles.breakText}>
                                            <h4>{el.questionText}</h4>
                                            <div className='d-flex gap-5'>
                                                <span>A) {el.answerOption1}</span>
                                                <span>B) {el.answerOption2}</span>
                                                <span>C) {el.answerOption3}</span>
                                                <span>D) {el.answerOption4}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.icon + " d-flex gap-5 me-3"}>
                                        <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon} to={`/editequestion/${el.questionID}`}>
                                            <FiEdit /><span>Edit</span>
                                        </Link>
                                        <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon} onClick={() => handelDeleteQuestions(el.questionID)}>
                                            <RiDeleteBin6Line /><span>Delete</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-secondary my-5 d-flex justify-content-center align-items-center">
                            <h4>{Doctorquestion?.message || "No questions found."}</h4>
                        </div>
                    )
                }


                {/* <div className='container col-10' id={styles.Qa}>
                    <div className='text-white container d-flex justify-content-between align-items-center' id={styles.singleqa}>
                        <div className='ms-3 py-3 d-flex flex-column  gap-2'>
                            <h6 className=''>Q1</h6>
                            <div className=' ms-3 d-flex flex-column gap-2 mb-4'>
                                <h4>what is 4+4 ?</h4>
                                <div className='d-flex gap-5'>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.icon + " d-flex gap-5 me-3"}>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><FiEdit /><span>Edit</span></Link>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><RiDeleteBin6Line /><span>Delete</span></Link>
                        </div>
                    </div>
                </div>
                <div className='container col-10' id={styles.Qa}>
                    <div className='text-white container d-flex justify-content-between align-items-center' id={styles.singleqa}>
                        <div className='ms-3 py-3 d-flex flex-column  gap-2'>
                            <h6 className=''>Q1</h6>
                            <div className=' ms-3 d-flex flex-column gap-2 mb-4'>
                                <h4>what is 4+4 ?</h4>
                                <div className='d-flex gap-5'>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                    <span>Answer1</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.icon + " d-flex gap-5 me-3"}>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><FiEdit /><span>Edit</span></Link>
                            <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon}><RiDeleteBin6Line /><span>Delete</span></Link>
                        </div>
                    </div>
                </div> */}
            </div>

        </div>
    )
}
