import React, { useEffect } from 'react'
import styles from './index.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { usedomain, usevediodoctor } from '../../../Store';
import Swal from 'sweetalert2';
import { Card } from 'react-bootstrap';
import { DeleteBook } from '../../../data/API/DeleteBook';
import { Store_vediodoctor } from '../../../data/API/vediodoctor';
import { Deletevedio } from '../../../data/API/Deletevedio';
export default function Viedo() {
    const { domain } = usedomain()
    const navigate = useNavigate()



    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    const { videodoctor, setvideodoctor } = usevediodoctor()



    useEffect(() => {
        if (tokenDoctor) {
            Store_vediodoctor(tokenDoctor, domain).then((res) => {
                console.log("vediodoctor", res);
                setvideodoctor(res)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            navigate('/')
        }

    }, [])
    const fetchvedio = () => {
        Store_vediodoctor(tokenDoctor, domain)
            .then(res => {
                setvideodoctor(res);
            })
            .catch(err => console.log(err));
    };

    const handelDeletevedio = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This Vedio will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                Deletevedio(tokenDoctor, domain, id)
                    .then(res => {
                        Swal.fire('Deleted!', 'The Vedio has been deleted.', 'success');

                        fetchvedio();
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'Something went wrong while deleting the Vedio.', 'error');
                    });
            }
        });
    };

    return (
        <div className={styles.parent + " d-flex flex-column  justify-content-center align-items-center "}>




            <div className={styles.divqqa + "   d-flex  flex-column  gap-4 col-10 justify-content-center align-items-center "} >
                <Link className=' col-3 d-flex justify-content-center  rounded-4 nav-link' to={'/createbook'} id={styles.btnaddd}>
                    <Link className='nav-link py-3  ' to={'/createvedio'} > <IoIosAddCircleOutline /> Add new Vedio</Link>
                </Link>
                <div className={styles.divqqa + "   d-flex flex-wrap   gap-4 col-10 justify-content-center align-items-center"} >

                    {
                        Array.isArray(videodoctor) && videodoctor.length > 0 ? (
                            videodoctor.map((el, index) => (
                                <div key={el.videoEventId} className='container col-3' >

                                    <Card style={{ width: '19rem', height: "580px" }}>
                                        <Card.Img variant="top" src={`${domain}${el.videoImagePath}`} height={300} />
                                        <Card.Body className='d-flex flex-column justify-content-end'>
                                            <Card.Title>{el.videoTitle}</Card.Title>
                                            <Card.Text>
                                                {el.aboutOfVideo}
                                            </Card.Text>
                                            {/* <Card.Text>
                                            {el.description}
                                        </Card.Text> */}
                                            <div className='d-flex flex-column  gap-3'>
                                                <a href={el.videoUrl} target="_blank" className='btn btn-primary'>Show</a>
                                                <div className={styles.icon + " d-flex gap-5 me-3"}>
                                                    <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon} to={`/editevedio/${el.videoEventId}`}>
                                                        <FiEdit /><span>Edit</span>
                                                    </Link>
                                                    <Link className='nav-link d-flex align-items-center gap-2' id={styles.icon} onClick={() => handelDeletevedio(el.videoEventId)}>
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
                                <h4>{videodoctor?.message || "No Vedio found."}</h4>
                            </div>
                        )
                    }

                </div>




            </div>

        </div>
    )
}
