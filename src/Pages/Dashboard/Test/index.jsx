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
import { useDoctorQuestion, useDoctorTest, usedomain } from '../../../Store';
import { DeleteQuestions } from '../../../data/API/DeleteQuestions';
import Swal from 'sweetalert2';
import { DeleteTest } from '../../../data/API/DeleteTest';
export default function Test() {
    const { domain } = usedomain()
    const navigate = useNavigate()

    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    const {Doctortest,setDoctortest}=useDoctorTest()


    useEffect(() => {
        if (tokenDoctor) {
            getData.get_store_test(tokenDoctor,domain).then((res) => {
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
        getData.get_store_test(tokenDoctor,domain)
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
                            Doctortest.length > 0 ? (
                                <>
                                    <img src={`${domain}/${Doctortest[0]?.doctor.imageUrl}`} width={190} height={199} alt="" />
                                    <div className={styles.contantdata + " col-5 d-flex flex-column"} >
                                        <div className="ps-3 py-3 d-flex flex-column gap-3">
                                            <div className="d-flex flex-column gap-1 container">
                                                <h4>Dr: {Doctortest[0]?.doctor?.doctorName} </h4>
                                                <p className='col-11'>{Doctortest[0]?.doctor?.bio} </p>
                                            </div>
                                        </div>
                                        <div className={styles.HaveTest + " px-5 py-4"}>
                                           
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img src={`${domain}/${Doctortest?.doctor?.imgUrl}`} width={190} height={199} alt="" />
                                    <div className={styles.contantdata + " col-5 d-flex flex-column"}>
                                        <div className="ps-3 py-3 d-flex flex-column gap-3">
                                            <div className="d-flex flex-column gap-1 container">
                                                <h4>Dr: {Doctortest?.doctor?.firstName} {Doctortest?.doctor?.lastName}</h4>                                                <span>{doctor.bio}</span>
                                                <p className='col-11'>{Doctortest?.doctor?.bio} </p>
                                            </div>
                                        </div>
                                        <div className={styles.HaveTest + " px-5 py-4"}>
                                   

                                        </div>
                                    </div>
                                </>
                            )
                        }



                    </div>
                    <div className=' col-3 d-flex justify-content-end align-items-end mb-1'>
                        <Link className='nav-link text-white py-4 px-4 me-3' to={'/createtest'} id={styles.btnaddd}> <IoIosAddCircleOutline /> Add new Test</Link>
                    </div>
                </div>

            </div>



            <div className={styles.divqqa}>
                {
                    Array.isArray(Doctortest) && Doctortest.length > 0 ? (
                        Doctortest.map((el, index) => (
                            <div key={el.testId} className='container col-10' id={styles.Qa}>
                                <div className='text-white container d-flex justify-content-between align-items-center col-12' id={styles.singleqa}>
                                    <div className='ms-3 py-3 d-flex flex-column gap-2 '>
                                        <h6 className=''>Test {index + 1}</h6>
                                        <div className={ ' ms-3 d-flex flex-column gap-2 mb-4'} id={styles.breakText}>
                                            <h4 className='' >Test Name: {el.testName}</h4>
                                            <div className='d-flex flex-column gap-3'>
                                                <span className='col-11'>Description:{el.description}</span>
                                                <span> Test ID : {el.testId}</span>
                                                <span>Number Of Qestion:  {el.numberOfQuestions}</span>
                                               
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.icon + " d-flex gap-5 me-3"}>
                                        <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon} to={`/editetest/${el.testId}`}>
                                            <FiEdit /><span>Edit</span>
                                        </Link>
                                        <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon} onClick={() => handelDeletetest(el.testId)}>
                                            <RiDeleteBin6Line /><span>Delete</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-secondary my-5 d-flex justify-content-center align-items-center">
                            <h4>{Doctortest?.message || "No Test found."}</h4>
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
