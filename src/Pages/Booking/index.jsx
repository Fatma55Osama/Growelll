import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import { useParams } from 'react-router-dom'
import { usedomain } from '../../Store'
import { ToastContainer } from 'react-toastify';
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { PostBooking } from '../../data/API/PostBooking'
import Swal from 'sweetalert2'
export default function Booking() {
    const { domain } = usedomain()
    const [error, setError] = useState({});
    let token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const params = useParams()
    let id = params.id
    const testname = useRef()
    const score = useRef()
    const appointment = useRef()
    const isconfirmed = useRef()
    const note = useRef()
    const handelsubmitbookoing = (e) => {
        e.preventDefault();
        let testnamevalue = testname.current.value
        let scorevalue = parseFloat(score.current.value);
        let appointmentvalue = appointment.current.value;
        let isconfirmedvalue = isconfirmed.current.checked
        let notevalue = note.current.value
        let validationErrors = {};
        if (!testnamevalue) validationErrors.testname = "Test name is required";
        if (!scorevalue || isNaN(scorevalue)) validationErrors.score = "Valid score is required";
        if (!appointmentvalue) validationErrors.appointment = "Appointment date is required";

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        setError({});
        // let values = {
        //     'testName': testnamevalue,
        //     'score': scorevalue,
        //     'appointmentDate': appointmentvalue,
        //     'isConfirmed': isconfirmedvalue,
        //     'notes': notevalue
        // };
        let values = [testnamevalue, scorevalue, appointmentvalue, isconfirmedvalue, notevalue];
        console.log("values being sent:", values);
        PostBooking(values, token, domain, id)
            .then((res) => {
                setError({});
                toast.success('Appointment booked successfully!');
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully',
                    text: 'Appointment booked successfully!',
                    confirmButtonColor: 'success'
                });
                testname.current.value = "";
                score.current.value = "";
                appointment.current.value = "";
                isconfirmed.current.checked = false;
                note.current.value = "";
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
                setError(err.response.data.errors)
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'Please try again later or check your inputs.',
                    confirmButtonColor: '#d33'
                });
            })

        // console.log("Sending data:", {
        //     testName: testnamevalue,
        //     score: scorevalue,
        //     appointmentDate: appointmentvalue,
        //     isConfirmed: isconfirmedvalue,
        //     notes: notevalue
        // });
    }
    return (
        <div className={styles.booking}>
            {/* Background Image */}

            <div className={styles.backimg}>
                <div className={styles.overlay}></div>
                <div className={styles.headerText}>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                        className={styles.customtoast}
                    />
                    <h5> Get In Touch</h5>
                    <h2>Appointment Booking</h2>
                    <p>
                        We offer you an easy and fast way to book an appointment with
                        specialized doctors across various medical fields.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="container my-5">
                <form className={styles.form} onSubmit={handelsubmitbookoing}>
                    <div className="row g-4">
                        <div className="col-12 col-md-6">
                            <label>Test Name</label>
                            <input ref={testname} type="text" placeholder="Enter your test name" />
                            {error.testname && <p className="text-danger">{error.testname}</p>}
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Score</label>
                            <input ref={score} type="number" placeholder="Enter your score" />
                            {error.score && <p className="text-danger">{error.score}</p>}
                        </div>
                        <div className="col-12">
                            <label>Appointment Date</label>
                            <input ref={appointment} min={new Date().toISOString().split('T')[0]}
                                max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} type="date" />
                            {error.appointment && <p className="text-danger">{error.appointment}</p>}
                        </div>
                        <div className="col-12">
                            <label>Note</label>
                            <textarea ref={note} rows="4" placeholder="Type your message..." />
                        </div>
                        <div className="col-12 text-center">
                            <label className="col-1   d-flex  align-items-center">
                                <input ref={isconfirmed} type="checkbox" />
                                <span className='col-12'>Is Confirmed</span>
                            </label>
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className={styles.submitBtn}>
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}
