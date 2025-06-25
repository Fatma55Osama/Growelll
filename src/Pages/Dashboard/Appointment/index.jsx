import React, { useEffect } from 'react'
import styles from './index.module.css'
import doctor from '../../../assets/Frame.png'
import { usebookingAppoiement, usedomain } from '../../../Store';
import { getData } from '../../../data/Repo/getData';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { Deleteapoiement } from '../../../data/API/Deleteapoiement';
export default function Appointment() {
    const { domain } = usedomain()
    const { booking, setbooking } = usebookingAppoiement()


    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    useEffect(() => {
        if (domain && tokenDoctor) {
            getData.get_getallbooking(domain, tokenDoctor).then((res) => {
                console.log("Allbooking", res)
                setbooking(res)
            }).catch((err) => {
                console.log("errbooking", err)
            })
        }

    }, [])
    const fetchAppointment = () => {
        getData.get_getallbooking(domain, tokenDoctor).then((res) => {
            setbooking(res)
            console.log('fetchAppointment', res)
        })
            .catch(err => {
                console.log(err);
            });
    };
    const handeldeleteAppointment = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This Appointment will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                Deleteapoiement(domain, tokenDoctor, id).then(res => {
                    Swal.fire('Deleted!', 'The Appointment has been deleted.', 'success');
                    fetchAppointment()
                })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'Something went wrong while deleting the Appointment.', 'error');
                    });
            }
        })
    }
    return (
        <div className={styles.Appointment}>
            <div className='container d-flex flex-column  align-items-center' id={styles.spacediv1}>

                <h1>Appointments</h1>
                {
                    Array.isArray(booking) && booking.length > 0 ? (
                        <div key={booking[0].bookingID} className='col-12 shadow-sm d-flex align-items-center justify-content-between px-5 py-3 mt-4' id={styles.carddoctor}>
                            <div className='d-flex flex-column gap-3 px-5'>
                                <h2>{booking[0].doctorName}</h2>
                                <h6>{booking[0].aboutME}</h6>
                                <p className='col-7'>With experience in managing complex medical conditions in children</p>
                            </div>
                            <div className={styles.img}>
                                <img src={`${domain}${booking[0].imageDoctor}`} width={250} height={250} alt="" />
                            </div>
                        </div>
                    ) : (<div key={booking?.doctor?.doctorID} className='col-12 shadow-sm d-flex align-items-center justify-content-between px-5 py-3 mt-4' id={styles.carddoctor}>
                        <div className='d-flex flex-column gap-3 px-5'>
                            <h2>{booking?.doctor?.firstName} {booking?.doctor?.lastName}</h2>
                            <h6>{booking?.doctor?.bio}</h6>
                            <p className='col-7'>With experience in managing complex medical conditions in children</p>
                        </div>
                        <div className={styles.img}>
                            <img src={`${domain}${booking?.doctor?.imgUrl}`} width={250} height={250} alt="" />
                        </div>
                    </div>)

                }
                {
                    Array.isArray(booking) && booking.length > 0 ? (
                        <>
                            {booking.map((el, index) => {
                                return (
                                    <div key={el.bookingID} className={styles.datauser + " col-12 container d-flex flex-column justify-content-center px-5  py-4 "}>
                                        <div className={styles.section1 + " col-12 d-flex px-4 justify-content-between align-items-center py-2"}>
                                            <h5>{el.patientName}</h5>
                                            <h5>{new Date(el.appointmentDate).toLocaleDateString('en-GB')}</h5>
                                            <img src={`${domain}${el.imageUser}`} height={115} width={115} alt="" />
                                        </div>
                                        <div className='d-flex flex-column gap-3 mt-3 ms-3'>
                                            <h5>TestName: {el.testName}</h5>
                                            <h5>Score: {el.score}</h5>
                                            <h5>Gender: {el.gender}</h5>
                                        </div>

                                        <div id={styles.carduser} className='col-12 mt-3'>
                                            <div><button className='py-3 px-5 fw-bold '>Note</button></div>
                                            <div className='px-4 py-4'>{el.notes}</div>
                                        </div>
                                        <div className={styles.btnstyles + " d-flex justify-content-end mt-4"}>
                                            <button className='py-3 px-5 text-black'>
                                                {el.isConfirmed ? "Confirmed" : "UnConfirmed"}
                                            </button>
                                        </div>

                                        <div className='col-12 d-flex justify-content-center'>
                                            <button
                                                onClick={() => handeldeleteAppointment(el.bookingID)}
                                                className={styles.deleteBtn + " col-2 py-2 mt-3 bg-danger d-flex justify-content-center "}
                                            >
                                                <RiDeleteBin6Line /> Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <div className="text-center py-5">
                            <h4>No Appointments</h4>
                        </div>
                    )
                }


            </div>
        </div>
    )
}
