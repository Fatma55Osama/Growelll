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
import { usebookdoctor, usedomain } from '../../../Store';
import { DeleteQuestions } from '../../../data/API/DeleteQuestions';
import Swal from 'sweetalert2';
import { DeleteTest } from '../../../data/API/DeleteTest';
import { Bookeventdoctor } from '../../../data/API/Bookeventdoctor';
import { Card } from 'react-bootstrap';
import { DeleteBook } from '../../../data/API/DeleteBook';
export default function Book() {
    const { domain } = usedomain()
    const navigate = useNavigate()

    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    const { bookdoctor, setbookdoctor } = usebookdoctor()



    useEffect(() => {
        if (tokenDoctor) {
            Bookeventdoctor(tokenDoctor, domain).then((res) => {
                console.log("bookdoctor", res);
                setbookdoctor(res)
                // navigat('/question')
            }).catch((err) => {
                console.log(err)
            })
        } else {
            navigate('/')
        }

    }, [])
    const fetchBook = () => {
        Bookeventdoctor(tokenDoctor, domain)
            .then(res => {
                setbookdoctor(res);
            })
            .catch(err => console.log(err));
    };

    const handelDeleteBook = (id) => {
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
                DeleteBook(tokenDoctor, domain, id)
                    .then(res => {
                        Swal.fire('Deleted!', 'The Book has been deleted.', 'success');

                        fetchBook();
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'Something went wrong while deleting the Book.', 'error');
                    });
            }
        });
    };

    return (
        <div className={styles.parent + " d-flex flex-column  justify-content-center align-items-center "}>



          
            <div className={styles.divqqa + "   d-flex  flex-column  gap-4 col-10 justify-content-center align-items-center "} >
                <Link className=' col-3 d-flex justify-content-center  rounded-4 nav-link'  to={'/createbook'}  id={styles.btnaddd}>
                    <Link className='nav-link py-3  ' to={'/createbook'} > <IoIosAddCircleOutline /> Add new Book</Link>
                </Link>
                <div className={styles.divqqa + "   d-flex flex-wrap   gap-4 col-10 justify-content-center align-items-center"} >

                    {
                        Array.isArray(bookdoctor) && bookdoctor.length > 0 ? (
                            bookdoctor.map((el, index) => (
                                <div key={el.bookEventId} className='container col-3' >

                                    <Card style={{ width: '19rem', height: "580px" }}>
                                        <Card.Img variant="top" src={`${domain}${el.bookImagePath}`} height={250} />
                                        <Card.Body className='d-flex flex-column justify-content-end'>
                                            <Card.Title>{el.bookTitle}</Card.Title>
                                            <Card.Text>
                                                {el.aboutOfBook}
                                            </Card.Text>
                                            {/* <Card.Text>
                                            {el.description}
                                        </Card.Text> */}
                                            <div className='d-flex flex-column  gap-3'>
                                                <a href={el.bookUrl} target="_blank" className='btn btn-primary'>Show</a>
                                                <div className={styles.icon + " d-flex gap-5 me-3"}>
                                                    <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon} to={`/editebook/${el.bookEventId}`}>
                                                        <FiEdit /><span>Edit</span>
                                                    </Link>
                                                    <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon} onClick={() => handelDeleteBook(el.bookEventId)}>
                                                        <RiDeleteBin6Line /><span>Delete</span>
                                                    </Link>
                                                </div>
                                            </div>

                                        </Card.Body>

                                    </Card>

                                

                                </div>
                            ))
                        ) : (
                            <div className="text-center text-secondary my-5 d-flex justify-content-center align-items-center">
                                <h4>{bookdoctor?.message || "No Book found."}</h4>
                            </div>
                        )
                    }

                </div>




            </div>

        </div>
    )
}
