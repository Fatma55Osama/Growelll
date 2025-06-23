import React, { useEffect } from 'react'
import { useDoctorReport, usedomain, useReport } from '../../Store'
import { getData } from '../../data/Repo/getData'
import frams from '../../assets/Frame.png'
import graph from '../../assets/Frame 37.png'
import styles from './index.module.css'

export default function Reports() {
  const { domain } = usedomain()
  const { report, setreport } = useReport()
  const { doctorreport, setdoctorreport } = useDoctorReport()


  let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
  let token = localStorage.getItem('token') || sessionStorage.getItem('token')

  useEffect(() => {
    if (token) {
      getData.get_rebort_show(token).then((res) => {
        setreport(res)
        console.log('report', res)
        console.log("DOMAIN:", domain)
        console.log("TOKEN:", token)
      })
    } else if (tokenDoctor) {
      getData.get_DoctorReport(tokenDoctor).then((res) => {
        setdoctorreport(res)
        console.log("DoctorReport", res)
      }).catch((err) => console.log(err))
    } else {
      console.warn("No tokendoctor found in storage")
    }


  }, [token, setreport])

  return (

    <div id={styles.parent}>
      {
        token ? (<>
          <div
            id={styles.sectionreport1}
            className="container d-flex align-items-center justify-content-between"
          >
            <div className={styles.div2 + "  ms-5 mt-2 d-flex align-items-center"}>
              {report.length > 0 ? (
                <>
                  <img src={`${domain}/${report[0]?.photo}`} width={490} height={499} alt="" />
                  <div className={styles.contantdata + " col-8 d-flex flex-column"}>
                    <div className="ps-5 py-3 d-flex flex-column gap-3">
                      <div className="d-flex flex-column gap-1 container">
                        <h4>{report[0]?.username}</h4>
                        <span>Dr: {report[0]?.doctor}</span>
                        <span>TestName: {report[0]?.testName}</span>
                        <span>Date: {new Date(report[0]?.takenAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className={styles.HaveTest + " px-5 py-3"}>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <span>Score: {report[0]?.score}</span>
                        </div>
                        <div>
                          <span>Percentage: {report[0]?.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img src={`${domain}/${report?.photo}`} width={490} height={499} alt="" />
                  <div className={styles.contantdata + " col-8 d-flex flex-column"}>
                    <div className="ps-5 py-3 d-flex flex-column gap-3">
                      <div className="d-flex flex-column gap-1 container">
                        <h4>{report?.username}</h4>
                        <span>Dr: Invaild Data</span>
                        <span>TestName: No test results found for the user.</span>
                        <span>Date: {new Date(report[0]?.takenAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className={styles.HaveTest + " px-5 py-3"}>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <span>Score: {report[0]?.score}</span>
                        </div>
                        <div>
                          <span>Percentage: {report[0]?.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              
              )}
            </div>

            <div className="col-4 " id={styles.classificat}>
              <div className="d-flex justify-content-end" id={styles.btnclassifact}>
                <button >classification</button>
              </div>
              <div className="container col-11 mt-2 text-white  d-flex  justify-content-center" id={styles.breakText}>
                {report.length > 0 ? (
                  <span className='col-12 '>{report[0]?.classificationEn}</span>
                ) : (
                  <span>{report.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 bg-white" id={styles.allsection}>
            <div className="col-12 d-flex flex-row justify-content-center">
              <div
                className="container py-3 py-md-5 col-11 col-md-10 d-flex flex-row"
                id={styles.numberdiv}
              >
                <div
                  className="col-md-3 col-3 d-flex flex-column align-items-center"
                  id={styles.div11}
                >
                  <h3>12%</h3>
                  <span>Metric description</span>
                </div>

                <div className="div11 col-md-3 d-flex flex-column align-items-center">
                  <h3>87%</h3>
                  <span>Metric description</span>
                </div>

                <div className="div11 col-md-3 d-flex flex-column align-items-center">
                  <h3>$5000</h3>
                  <span>Metric description</span>
                </div>

                <div className="div11 col-md-3 d-flex flex-column align-items-center">
                  <h3>87%</h3>
                  <span>Metric description</span>
                </div>
              </div>
            </div>
          </div>

          {/* <h2 className='text-primary mt-4 d-flex justify-content-center'>All your Reports</h2> */}
          <div className='d-flex  ms-5 mt-5 container d-flex flex-wrap gap-4 justify-content-center' >

            {Array.isArray(report) && report.length > 0 && report.map((el, index) => (
              <div key={index} className={styles.contantdata2 + " col-5 d-flex flex-column ms-5 mt-4 "}>
                <div className="ps-5 py-3 d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-1 container">
                    <h4>Report {index + 1}</h4>
                    <span>Dr: {el.doctor}</span>
                    <span>TestName: {el.testName}</span>
                    <span>Date: {new Date(el?.takenAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className={styles.HaveTest2 + " px-5 py-3"}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span>Score: {el.score}</span>
                    </div>
                    <div>
                      <span>Percentage: {el.percentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </>) : <>
          {Array.isArray(doctorreport) && doctorreport.length > 0 ? (
            <>
              <div className="text-center" id={styles.h2}>
                <h2 className="text-primary ">Dr. {doctorreport[0].doctor}</h2>
              </div>

              <div className='d-flex justify-content-center  mt-5 container flex-wrap gap-4'>
                {doctorreport.map((el, index) => (
                  <div key={index} className={styles.contantdata2 + " col-5 d-flex flex-column ms-5 mt-4"}>
                    <div className="ps-5 py-3 d-flex flex-column gap-3">
                      <div className="d-flex flex-column gap-1 container">
                        <h4>Report {index + 1}</h4>
                        <span>username: {el.username}</span>
                        <span>Test: {el.test}</span>
                        <span>TestName: {el.testName}</span>
                        <span>classificationEn: {el.classificationEn}</span>
                        <span>Date: {new Date(el?.takenAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className={styles.HaveTest2 + " px-5 py-3"}>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <span>Score: {el.score}</span>
                        </div>
                        <div>
                          <span>Percentage: {el.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center d-flex justify-content-center align-items-center " id={styles.noreport}>
             <h2>No reports available at the moment</h2>
            </div>
          )}
        </>


      }


    </div>
  )

}
