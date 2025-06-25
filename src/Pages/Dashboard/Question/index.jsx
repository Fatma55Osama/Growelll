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
import { FaClipboardQuestion } from 'react-icons/fa6';
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
            <div className="container py-5 " id={styles.spacediv1}>
                <div className="text-center mb-5">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <span
                            className="rounded-circle bg-primary d-flex justify-content-center align-items-center"
                            style={{ width: "60px", height: "60px" }}
                        >
                            <FaClipboardQuestion size={30} color="white" />
                        </span>
                    </div>
                    <h3 className="fw-bold text-primary">All Questions</h3>
                    <p className="text-muted">Here you can manage all your test questions.</p>
                </div>
                {/* Doctor Card */}
                {Doctorquestion.length > 0 ? (
                    <div className="card mb-4 shadow-sm border-0 rounded-4 d-flex justify-content-between ">
                        <div className="row g-0 align-items-center">
                            <div className="col-md-3 text-center p-2">
                                <img
                                    src={`${domain}/${Doctorquestion[0]?.doctor?.imgUrl}`}
                                    alt="doctor"
                                    className="img-fluid rounded-4 shadow-sm"
                                    style={{ width: "200px", height: "200px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-9">
                                <div className="card-body">
                                    <h3 className="card-title text-primary fw-bold">
                                        Dr. {Doctorquestion[0]?.doctor?.firstName} {Doctorquestion[0]?.doctor?.lastName}
                                    </h3>
                                    <p className="card-text text-muted fst-italic">{Doctorquestion[0]?.doctor?.bio}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mb-4">
                            <Link
                                to="/createquestion"
                                className="btn btn-primary rounded-pill d-flex align-items-center gap-2 shadow"
                            >
                                <IoIosAddCircleOutline />
                                Add New Question
                            </Link>
                        </div>

                    </div>
                ):(
                      <div className="card mb-4 shadow-sm border-0 rounded-4 d-flex justify-content-between ">
                        <div className="row g-0 align-items-center">
                            <div className="col-md-3 text-center p-2">
                                <img
                                    src={`${domain}/${Doctorquestion?.doctor?.imgUrl}`}
                                    alt="doctor"
                                    className="img-fluid rounded-4 shadow-sm"
                                    style={{ width: "200px", height: "200px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-9">
                                <div className="card-body">
                                    <h3 className="card-title text-primary fw-bold">
                                        Dr. {Doctorquestion?.doctor?.firstName} {Doctorquestion?.doctor?.lastName}
                                    </h3>
                                    <p className="card-text text-muted fst-italic">{Doctorquestion?.doctor?.bio}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mb-4">
                            <Link
                                to="/createquestion"
                                className="btn btn-primary rounded-pill d-flex align-items-center gap-2 shadow"
                            >
                                <IoIosAddCircleOutline />
                                Add New Question
                            </Link>
                        </div>

                    </div>
                )}
                {/* Add Button */}




                {/* Questions List */}
                <div className="row gy-4">
                    {Array.isArray(Doctorquestion) && Doctorquestion.length > 0 ? (
                        Doctorquestion.map((el, index) => (
                            <div key={el.questionID} className="col-12">
                                <div className="card shadow border-0 rounded-4 p-4 position-relative">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h5 className="fw-bold text-primary mb-3">Q{index + 1}: {el.questionText}</h5>
                                            <div className="d-flex flex-column gap-1">
                                                <span>A) {el.answerOption1}</span>
                                                <span>B) {el.answerOption2}</span>
                                                <span>C) {el.answerOption3}</span>
                                                <span>D) {el.answerOption4}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-end gap-2">
                                            <Link to={`/editequestion/${el.questionID}`} className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
                                                <FiEdit /> Edit
                                            </Link>
                                            <button onClick={() => handelDeleteQuestions(el.questionID)} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1">
                                                <RiDeleteBin6Line /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted mt-5">
                            <h5>{Doctorquestion?.message || "No questions found."}</h5>
                        </div>
                    )}
                </div>
            </div>

        </div>


    )
}
