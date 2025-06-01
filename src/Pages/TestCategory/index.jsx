import React, { useEffect } from 'react'
import styles from './index.module.css'
import growell from '../../assets/Growell222.svg'
import frams from '../../assets/Frame.png'
import { Link, useParams } from 'react-router-dom'
import { useData, usedomain } from '../../Store'
import { getData } from '../../data/Repo/getData'
import { IoIosArrowRoundBack } from 'react-icons/io'

export default function TestCategory() {
  const { id } = useParams();
  const { domain } = usedomain()
  const { detailsdoctor, setdailsdoctor } = useData()
  useEffect(() => {
    getData.get_single_dotor(domain, id).then((res) => {
      setdailsdoctor(res)
      console.log(res)
    }).catch((err) => console.log(err))
  }, [])
  return (
    <div className='col-12 d-flex' id={styles.testnow}>
      <div className='container d-flex flex-column flex-grow-1  '>

        <div className='py-4 d-flex gap-3'>
          <Link to={`/DetailsDoctor/${id}`}>  <IoIosArrowRoundBack className=' text-primary bg-white rounded-2' style={{ fontSize: "50px" }} /></Link>

          <img src={growell} alt="" />
        </div>
        <div className='d-flex flex-row justify-content-center align-items-center mt-5 h-100'>
          <div className='col-6  d-flex flex-column justify-content-center align-items-center ' id={styles.detailtest}>
            <div className='col-12 d-flex flex-column justify-content-center align-items-start gap-2'>
              <img src={`${domain}/${detailsdoctor.imgUrl}`} width={450} height={451} alt="" />
              <h3>Dr.{detailsdoctor.fullName}</h3>
              <p>{detailsdoctor.bio}</p>
            </div>
          </div>
          <div className='col-6  h-100 d-flex flex-column justify-content-center '>
            <h3>Tests :</h3>

            <div className='col-12 d-flex flex-column text-center gap-3'>
              {detailsdoctor?.tests?.length > 0 ? (
                detailsdoctor.tests.map((el, index) => (
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
              {/* <Link className="nav-link py-3 px-3" to={'/DetailsDoctor/:id/test/:testNumber'} id={styles.numbertest}>Test 1 </Link>
              <Link className="nav-link py-3 px-3" to={'/DetailsDoctor/:id/test/:testNumber'} id={styles.numbertest}>Test 2 </Link>
              <Link className="nav-link py-3 px-3" to={'/DetailsDoctor/:id/test/:testNumber'} id={styles.numbertest}>Test 3 </Link> */}

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
