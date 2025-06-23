import React, { useEffect } from 'react'
import styles from './index.module.css'
import doctor from '../../../assets/Frame.png'
import { usebookingAppoiement, usedomain } from '../../../Store';
import { getData } from '../../../data/Repo/getData';
export default function Appointment() {
    const { domain } = usedomain()
    const { booking, setbooking } = usebookingAppoiement()


    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    useEffect(() => {
        getData.get_getallbooking(domain, tokenDoctor).then((res) => {
            console.log("Allbooking", res)
            setbooking(res)
        }).catch((err) => {
            console.log("errbooking", err)
        })
    }, [])
    return (
        <div className={styles.Appointment}>
            <div className='container d-flex flex-column  align-items-center' id={styles.spacediv1}>

                <h1>Appointments</h1>
                {
                    Array.isArray(booking) && booking.slice(0,1).map((el) => {
                        return (
                        <div key={el.bookingID} className='col-12 shadow-sm d-flex align-items-center justify-content-between px-5 py-3 mt-4' id={styles.carddoctor}>
                            <div className='d-flex flex-column gap-3 px-5'>
                                <h2>{el.doctorName}</h2>
                                <h6>{el.aboutME}</h6>
                                <p className='col-7'>With experience in managing complex
                                    medical conditions in children</p>
                            </div>
                            <div className={styles.img}>
                                <img src={`${domain}/${el.imageDoctor}`} width={250} height={250} alt="" />
                            </div>
                        </div>)
                    })
                }

                {
                    Array.isArray(booking) && booking.map((el, index) => {
                        return (
                            <div key={el.bookingID} className={styles.datauser + " col-12 container d-flex flex-column justify-content-center px-5  py-4 "}>
                                <div className={styles.section1 + " col-12 d-flex px-4 justify-content-between align-items-center py-2"}>
                                    <h5>{el.patientName}</h5>
                                    <h5>{el.appointmentDate}</h5>
                                    <img src={`${domain}${el.imageUser}`} height={115} width={115} alt="" />
                                </div>
                                <div className='d-flex flex-column gap-3 mt-3 ms-3'>
                                    <h5>TestName: {el.testName}</h5>
                                    <h5>Score: {el.score}</h5>
                                </div>

                                <div id={styles.carduser} className='col-12 mt-3'>
                                    <div><button className='py-3 px-5'>Note</button></div>
                                    <div className='px-4 py-4'>{el.notes}</div>
                                </div>
                                <div className={styles.btnstyles + " d-flex justify-content-end mt-4"}><button className='py-3 px-5 text-black'>  {el.isConfirmed ? "Confirmed" : "Not Confirmed"}</button></div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
