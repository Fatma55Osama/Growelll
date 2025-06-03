import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import growell from '../../assets/Growell222.svg';
import { LuBrain } from "react-icons/lu";
import { IoWarningOutline } from "react-icons/io5";
import { usedomain, useQuestion } from '../../Store';
import { useNavigate, useParams } from 'react-router-dom';
import { getData } from '../../data/Repo/getData';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Bounce, toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';

export default function TestNow() {
  const [started, setStarted] = useState(false);
  const { question, setquestion } = useQuestion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const params = useParams();
  const { domain } = usedomain();
  const navigate = useNavigate()
  let testNumber = params.testNumber;
  const [error401, setError401] = useState(false)
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      toast.error("Access to the test is not permitted for doctors.");
      const id = params.id || 'default';
      navigate(`/DetailsDoctor/${id}/tests`);
      return;
    }
    getData.get_single_question(domain, testNumber, token)
      .then((res) => {
        setquestion(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          setError401(true);
          toast.error("Access to the test is not permitted for doctors.");

        } else {
          setError401(false);
        }
      });
  }, []);
  const finishTest = () => {
    const userAnswers = question.map((q, index) => answers[index]);

    axios.post(
      `${domain}/api/TestHome/${testNumber}/submit`,
      userAnswers,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(({ data }) => {
      Swal.fire({
        title: 'Test submitted successfully!',
        html: `
    <p><strong>Total Questions:</strong> ${data.totalQuestions}</p>
    <p><strong>Correct Answers:</strong> ${data.correctAnswers}</p>
    <p><strong>Score:</strong> ${data.score}</p>
  `,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Go to Home',
        cancelButtonText: 'Go to Event',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/Event');
        }
      });
    })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: error.response?.data?.message || 'Invalid data or request failed.',
          confirmButtonText: 'OK'
        });
      });
  };
  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentIndex]: e.target.value });
  };
  console.log("answers,", answers)
  const goNext = () => {
    if (currentIndex < question.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isAnswerSelected = answers[currentIndex] !== undefined;

  return (
    <div className="d-flex justify-content-center align-items-center h-100" id={styles.testnow}>
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
      <div className="container d-flex flex-column justify-content-center h-75 col-8">

        {!started ? (
          <>
            <div className='container d-flex flex-column align-items-center col-12'>
              <div className='py-4'>
                <img src={growell} alt="" />
              </div>

              {question.length === 0 ? (
                <div className="nav-link py-3 px-3 col-7 mt-5 text-center" id={styles.numbertest}>
                  No Test Available
                </div>
              ) : (
                <>
                  <div className='d-flex flex-column justify-content-between align-items-center gap-3'>
                    <div className="mb-6 d-flex justify-content-around col-8 py-3" id={styles.regtangl}>
                      <div id={styles.cycleicon} className='d-flex flex-column justify-content-center align-items-center'>
                        <LuBrain id={styles.icon} />
                      </div>
                      <div className='col-9'>
                        <h5 className="text-xl font-semibold mb-2"> About the Test</h5>
                        <p className="text-gray-600">
                          This quick and interactive test will help us understand how you think and process information — including your focus, memory, and speed
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 d-flex justify-content-around col-8 py-3" id={styles.regtangl}>
                      <div id={styles.cycleicon} className='d-flex flex-column justify-content-center align-items-center'>
                        <IoWarningOutline id={styles.icon} />
                      </div>
                      <div className='col-9'>
                        <h5 className="text-xl font-semibold mb-2"> What to Expect</h5>
                        <ul className="list-decimal list-inside text-gray-600 ">
                          <li>Quick and engaging tasks</li>
                          <li>Assess your focus, memory, and thinking speed</li>
                          <li>No right or wrong answers — just be honest</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6 d-flex justify-content-around col-8 py-3" id={styles.regtangl}>
                      <div id={styles.cycleicon} className='d-flex flex-column justify-content-center align-items-center'>
                        <IoWarningOutline id={styles.icon} />
                      </div>
                      <div className='col-9'>
                        <h5 className="text-xl font-semibold mb-2">Before You Begin</h5>
                        <ul className="list-decimal list-inside text-gray-600 ">
                          <li>Find a quiet and comfortable space</li>
                          <li>Take your time - there's no rush</li>
                          <li>Answer calmly and honestly</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStarted(true)}
                    className="align-self-center py-3 px-5 my-4"
                    id={styles.numbertest}
                  >
                    Start Test
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className='py-5'>
              <img src={growell} width={200} alt="" />
            </div>
            {question.length > 0 && (
              <>
                <h2 className="text-xl mb-4">Question {currentIndex + 1}</h2>
                <h3 className="mb-4">{question[currentIndex].questionText}</h3>
                <div className="mb-6 w-100">
                  {question[currentIndex].answerOptions.map((option, index) => (
                    <div key={index} className="form-check mb-2 py-3 container" id={styles.checkedstyle}>
                      <div className='ms-3'>
                        <input
                          type="radio"
                          id={`q${currentIndex}_opt${index}`}
                          name={`question_${currentIndex}`}
                          value={option}
                          onChange={handleAnswerChange}
                          checked={answers[currentIndex] === option}
                          className="form-check-input"
                        />
                        <label htmlFor={`q${currentIndex}_opt${index}`} className="form-check-label">
                          {option}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between w-100 mt-5">
                  <button
                    onClick={goPrevious}
                    disabled={currentIndex === 0}
                    className="btn"
                    id={styles.btn1}
                  >
                    Previous
                  </button>

                  <button
                    onClick={currentIndex === question.length - 1 ? finishTest : goNext} disabled={!isAnswerSelected}
                    className="btn px-4"
                    id={styles.btn2}
                  >
                    {currentIndex === question.length - 1 ? "Finish" : "Next"}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
