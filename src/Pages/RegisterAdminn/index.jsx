import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import { InputAdornment } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/Growell.svg'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function RegisterAdminn() {
    const FirstName = useRef();
    const SecondName = useRef();
    const LastName = useRef();
    const Email = useRef();
    const Gender = useRef();
    const Bio = useRef();
    const AboutMe = useRef();
    const Description = useRef();
    const PhoneNumber = useRef();
    const AboutOfKids = useRef();
    const TargetAgeGroup = useRef();
    const Specialization = useRef();
    const Address = useRef();
    const YearsOfExperience = useRef();
    const AveRating = useRef();
    const Age = useRef();
    const Education = useRef();
    const ImgUrl = useRef();
    const Password = useRef();
    const ConfirmPassword = useRef();
    const navigate = useNavigate()
    const [error, setError] = useState('');


    const handelregister = (e) => {
        e.preventDefault();
        let Firstvalue = FirstName.current.value
        let Secondvalue = SecondName.current.value
        let Lastvalue = LastName.current.value
        let Emailvalue = Email.current.value
        let Gendervalue = Gender.current.value
        let Biovalue = Bio.current.value
        let AboutMevalue = AboutMe.current.value
        let Descriptionvalue = Description.current.value
        let PhoneNumbervalue = PhoneNumber.current.value
        let AboutOfKidsvalue = AboutOfKids.current.value
        let TargetAgeGroupvalue = TargetAgeGroup.current.value
        let Specializationvalue = Specialization.current.value
        let Addressvalue = Address.current.value
        let YearsOfExperiencevalue = YearsOfExperience.current.value
        let AveRatingvalue = AveRating.current.value
        let Agevalue = Age.current.value
        let Educationvalue = Education.current.value
        let ImgUrlvalue = ImgUrl.current.files[0]
        let Passwordvalue = Password.current.value
        let ConfirmPasswordvalue = ConfirmPassword.current.value
        if (!Firstvalue || !Secondvalue || !Lastvalue || !Emailvalue || !Gendervalue || !Biovalue || !AboutMevalue || !Descriptionvalue || !PhoneNumbervalue || !AboutOfKidsvalue || !TargetAgeGroupvalue || !Specializationvalue || !Addressvalue || !YearsOfExperiencevalue || !AveRatingvalue || !Agevalue || !Educationvalue  || !Passwordvalue || !ConfirmPasswordvalue) {
            Swal.fire({
                icon: "warning",
                text: "All fields are required"
            })
            return
        }
        if (Passwordvalue != ConfirmPasswordvalue) {
            Swal.fire({
                icon: "warning",
                text: "Passwords do not match"
            })
            return
        }
        const formData = new FormData();
        formData.append("FirstName", Firstvalue);
        formData.append("SecondName", Secondvalue);
        formData.append("LastName", Lastvalue);
        formData.append("Email", Emailvalue);
        formData.append("Gender", Gendervalue)
        formData.append("Bio", Biovalue);
        formData.append("AboutMe", AboutMevalue);
        formData.append("Description", Descriptionvalue);
        formData.append("PhoneNumber", PhoneNumbervalue);
        formData.append("AboutOfKids", AboutOfKidsvalue);
        formData.append("TargetAgeGroup", TargetAgeGroupvalue);
        formData.append("Specialization", Specializationvalue)
        formData.append("Address", Addressvalue);
        formData.append("YearsOfExperience", YearsOfExperiencevalue);
        formData.append("AveRating", AveRatingvalue);
        formData.append("Age", Agevalue);
        formData.append("Education", Educationvalue);
        formData.append("ImgUrl", ImgUrlvalue);
        formData.append("Password", Passwordvalue);
        formData.append("ConfirmPassword", ConfirmPasswordvalue)

        axios.post("https://localhost:7071/api/AccountDoctor/Register", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {

            console.log(res)
            Swal.fire({
                icon: "success",
                text: "Registration successful"
            })
            navigate('/Loginadmin')
        }).catch((err) => {
            console.log(err.response?.data)
            console.log(err.message)
            if (err.response && err.response.data) {
                const validationErrors = err.response.data.errors;
                if (validationErrors) {
                    console.log("Validation errors:", validationErrors);
                    setError(validationErrors);
                } else {
                    setError({ general: [err.response.data.message || "Unknown error occurred"] });
                }
            }

            Swal.fire({
                icon: "error",
                text: "Field Register"
            })
        })
    }




    return (
        <div className='col-12' id={styles.parent}>
            <div className='container  d-flex justify-content-center mt-3 ' id={styles.create}>
                <div className='col-10 d-flex flex-column'>
                    <img src={logo} width={230} alt="" />
                    <h2>REGISTER Doctor</h2>
                    <form action="" className='col-12 mt-3 d-flex flex-column gap-5' onSubmit={handelregister}>
                        {/* <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-5 gap-md-0'>

                            <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                                <label>QuestionText</label>
                                <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your QuestionText ' />

                            </div>

                          

                        </div> */}
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>FirstName</label>
                                <input ref={FirstName} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your FirstName ' />
                                {error.FirstName && <div className="text-danger">{error.FirstName}</div>}


                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>SecondName</label>
                                <input ref={SecondName} className='py-2 col-10' type="text" placeholder='  Please Enter your SecondName ' />
                                {error.SecondName && <div className="text-danger">{error.SecondName}</div>}

                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>LastName</label>
                                <input ref={LastName} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your LastName ' />
                                {error.LastName && <div className="text-danger">{error.LastName}</div>}

                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>Email</label>
                                <input ref={Email} className='py-2 col-10' type="email" placeholder='  Please Enter your Email ' />
                            </div>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Gender</label>
                                <input ref={Gender} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your Gender ' />
                                {error.Gender && <div className="text-danger">{error.Gender[0]}</div>}

                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>Bio</label>
                                <input ref={Bio} className='py-2 col-10' type="text" placeholder='  Please Enter your Bio ' />
                            </div>

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>AboutMe</label>
                                <input ref={AboutMe} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your AboutMe ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>Description</label>
                                <input ref={Description} className='py-2 col-10' type="text" placeholder='  Please Enter your Description ' />
                            </div>

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>PhoneNumber</label>
                                <input ref={PhoneNumber} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your PhoneNumber ' />
                                {error.PhoneNumber && <div className="text-danger">{error.PhoneNumber}</div>}

                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>AboutOfKids</label>
                                <input ref={AboutOfKids} className='py-2 col-10' type="text" placeholder='  Please Enter your AboutOfKids ' />
                            </div>

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>TargetAgeGroup</label>
                                <input ref={TargetAgeGroup} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your TargetAgeGroup ' />
                                {error.TargetAgeGroup && <div className="text-danger">{error.TargetAgeGroup}</div>}

                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>Specialization</label>
                                <input ref={Specialization} className='py-2 col-10' type="text" placeholder='  Please Enter your Specialization ' />
                                {error.Specialization && <div className="text-danger">{error.Specialization}</div>}

                            </div>

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Address</label>
                                <input ref={Address} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your Address ' />
                                {error.Address && <div className="text-danger">{error.Address}</div>}

                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>YearsOfExperience</label>
                                <input ref={YearsOfExperience} className='py-2 col-10' type="number" placeholder='  Please Enter your YearsOfExperience ' />
                            </div>

                        </div>

                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>AveRating</label>
                                <input ref={AveRating} className='py-2 col-12 col-md-10' type="number" placeholder='  Please Enter your AveRating ' />
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>Age</label>
                                <input ref={Age} className='py-2 col-10' type="number" placeholder='  Please Enter your Age ' />
                                {error.Age && <div className="text-danger">{error.Age[0]}</div>}

                            </div>

                        </div>


                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Education</label>
                                <input ref={Education} className='py-2 col-12 col-md-10' type="text" placeholder='  Please Enter your Education ' />
                                {error.Education && <div className="text-danger">{error.Education[0]}</div>}

                                
                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>Img</label>
                                <input ref={ImgUrl} className='py-2 col-10' type="file" placeholder='  Please Enter your ImgUrl ' />
                                {/* {error.ImgUrl && <div className="text-danger">{error.ImgUrl[0]}</div>} */}

                            </div>

                        </div>


                        <div className='col-12 d-flex flex-row justify-content-between flex-wrap gap-3 gap-md-0'>

                            <div className='col-8 col-md-6 d-flex flex-column gap-2'>
                                <label>Password</label>
                                <input ref={Password} className='py-2 col-12 col-md-10' type="Password" placeholder='  Please Enter your Password ' />
                                {error.Password && <div className="text-danger">{error.Password[0]}</div>}


                            </div>

                            <div className='col-10 col-md-6 d-flex flex-column gap-2 '>
                                <label>ConfirmPassword</label>
                                <input ref={ConfirmPassword} className='py-2 col-10' type="password" placeholder='  Please Enter your ConfirmPassword ' />
                            </div>

                        </div>
                        {/* <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>CorrectAnswer</label>
                            <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your CorrectAnswer ' />

                        </div>

                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>OrderNumber</label>
                            <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your OrderNumber ' />

                        </div>


                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>OrderNumber</label>
                            <input className='py-2 col-11' type="date"
                                min={new Date().toISOString().split('T')[0]}
                                max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} />
                        </div>
                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>testID</label>
                            <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your testID ' />

                        </div>
                        <div className='col-12 col-md-12 d-flex flex-column gap-2'>
                            <label>DoctorID</label>
                            <input className='py-2 col-12 col-md-11' type="text" placeholder='  Please Enter your DoctorID ' />

                        </div>
                         */}
                        <div className='d-flex flex-column '>

                            <button type='submit' className={styles.button + ' py-2 py-md-3 col-5 text-white col-lg-11 mb-4 '}> Register </button>
                            <span className='text-center mb-3'>Already have an account? <Link to="/Loginadmin" className={styles["link_gologin"]}> Go to Login</Link></span>

                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}
