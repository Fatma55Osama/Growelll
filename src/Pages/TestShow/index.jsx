import React, { useEffect } from 'react'
import styles from './index.module.css'
import growell from '../../assets/Growell222.svg'
import frams from '../../assets/Frame.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCategory, useData, usedomain } from '../../Store'
import { getData } from '../../data/Repo/getData'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Bounce, toast } from 'react-toastify'
import { ToastContainer } from 'react-bootstrap'

export default function TestShow() {
  const { id } = useParams();
  const { domain } = usedomain()
  const { detailsdoctor, setdailsdoctor } = useData()

  const params = useParams()
  const navigate = useNavigate()

  // let id = params.categoryID

  useEffect(() => {

    getData.get_single_dotor(domain, id).then((res) => {
      setdailsdoctor(res)
      console.log(res)
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        console.log(err.response)
        toast.error("Access to the test is not permitted for doctors.");
        setTimeout(() => {
          navigate(`/DetailsDoctor/${id}/tests`);
        }, 1500);
      }
    });
  }, [])
  return (
    <div className='col-12 d-flex' id={styles.testnow}>
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
      />
      <div className='container d-flex flex-column flex-grow-1  '>

        <div className='py-4 d-flex gap-3'>
          <Link to={`/DetailsDoctor/${id}/tests`}>  <IoIosArrowRoundBack className=' text-primary bg-white rounded-2' style={{ fontSize: "50px" }} /></Link>

          <img src={growell} alt="" />
        </div>
        <div className='d-flex flex-row justify-content-center mt-5 h-100'>

          <div className='col-6  h-100 d-flex flex-column justify-content-center pb-3'>
            <h3>Tests :</h3>

            <div className='col-12 d-flex flex-column text-center gap-3'>
              {detailsdoctor?.categories[0]?.tests?.length > 0 ? (
                detailsdoctor.categories[0]?.tests.map((el, index) => (
                  <Link
                    key={index}
                    className="nav-link py-3 px-3"
                    to={`/DetailsDoctor/${id}/test/${el.testID}`}
                    id={styles.numbertest}
                  >
                    {el.testName}
                  </Link>
                ))
              ) : (
                <div className="nav-link py-3 px-3 text-center" id={styles.numbertest}>
                  No Test Available
                </div>
              )}


            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
