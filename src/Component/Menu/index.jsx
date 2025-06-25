import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { usedomain, useModale, useProfile, useProfileDoctor } from '../../Store';
import { IoIosSettings, IoMdNotifications } from 'react-icons/io';
import { IoCloseSharp, IoPersonCircleOutline, IoPersonOutline, IoPlay, IoPlayOutline } from 'react-icons/io5';
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../../data/API/Logout';
import { DeleteAccount } from '../../data/API/DeleteAccount';
import { TbBrandSpeedtest, TbLockPassword, TbReport } from "react-icons/tb";
import Swal from 'sweetalert2';
import { LogoutDoctor } from '../../data/API/LogoutDoctor';
import { DeleteDoctorAcount } from '../../data/API/DeleteDoctorAcount';
import { GoTasklist } from 'react-icons/go';
import { BiSolidCategory } from "react-icons/bi";
import { FaBook, FaClipboardQuestion } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { getData } from '../../data/Repo/getData';
export default function Menu() {
    const { closeModal } = useModale();
    const navigate = useNavigate()
    const { domain } = usedomain()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
    const { Profiledoctor, setprofiledoctor } = useProfileDoctor()
    const { Profile, setprofile } = useProfile()

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
    useEffect(() => {
        if (tokenDoctor) {
            getData.get_profileDoctor(domain, tokenDoctor)
                .then((res) => setprofiledoctor(res))
                .catch((err) => console.error('Error fetching doctor profile:', err));
        } else if (token) {
            getData.get_profile(domain, token).then((res) => {
                setprofile(res)

            })
        }
    }, [domain, tokenDoctor]);

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
                <div className=' ' >
                    <div className='border-bottom mb-3 bg-info d-flex flex-column justify-content-between align-items-center' id={styles.welcom}>
                        <div className='col-12 d-flex  justify-content-end '>

                            <IoCloseSharp className=' my-1 mx-1 ' style={{ fontSize: "25px" }} onClick={() => closeModal(false)} />
                        </div>

                        <h3 className='col-12 p-1 d-flex align-items-center justify-content-between flex-wrap  '  id={styles.Hi}>
                          
                            {tokenDoctor ? (
                                <>

                                   <span>Hi :&nbsp;{Profiledoctor?.firstName}  {Profiledoctor?.lastName}</span> 
                                    <img
                                        src={
                                            Profiledoctor?.imgUrl
                                                ? `${domain}/${Profiledoctor.imgUrl}`
                                                : '/default-profile.png'
                                        }
                                        width={50}
                                        height={50}
                                        className='rounded-5 ms-3'
                                        alt=""
                                    />
                                </>
                            ) : token ? (
                                <>
                                    <span>Hi :&nbsp;{Profile?.userName}</span>
                                    <img
                                        src={
                                            Profile?.profilePicturePath
                                                ? `${domain}/${Profile.profilePicturePath}`
                                                : '/default-profile.png'
                                        }
                                        width={40}
                                        height={40}
                                        className='rounded-5 ms-3'
                                        alt=""
                                    />
                                </>
                            ) : null}
                        </h3>

                    </div>


                    <div className='container ' id={styles.menuscroll} >
                        <div className=' d-flex flex-column justify-content-between gap-3'>
                            <div className=' mb-2'>
                                {/* <h5 className={styles.h5}>Profile</h5> */}
                                <Link className='d-flex gap-3 nav-link' to={'/profile'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                    <IoPersonOutline className={styles.icon} />
                                    <h5>Profile</h5>

                                </Link>
                            </div>
                            <div className=' mb-2'>
                                <Link className='d-flex gap-3 nav-link' to={destination} onClick={() => closeModal(false)} id={styles.profiletext}>
                                    <TbLockPassword className={styles.icon} />
                                    <h5>Change Password</h5>

                                </Link>
                            </div>


                            <div className='mb-2'>
                                <Link className='d-flex gap-3 nav-link ' to={'/report'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                    <TbReport className={styles.icon} />
                                    <h5>Report</h5>

                                </Link>
                            </div>
                            {
                                tokenDoctor && (
                                    <div className='d-flex flex-column gap-3'>
                                        <div className=' mb-2'>
                                            <Link className='d-flex gap-3 nav-link' to={'/ask'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                                <GoTasklist className={styles.icon} />
                                                <h5>Ask</h5>

                                            </Link>
                                        </div>
                                        <div className=' mb-2'>
                                            <Link className='d-flex gap-3 nav-link' to={'/category'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                                <BiSolidCategory className={styles.icon} />
                                                <h5>All Category</h5>

                                            </Link>
                                        </div>
                                        <div className=' mb-2'>
                                            <Link className='d-flex gap-3 nav-link' to={'/test'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                                <TbBrandSpeedtest className={styles.icon} />
                                                <h5>All Test</h5>

                                            </Link>
                                        </div>
                                        <div className=' mb-2'>
                                            <Link className='d-flex gap-3 nav-link' to={'/question'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                                <FaClipboardQuestion className={styles.icon} />
                                                <h5>All Question</h5>

                                            </Link>
                                        </div>
                                        <div className=' mb-2'>
                                            <Link className='d-flex gap-3 nav-link' to={'/bookdoctor'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                                <FaBook className={styles.icon} />
                                                <h5>All Book</h5>

                                            </Link>
                                        </div>
                                        <div className='mb-2'>
                                            <Link className='d-flex gap-3 nav-link' to={'/vediodoctor'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                                <IoPlay className={styles.icon} />
                                                <h5>All Vedio</h5>

                                            </Link>
                                        </div>
                                        <div className='mb-2'>
                                            <Link className='d-flex gap-3 nav-link' to={'/appointment'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                                <FaCalendarAlt className={styles.icon} />
                                                <h5>Book Appointment </h5>

                                            </Link>
                                        </div>
                                    </div>
                                )
                            }

                            {/* {
                                tokenDoctor && (
                                    <div className=' mb-2'>
                                        <Link className='d-flex gap-3 nav-link' to={'/ask'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                            <GoTasklist className={styles.icon} />
                                            <h5>Ask</h5>

                                        </Link>
                                    </div>

                                )
                            } */}
                            {/* {
                                tokenDoctor && (
                                    <div className=' mb-2'>
                                        <Link className='d-flex gap-3 nav-link' to={'/category'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                            <BiSolidCategory className={styles.icon} />
                                            <h5>All Category</h5>

                                        </Link>
                                    </div>
                                )
                            } */}
                            {/* {
                                tokenDoctor && (
                                    <div className=' mb-2'>
                                        <Link className='d-flex gap-3 nav-link' to={'/test'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                            <TbBrandSpeedtest className={styles.icon} />
                                            <h5>All Test</h5>

                                        </Link>
                                    </div>
                                )
                            } */}
                            {/* {
                                tokenDoctor && (
                                    <div className=' mb-2'>
                                        <Link className='d-flex gap-3 nav-link' to={'/question'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                            <FaClipboardQuestion className={styles.icon} />
                                            <h5>All Question</h5>

                                        </Link>
                                    </div>
                                )
                            } */}


                            {/* {
                                tokenDoctor && (
                                    <div className=' mb-2'>
                                        <Link className='d-flex gap-3 nav-link' to={'/bookdoctor'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                            <FaBook className={styles.icon} />
                                            <h5>All Book</h5>

                                        </Link>
                                    </div>
                                )
                            } */}
                            {/* {
                                tokenDoctor && (
                                    <div className='mb-2'>
                                        <Link className='d-flex gap-3 nav-link' to={'/vediodoctor'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                            <IoPlay className={styles.icon} />
                                            <h5>All Vedio</h5>

                                        </Link>
                                    </div>
                                )
                            } */}
                            {/* {
                                tokenDoctor && (
                                    <div className='mb-2'>
                                        <Link className='d-flex gap-3 nav-link' to={'/appointment'} onClick={() => closeModal(false)} id={styles.profiletext}>
                                            <FaCalendarAlt className={styles.icon} />
                                            <h5>Book Appointment </h5>

                                        </Link>
                                    </div>
                                )
                            } */}


                            <div className='overflow-hidden mb-2'>
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
                                    </div>
                                </div>
                            </div>
                            <div className='overflow-hidden mb-2 '>
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
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>





                </div>
            </div>
        </div>
    );
}
