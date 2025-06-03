import React, { useEffect } from 'react'
import { usecontactus, usedomain } from '../../Store'
import { getData } from '../../data/Repo/getData'
import styles from './index.module.css'
import Accordion from 'react-bootstrap/Accordion';
import { DeleteProblem } from '../../data/API/DeleteProblem';
import Swal from 'sweetalert2';
export default function Ask() {
    const { contact, setcontact } = usecontactus()
    const { domain } = usedomain()
    let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

    useEffect(() => {
        getData.get_store_contectus(domain, tokenDoctor).then((res) => {
            setcontact(res)
            console.log("get_store_contectus", res)
        })
    }, [])
    const fetchAsk = () => {
        getData.get_store_contectus(domain, tokenDoctor).then((res) => {
            setcontact(res)
            console.log("get_store_contectus", res)
        })
    }
    const handelDeleteAsk = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This Problem will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteProblem(tokenDoctor, domain, id)
                    .then(res => {
                        Swal.fire('Deleted!', 'The Problem has been deleted.', 'success');

                        fetchAsk();
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'Something went wrong while deleting the question.', 'error');
                    });
            }
        });
    };
    return (
        <div id={styles.parent}>
            
            <div id={styles.ask} className='container col-9 d-flex flex-column gap-3 mb-5'>
                {
                    Array.isArray(contact) && contact.map((el, index) => {
                        return (
                            <Accordion key={el.id} defaultActiveKey="0" >
                                <Accordion.Item eventKey="0">

                                    <Accordion.Header className='d-flex gap-5'><strong className='me-5'>problem {index + 1}</strong>    {el.title}</Accordion.Header>
                                    <Accordion.Body className='d-flex flex-column gap-2 align-items-start'>
                                        <span><strong>userName:</strong> {el.userName}</span>
                                        <span><strong>Description:</strong> {el.description}</span>
                                        <span><strong>Email:</strong> {el.email}</span>
                                        <span><strong>phone:</strong> {el.phone}</span>
                                        <span><strong>Address:</strong> {el.address}</span>
                                        <button className='btn btn-primary mt-4' onClick={() => handelDeleteAsk(el.id)} >
                                            Delete
                                        </button>

                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>
                        )
                    })
                }

            </div>
        </div>
    )
}
