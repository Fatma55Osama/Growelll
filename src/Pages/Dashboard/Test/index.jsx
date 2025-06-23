import React, { useEffect } from 'react'
import styles from './index.module.css'
import doctor from '../../../assets/Frame.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { getData } from '../../../data/Repo/getData';
import { useDoctorTest, usedomain } from '../../../Store';
import Swal from 'sweetalert2';
import { DeleteTest } from '../../../data/API/DeleteTest';
export default function Test() {
    const { domain } = usedomain()
    const navigate = useNavigate()

    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

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

    }, [])
    const fetchTest = () => {
        getData.get_store_test(tokenDoctor, domain)
            .then(res => {
                setDoctortest(res);
            })
            .catch(err => console.log(err));
    };

    const handelDeletetest = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This Test will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteTest(tokenDoctor, domain, id)
                    .then(res => {
                        Swal.fire('Deleted!', 'The Test has been deleted.', 'success');

                        fetchTest();
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'Something went wrong while deleting the Test.', 'error');
                    });
            }
        });
    };

    return (
        <div className={styles.parent + " py-5"}>
            {/* Doctor Card */}
            <div className="container mb-5" id={styles.spacediv1}>
                <div className="d-flex flex-column flex-md-row align-items-center bg-white shadow rounded-4 p-4 gap-4">
                    <img
                        src={`${domain}/${Doctortest[0]?.doctor?.imageUrl || 'default-doctor.png'}`}
                        alt="Doctor"
                        className="rounded-4"
                        style={{ width: '200px', height: '200px',borderRadius:"8px", objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                        <h3 className="text-primary fw-bold mb-2">
                            Dr. {Doctortest[0]?.doctor?.doctorName}
                        </h3>
                        <p className="text-muted">{Doctortest[0]?.doctor?.bio}</p>
                    </div>
                    <Link to="/createtest" className="btn btn-outline-primary fw-semibold px-4 py-2">
                        <IoIosAddCircleOutline size={20} className="me-2" />
                        Add New Test
                    </Link>
                </div>
            </div>

            {/* Tests List */}
            <div className="container">
                {Array.isArray(Doctortest) && Doctortest.length > 0 ? (
                    Doctortest.map((el, index) => (
                        <div
                            key={el.testId}
                            className="bg-light p-4 mb-4 rounded-4 shadow-sm d-flex justify-content-between align-items-start flex-column flex-md-row"
                        >
                            <div>
                                <h6 className="text-secondary mb-2">Test {index + 1}</h6>
                                <h5 className="fw-bold text-primary mb-2"> {el.testName}</h5>
                                <p className="mb-1"><strong>Description:</strong> {el.description}</p>
                                <p className="mb-1"><strong>Test ID:</strong> {el.testId}</p>
                                <p className="mb-1"><strong>Questions:</strong> {el.numberOfQuestions}</p>
                            </div>
                            <div className="d-flex gap-3 mt-3 mt-md-0">
                                <Link to={`/editetest/${el.testId}`} className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2">
                                    <FiEdit /> Edit
                                </Link>
                                <button
                                    className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2"
                                    onClick={() => handelDeletetest(el.testId)}
                                >
                                    <RiDeleteBin6Line /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-secondary py-5">
                        <h4>{Doctortest?.message || "No Tests Found."}</h4>
                    </div>
                )}
            </div>
        </div>

    )
}
