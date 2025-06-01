import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { usedomain, useModale } from '../../Store';
import { IoIosSettings, IoMdNotifications } from 'react-icons/io';
import { IoCloseSharp, IoPersonCircleOutline, IoPersonOutline } from 'react-icons/io5';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../../data/API/Logout';
import { DeleteAccount } from '../../data/API/DeleteAccount';
import { TbLockPassword, TbReport } from "react-icons/tb";
import Swal from 'sweetalert2';
import { LogoutDoctor } from '../../data/API/LogoutDoctor';
import { DeleteDoctorAcount } from '../../data/API/DeleteDoctorAcount';
export default function Menu() {
    const { closeModal } = useModale();
    const navigate = useNavigate()
    const { domain } = usedomain()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    let token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const destination = tokenDoctor ? '/changdoctorpassword' : '/changpassword';
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 500) {
                closeModal();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // const DeleteAccountfunc = () => {
    //     console.log('Token:', token);
    //     DeleteAccount(token, domain).then(res => {
    //         localStorage.removeItem('token')
    //         sessionStorage.removeItem('token')
    //         navigate('/login')
    //         closeModal()
    //     }).catch(console.error);
    // }
    const DeleteAccountfunc = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete your account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('Token:', token);
                DeleteAccount(token, domain)
                    .then(res => {
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        navigate('/login');
                        closeModal();

                        Swal.fire(
                            'Deleted!',
                            'Your account has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire(
                            'Error!',
                            'Something went wrong while deleting your account.',
                            'error'
                        );
                    });
            }

        });
    };
    const DeleteDoctorAccountfunc = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete your account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('Token:', tokenDoctor);
                DeleteDoctorAcount(tokenDoctor, domain)
                    .then(res => {
                        localStorage.removeItem('tokenDoctor');
                        sessionStorage.removeItem('tokenDoctor');

                        Swal.fire(
                            'Deleted!',
                            'Your account has been deleted.',
                            'success'
                        ).then(() => {
                            closeModal();
                            navigate('/loginadmin');
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire(
                            'Error!',
                            'Something went wrong while deleting your account.',
                            'error'
                        );
                    });
            }

        });
    };

    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to log out?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'No, stay'
        }).then((result) => {
            if (result.isConfirmed) {
                Logout(token, domain)
                    .then(res => {
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        navigate('/login');
                        closeModal();

                        //   Swal.fire(
                        //     'Logged out!',
                        //     'You have been successfully logged out.',
                        //     'success'
                        //   );
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire(
                            'Error!',
                            'Something went wrong during logout.',
                            'error'
                        );
                    });
            }
        });
    };
    const logoutDoctor = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to log out?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'No, stay'
        }).then((result) => {
            if (result.isConfirmed) {
                LogoutDoctor(tokenDoctor, domain)
                    .then(res => {
                        localStorage.removeItem('tokenDoctor');
                        sessionStorage.removeItem('tokenDoctor');
                        navigate('/loginadmin');
                        closeModal();

                        //   Swal.fire(
                        //     'Logged out!',
                        //     'You have been successfully logged out.',
                        //     'success'
                        //   );
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire(
                            'Error!',
                            'Something went wrong during logout.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className={styles.modal} onClick={() => closeModal(false)}>
            <div className={styles.content + " animate__animated animate__bounceInRight"} onClick={(e) => e.stopPropagation()}>
                <div className='container mt-3'>
                    <div className='border-bottom mb-3 d-flex justify-content-between align-items-center'>
                        <h3 className='p-1'>Setting Account <IoIosSettings /></h3>
                        <IoCloseSharp style={{ fontSize: "25px" }} onClick={() => closeModal(false)} />
                    </div>


                    <div className='d-flex flex-column justify-content-between gap-5'>
                        <div className='overflow-hidden mb-2'>
                            {/* <h5 className={styles.h5}>Profile</h5> */}
                            <Link className='d-flex gap-3 nav-link' to={'/profile'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                <IoPersonOutline className={styles.icon} />
                                <h5>Profile</h5>
                                {/* <div className='col-10 p-2' id={styles.massege}>
                                    <h5>Admin</h5>
                                    <p id={styles.p}>fgdgdfgf</p>
                                </div> */}
                            </Link>
                        </div>
                        <div className='overflow-hidden mb-2'>
                            {/* <h5 className={styles.h5}>Profile</h5> */}
                            <Link className='d-flex gap-3 nav-link' to={destination} onClick={() => closeModal(false)} id={styles.profiletext}>
                                <TbLockPassword className={styles.icon} />
                                <h5>Change Password</h5>
                                {/* <div className='col-10 p-2' id={styles.massege}>
                                    <h5>Admin</h5>
                                    <p id={styles.p}>fgdgdfgf</p>
                                </div> */}
                            </Link>
                        </div>


                        <div className='overflow-hidden mb-2'>
                            {/* <h5 className={styles.h5}>Profile</h5> */}
                            <Link className='d-flex gap-3 nav-link' to={'/report'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                <TbReport className={styles.icon} />
                                <h5>Report</h5>
                                {/* <div className='col-10 p-2' id={styles.massege}>
                                    <h5>Admin</h5>
                                    <p id={styles.p}>fgdgdfgf</p>
                                </div> */}
                            </Link>
                        </div>
                        <div className='overflow-hidden mb-2'>
                            {/* <h5 className={styles.h5}>Are you sure you want to delete your account?</h5> */}
                            <div className='d-flex align-items-center gap-3' id={styles.profiletext} onClick={() => {
                                if (tokenDoctor) {
                                    DeleteDoctorAccountfunc();
                                } else if (token) {
                                    DeleteAccountfunc();
                                }
                            }}>
                                <MdDelete className={styles.icon1} />
                                <div className='col-10 ' id={styles.massege}>
                                    <h5>Delete Account</h5>
                                    {/* <p id={styles.p}>  This action is permanent and cannot be undone.</p> */}
                                </div>
                            </div>
                        </div>
                        <div className='overflow-hidden mb-2 '>
                            {/* <h5 className={styles.h5}>Are you sure you want to log out?</h5> */}
                            <div className='d-flex j align-items-center gap-3' id={styles.profiletext} onClick={() => {
                                if (tokenDoctor) {
                                    logoutDoctor();
                                } else if (token) {
                                    logout();
                                }
                            }}>
                                <RiLogoutCircleLine className={styles.icon1} />
                                <div className='col-10 ' id={styles.massege}>
                                    <h5>Logout</h5>
                                    {/* <p id={styles.p}>fgdgdfgf</p> */}
                                </div>
                            </div>
                        </div>


                    </div>




                </div>
            </div>
        </div>
    );
}
