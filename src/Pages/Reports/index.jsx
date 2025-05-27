import React, { useEffect } from 'react'
import { usedomain, useReport } from '../../Store'
import { getData } from '../../data/Repo/getData'
import frams from '../../assets/Frame.png'
import graph from '../../assets/Frame 37.png'
import styles from './index.module.css'

export default function Reports() {
  const { domain } = usedomain()
  const { report, setreport } = useReport()
  let token = localStorage.getItem('token') || sessionStorage.getItem('token')

  useEffect(() => {
    if (token) {
      getData.get_rebort_show(token).then((res) => {
        setreport(res)
        console.log('report', res)
        console.log("DOMAIN:", domain)
        console.log("TOKEN:", token)
      })
    } else {
      console.warn("No token found in storage")
    }
  }, [domain, token, setreport])

  return (
    <>
      {report.length > 0 && (
        <div id={styles.parent}>
          <div
            id={styles.sectionreport1}
            className="d-flex align-items-center justify-content-between"
          >
            <div
              className={styles.div2 + " ms-5 mt-2 d-flex align-items-center"}
            >
              <img src={`${domain}/${report[0]?.image}`} width={490} height={499} alt="" />
              <div
                className={styles.contantdata + " col-8 d-flex flex-column"}
              >
                <div className="ps-5 py-3 d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-1 container">
                    <h4>{report[0]?.userName}</h4>
                    <span>Dr: {report[0]?.doctorName}</span>
                    <span>TestName: {report[0]?.testName}</span>
                    <span>Date: {new Date(report[0]?.takenAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className={styles.HaveTest + " px-5 py-3"}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span>Score:  {report[0]?.score}</span>
                    </div>
                    <div>
                      <span>Percentage: {report[0]?.percentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4" id={styles.classificat}>
              <div
                className="d-flex justify-content-end"
                id={styles.btnclassifact}
              >
                <button>classification</button>
              </div>
              <div className="container text-white">
                <span>{report[0]?.classificationEn}</span>
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

          <div>
            <div
              className={styles.graphphoto + " container d-flex justify-content-between"}
            >
              <div className="col-5 mt-5" id={styles.setion1}>
                <img src={graph} height={400} alt="" />
              </div>
              <div className="col-5 mt-5 me-5" id={styles.setion1}>
                <img src={graph} height={400} alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
