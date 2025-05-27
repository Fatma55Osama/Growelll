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
import { TbReport } from "react-icons/tb";
export default function Menu() {
    const { closeModal } = useModale();
    const navigate = useNavigate()
    const { domain } = usedomain()
    let token = localStorage.getItem('token') || sessionStorage.getItem('token')
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 500) {
                closeModal(); // يقفل المودال لما يتجاوز 500px
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const DeleteAccountfunc = () => {
        console.log('Token:', token);
        DeleteAccount(token, domain).then(res => {
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            navigate('/login')
            closeModal()
        }).catch(console.error);
    }
    const logout = () => {
        Logout(token, domain).then(res => {
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            navigate('/login')
            closeModal()
        }).catch(console.error);
    }


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
                            <div className='d-flex align-items-center gap-3' id={styles.profiletext} onClick={DeleteAccountfunc}>
                                <MdDelete className={styles.icon1} />
                                <div className='col-10 ' id={styles.massege}>
                                    <h5>Delete Account</h5>
                                    {/* <p id={styles.p}>  This action is permanent and cannot be undone.</p> */}
                                </div>
                            </div>
                        </div>
                        <div className='overflow-hidden mb-2 '>
                            {/* <h5 className={styles.h5}>Are you sure you want to log out?</h5> */}
                            <div className='d-flex j align-items-center gap-3' id={styles.profiletext} onClick={logout}>
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
