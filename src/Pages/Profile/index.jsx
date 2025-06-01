import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaAddressCard, FaCamera } from "react-icons/fa";
import { getData } from '../../data/Repo/getData';
import { usedomain, useProfile, useProfileDoctor } from '../../Store';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { HiPencil } from "react-icons/hi2";
import Swal from 'sweetalert2';

export default function Profile() {
  const { domain } = usedomain()
  const { Profile, setprofile } = useProfile()
  const [hasChanges, setHasChanges] = useState(false);
  const { Profiledoctor, setprofiledoctor } = useProfileDoctor()
  const [doctorHasChanges, setDoctorHasChanges] = useState(false);
  const [editMode, setEditMode] = useState({ userName: false, email: false, phoneNumber: false, adderss: false })
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    profilePictureFile: null,
    adderss: ''
  })
  const [editModeDoctor, setEditModeDoctor] = useState({
    firstName: false,
    secondName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    address: false,
    age: false,
    specialization: false,
    education: false,
    yearsOfExperience: false,
    bio: false,
    aboutMe: false,
    description: false,
  });

  const [formDataDoctor, setFormDataDoctor] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    age: '',
    specialization: '',
    education: '',
    yearsOfExperience: '',
    bio: '',
    aboutMe: '',
    description: '',
    profilePictureFile: null,
    // imgUrl: '',
  });
  let token = localStorage.getItem('token') || sessionStorage.getItem('token')
  let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");

  useEffect(() => {
    if (token) {
      getData.get_profile(domain, token).then((res) => {
        console.log("API response:", res);
        setprofile(res)
        setFormData({
          userName: res.userName,
          email: res.email,
          phoneNumber: res.phoneNumber,
          profilePictureFile: null,
          adderss: res.adderss || ''
        })
      })
    } else if (tokenDoctor) {
      getData.get_profileDoctor(domain, tokenDoctor).then((res) => {
        console.log("DoctorProfile:", res);
        setprofiledoctor(res)
        setFormDataDoctor({
          firstName: res.firstName || '',
          secondName: res.secondName || '',
          lastName: res.lastName || '',
          email: res.email || '',
          phoneNumber: res.phoneNumber || '',
          address: res.address || '',
          age: res.age || '',
          specialization: res.specialization || '',
          education: res.education || '',
          yearsOfExperience: res.yearsOfExperience || '',
          bio: res.bio || '',
          aboutMe: res.aboutMe || '',
          description: res.description || '',
          imgUrl: res.imgUrl || '',
        });
      }).catch((err) => {
        console.log('Error fetching doctor profile:', err)
      })
    }

  }, [domain, token])

  const handleInputChangeDoctor = (e) => {
    setFormDataDoctor(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setDoctorHasChanges(true)
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setHasChanges(true);
  }

  const handleImageChangeDoctor = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormDataDoctor(prev => ({ ...prev, profilePictureFile: file }));

      if (formDataDoctor.profilePictureFile) {
        URL.revokeObjectURL(formDataDoctor.profilePictureFile);
      }

      const imgURL = URL.createObjectURL(e.target.files[0]);
      setprofiledoctor(prev => ({ ...prev, profilePicturePath: imgURL }));
      setDoctorHasChanges(true)
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profilePictureFile: file }));

      // قم بإلغاء الـ URL السابق إن وجد
      if (formData.profilePictureFile) {
        URL.revokeObjectURL(formData.profilePictureFile);
      }

      const imgURL = URL.createObjectURL(e.target.files[0])
      setprofile(prev => ({ ...prev, profilePicturePath: imgURL }))
      setHasChanges(true);
    }
  }



  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(phone);
  };



  const handleSaveDoctor = async () => {
    if (!isValidPhoneNumber(formDataDoctor.phoneNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number',
        text: 'Phone number must contain 7 to 15 digits and can optionally start with +',
      });
      return;
    }

    const data = new FormData();
    data.append('firstName', formDataDoctor.firstName);
    data.append('secondName', formDataDoctor.secondName);
    data.append('lastName', formDataDoctor.lastName);
    data.append('email', formDataDoctor.email);
    data.append('phoneNumber', formDataDoctor.phoneNumber);
    data.append('address', formDataDoctor.address);
    data.append('age', formDataDoctor.age);
    data.append('specialization', formDataDoctor.specialization);
    data.append('education', formDataDoctor.education);
    data.append('yearsOfExperience', formDataDoctor.yearsOfExperience);
    data.append('bio', formDataDoctor.bio);
    data.append('aboutMe', formDataDoctor.aboutMe);
    data.append('description', formDataDoctor.description);
    // data.append('ImgUrl', formDataDoctor.imgUrl || '');
    if (formDataDoctor.profilePictureFile) {
      data.append('ImgUrl', formDataDoctor.profilePictureFile);
    }

    console.log('FormData about to be sent:');
    for (let pair of data.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    // if (formDataDoctor.profilePictureFile) {
    //   data.append('profilePicture', formDataDoctor.profilePictureFile);
    // }
    // if (formDataDoctor.profilePictureFile) {
    //   data.append('profilePicture', formDataDoctor.profilePictureFile);
    // } else {
    //   data.append('ImgUrl', formDataDoctor.imgUrl || '');
    // }
    //  if (formDataDoctor.profilePictureFile) {
    //     data.append('profilePicture', formDataDoctor.profilePictureFile);
    //   }
    // console.log('Doctor FormData about to be sent:');
    // for (let pair of data.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    try {
      const res = await fetch(`${domain}/api/AccountDoctor/update-profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokenDoctor}`,

        },
        body: data,
      });


      const text = await res.text();
      let result = {};

      try {
        result = text ? JSON.parse(text) : {};
      } catch (err) {
        console.error("Failed to parse JSON:", err);
      }

      console.log("Result from saveDoctor:", result);
      console.log("Validation errors:", result.errors);
      if (res.ok) {
        const updatedProfileDoctor = await getData.get_profileDoctor(domain, tokenDoctor);
        setprofiledoctor(updatedProfileDoctor);
        setFormDataDoctor({
          firstName: updatedProfileDoctor.firstName || '',
          secondName: updatedProfileDoctor.secondName || '',
          lastName: updatedProfileDoctor.lastName || '',
          email: updatedProfileDoctor.email || '',
          phoneNumber: updatedProfileDoctor.phoneNumber || '',
          address: updatedProfileDoctor.address || '',
          age: updatedProfileDoctor.age || '',
          specialization: updatedProfileDoctor.specialization || '',
          education: updatedProfileDoctor.education || '',
          yearsOfExperience: updatedProfileDoctor.yearsOfExperience || '',
          bio: updatedProfileDoctor.bio || '',
          aboutMe: updatedProfileDoctor.aboutMe || '',
          description: updatedProfileDoctor.description || '',
          profilePictureFile: null,
          // imgUrl: updatedProfileDoctor.imgUrl || '',
        });
        setEditModeDoctor({
          firstName: false,
          secondName: false,
          lastName: false,
          email: false,
          phoneNumber: false,
          address: false,
          age: false,
          specialization: false,
          education: false,
          yearsOfExperience: false,
          bio: false,
          aboutMe: false,
          description: false,
        });

        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your doctor profile has been updated successfully.',
        });
        setDoctorHasChanges(true)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: result.message || 'An error occurred while updating the doctor profile.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Something went wrong.',
      });
    }
  };

  const handleSave = async () => {

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number',
        text: 'Phone number must contain 7 to 15 digits and can optionally start with +',
      });
      return;
    }

    const data = new FormData();
    data.append('userName', formData.userName);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('adderss', formData.adderss);
    if (formData.profilePictureFile) {
      data.append('profilePicture', formData.profilePictureFile);
    }

    console.log('FormData about to be sent:');
    for (let pair of data.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const res = await fetch(`${domain}/api/Account/Profile/Update`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();
      console.log("Result from save:", result);

      if (res.ok) {
        const updatedProfile = await getData.get_profile(domain, token);
        setprofile(updatedProfile);
        setFormData({
          userName: updatedProfile.userName,
          phoneNumber: updatedProfile.phoneNumber,
          adderss: updatedProfile.adderss || '',
          email: updatedProfile.email,
          profilePictureFile: null,
        });
        setEditMode({ userName: false, phoneNumber: false, adderss: false });

        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully.',
        });
        setHasChanges(false)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: result.message || 'An error occurred while updating the profile.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Something went wrong.',
      });
    }
  };


  return (

    <div className='col-12' id={styles.parent}>
      {
        token ? (<>
          <div id={styles.section1}>
            <div>
              <Link className='btn btn-white ms-3 mt-3' id={styles.btn} to={'/'}>
                <IoIosArrowRoundBack id={styles.iconarrow} />
              </Link>
            </div>
            <div className='container d-flex justify-content-center '>
              <div className='d-flex flex-column justify-content-center align-items-center gap-1  mt-5 ' id={styles.img}>
                <div className='position-relative d-inline-block'>
                  <div className=' d-flex justify-content-center align-items-center' style={{ width: "250px", height: "247px", borderRadius: "50%" }}>
                    <img
                      style={{ border: "1px solid black" }}
                      src={
                        Profile?.profilePicturePath
                          ? `${domain}${Profile.profilePicturePath}`
                          : '/default-profile.png'
                      }
                      alt="Profile"
                      width={250}
                      height={247}
                    />
                  </div>


                  <label
                    htmlFor="profileImageInput"
                    style={{
                      position: 'absolute',
                      bottom: 30,
                      left: 20,
                      backgroundColor: '#0008',
                      borderRadius: '50%',
                      padding: 8,
                      cursor: 'pointer',
                      color: 'white',
                      fontSize: 20,
                    }}
                    title="Change Profile Picture"
                    className='d-flex justify-content-center align-items-center'
                  >
                    <FaCamera />
                  </label>
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>
                
                {editMode.userName ? (
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <h3 className='d-flex align-items-center gap-3'>
                    {formData.userName}
                    <button
                      onClick={() =>
                        setEditMode(prev => ({ ...prev, userName: true }))
                      }
                      id={styles.edit}
                      title="Edit UserName"
                    >
                      <HiPencil />
                    </button>
                  </h3>
                )}


              </div>
            </div>
          </div>

          <div className='d-flex container flex-column justify-content-center align-items-center' id={styles.section2}>
            <div className='container d-flex flex-column justify-content-center align-items-center '>
              <div className='col-6 d-flex flex-column gap-4'>
                <h3>Information</h3>

                <div className='d-flex text-start justify-content-between align-items-center'>
                  <div className='d-flex align-items-center gap-3' id={styles.icon}>
                    <MdEmail />
                    <span>Email</span>
                  </div>

                  <div className='d-flex align-items-center gap-3'>
                    {formData.email}
                    {/* <button onClick={() => setEditMode(prev => ({ ...prev, email: true }))} id={styles.edit} title="Edit Email">
                    <HiPencil />
                  </button> */}
                  </div>

                </div>

                <div className='d-flex text-start justify-content-between align-items-center'>
                  <div className='d-flex align-items-center gap-3' id={styles.icon}>
                    <FiPhone />
                    <span>Phone</span>
                  </div>
                  {editMode.phoneNumber ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div className='d-flex align-items-center gap-3'>
                      {formData.phoneNumber}
                      <button onClick={() => setEditMode(prev => ({ ...prev, phoneNumber: true }))} id={styles.edit} title="Edit Phone Number">
                        <HiPencil />
                      </button>
                    </div>
                  )}
                </div>

                <div className='d-flex text-start justify-content-between align-items-center'>
                  <div className='d-flex align-items-center gap-3' id={styles.icon}>
                    <FaAddressCard />
                    <span>adderss</span>
                  </div>
                  {editMode.adderss ? (
                    <input
                      type="text"
                      name="adderss"
                      value={formData.adderss || ''} onChange={handleInputChange}
                    />
                  ) : (
                    <div className='d-flex align-items-center gap-3'>
                      {formData.adderss || 'No adderss'}
                      <button onClick={() => setEditMode(prev => ({ ...prev, adderss: true }))} id={styles.edit} title="Edit adderss">
                        <HiPencil />
                      </button>
                    </div>
                  )}


                </div>

                {/* {(editMode.userName || editMode.phoneNumber || editMode.adderss || formData.profilePictureFile) && (
                  <button
                    className='btn btn-primary mt-3'
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                )} */}
                {(editMode.userName || editMode.phoneNumber || editMode.adderss || formData.profilePictureFile) && hasChanges && (
                  <button className='btn btn-primary mt-3' onClick={handleSave}>
                    Save Changes
                  </button>
                )}

              </div>
            </div>
          </div>
        </>) : (
          <>
            <div id={styles.section1}>
              <div>
                <Link className='btn btn-white ms-3 mt-3' id={styles.btn} to={'/'}>
                  <IoIosArrowRoundBack id={styles.iconarrow} />
                </Link>
              </div>
              <div className='container d-flex justify-content-center '>
                <div className='d-flex flex-column justify-content-center align-items-center gap-1  mt-5 ' id={styles.img}>
                  <div className='position-relative d-inline-block'>
                    <div className=' d-flex justify-content-center align-items-center' style={{ width: "250px", height: "247px", borderRadius: "50%" }}>
                      <img
                        style={{ border: "1px solid black" }}
                        src={
                          Profiledoctor?.imgUrl
                            ? `${domain}${Profiledoctor.imgUrl}`
                            : '/default-profile.png'
                        }
                        alt="Profile"
                        width={250}
                        height={247}
                      />
                    </div>


                    <label
                      htmlFor="profileImageInput"
                      style={{
                        position: 'absolute',
                        bottom: 30,
                        left: 20,
                        backgroundColor: '#0008',
                        borderRadius: '50%',
                        padding: 8,
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: 20,
                      }}
                      title="Change Profile Picture"
                      className='d-flex justify-content-center align-items-center'
                    >
                      <FaCamera />
                    </label>
                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChangeDoctor}
                    />
                  </div>

                  {editModeDoctor.firstName ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formDataDoctor.firstName}
                      onChange={handleInputChangeDoctor}
                      onBlur={() => setEditModeDoctor(prev => ({ ...prev, firstName: false }))}
                    />
                  ) : (
                    <h3 className='d-flex gap-3'>
                      Dr: {formDataDoctor.firstName} {formDataDoctor.lastName}
                      <button onClick={() => setEditModeDoctor(prev => ({ ...prev, firstName: true }))} id={styles.edit} title="Edit UserName">
                        <HiPencil />
                      </button>
                    </h3>
                  )}

                </div>
              </div>
            </div>

            <div className='d-flex container flex-column justify-content-center align-items-center' id={styles.section2}>
              <div className='container d-flex flex-column justify-content-center align-items-center '>
                <div className='col-8 d-flex flex-column gap-4'>
                  <h3>Information</h3>

                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center gap-3' id={styles.icon}>
                      <MdEmail />
                      <span>Email</span>
                    </div>

                    <div className='d-flex align-items-center gap-3'>
                      {formDataDoctor.email}

                    </div>

                  </div>

                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center gap-3' id={styles.icon}>
                      <FiPhone />
                      <span>Phone</span>
                    </div>
                    {editModeDoctor.phoneNumber ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formDataDoctor.phoneNumber}
                        onChange={handleInputChangeDoctor}
                      />
                    ) : (
                      <div className='d-flex align-items-center gap-3'>
                        {formDataDoctor.phoneNumber}
                        <button onClick={() => setEditModeDoctor(prev => ({ ...prev, phoneNumber: true }))} id={styles.edit} title="Edit Phone Number">
                          <HiPencil />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center gap-3' id={styles.icon}>
                      <FaAddressCard />
                      <span>address</span>
                    </div>
                    {editModeDoctor.address ? (
                      <input
                        type="text"
                        name="address"
                        value={formDataDoctor.address || ''} onChange={handleInputChangeDoctor}
                      />
                    ) : (
                      <div className='d-flex align-items-center gap-3'>
                        {formDataDoctor.address || 'No adderss'}
                        <button onClick={() => setEditModeDoctor(prev => ({ ...prev, address: true }))} id={styles.edit} title="Edit adderss">
                          <HiPencil />
                        </button>
                      </div>
                    )}


                  </div>

                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center  gap-3' id={styles.icon}>
                      <FaAddressCard />
                      <span>AboutMe</span>
                    </div>
                    {editModeDoctor.aboutMe ? (
                      <input
                        type="text"
                        name="aboutMe"
                        value={formDataDoctor.aboutMe || ''} onChange={handleInputChangeDoctor}
                      />
                    ) : (
                      <div className='d-flex align-items-center gap-3'>
                        {formDataDoctor.aboutMe || 'No aboutMe'}
                        <button onClick={() => setEditModeDoctor(prev => ({ ...prev, aboutMe: true }))} id={styles.edit} title="Edit aboutMe">
                          <HiPencil />
                        </button>
                      </div>
                    )}

                  </div>
                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center  gap-3' id={styles.icon}>
                      <FaAddressCard />
                      <span>Age</span>
                    </div>
                    {editModeDoctor.age ? (
                      <input
                        type="text"
                        name="age"
                        value={formDataDoctor.age || ''} onChange={handleInputChangeDoctor}
                      />
                    ) : (
                      <div className='d-flex  gap-1  justify-content-end'>
                        <p className='col-10'>{formDataDoctor.age || 'No adderss'}</p>
                        <button onClick={() => setEditModeDoctor(prev => ({ ...prev, age: true }))} id={styles.edit} title="Edit adderss">
                          <HiPencil />
                        </button>
                      </div>
                    )}


                  </div>
                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center  gap-3' id={styles.icon}>
                      <FaAddressCard />
                      <span>bio</span>
                    </div>
                    {editModeDoctor.bio ? (
                      <input
                        type="text"
                        name="bio"
                        value={formDataDoctor.bio || ''} onChange={handleInputChangeDoctor}
                      />
                    ) : (
                      <div className='d-flex  gap-1  justify-content-end'>
                        <p className='col-9'>{formDataDoctor.bio || 'No adderss'}</p>
                        <button onClick={() => setEditModeDoctor(prev => ({ ...prev, bio: true }))} id={styles.edit} title="Edit adderss">
                          <HiPencil />
                        </button>
                      </div>
                    )}

                  </div>
                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center  gap-3' id={styles.icon}>
                      <FaAddressCard />
                      <span>description</span>
                    </div>
                    {editModeDoctor.description ? (
                      <input
                        type="text"
                        name="description"
                        value={formDataDoctor.description || ''} onChange={handleInputChangeDoctor}
                      />
                    ) : (
                      <div className='d-flex  gap-1  justify-content-end'>
                        <p className='col-9'>{formDataDoctor.description || 'No description'}</p>
                        <button onClick={() => setEditModeDoctor(prev => ({ ...prev, description: true }))} id={styles.edit} title="Edit description">
                          <HiPencil />
                        </button>
                      </div>
                    )}


                  </div>
                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center  gap-3' id={styles.icon}>
                      <FaAddressCard />
                      <span>education</span>
                    </div>
                    {editModeDoctor.education ? (
                      <input
                        type="text"
                        name="education"
                        value={formDataDoctor.education || ''} onChange={handleInputChangeDoctor}
                      />
                    ) : (
                      <div className='d-flex  gap-1  justify-content-end'>
                        <p className='col-9'>{formDataDoctor.education || 'No adderss'}</p>
                        <button onClick={() => setEditModeDoctor(prev => ({ ...prev, education: true }))} id={styles.edit} title="Edit adderss">
                          <HiPencil />
                        </button>
                      </div>
                    )}


                  </div>
                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center  gap-3' id={styles.icon}>
                      <FaAddressCard />
                      <span>specialization</span>
                    </div>
                    {editModeDoctor.specialization ? (
                      <input
                        type="text"
                        name="specialization"
                        value={formDataDoctor.specialization || ''} onChange={handleInputChangeDoctor}
                      />
                    ) : (
                      <div className='d-flex  gap-1  justify-content-end'>
                        <p className='col-9'>{formDataDoctor.specialization || 'No adderss'}</p>
                        <button onClick={() => setEditModeDoctor(prev => ({ ...prev, specialization: true }))} id={styles.edit} title="Edit adderss">
                          <HiPencil />
                        </button>
                      </div>
                    )}


                  </div>
                  <div className='d-flex text-start justify-content-between align-items-center'>
                    <div className='d-flex align-items-center  gap-3' id={styles.icon}>
                      <FaAddressCard />
                      <span>yearsOfExperience</span>
                    </div>
                    {editModeDoctor.yearsOfExperience ? (
                      <input
                        type="text"
                        name="yearsOfExperience"
                        value={formDataDoctor.yearsOfExperience || ''} onChange={handleInputChangeDoctor}
                      />
                    ) : (
                      <div className='d-flex  gap-1  justify-content-end'>
                        <p className='col-9'>{formDataDoctor.yearsOfExperience || 'No adderss'}</p>
                        <button onClick={() => setEditModeDoctor(prev => ({ ...prev, yearsOfExperience: true }))} id={styles.edit} title="Edit adderss">
                          <HiPencil />
                        </button>
                      </div>
                    )}


                  </div>
                  <div className='d-flex gap-3 py-3 mb-4'>
                    <Link className=' btn btn-primary' to={'/question'}>View All Question </Link>
                    <Link className='btn btn-primary' to={'/test'}>View All Test </Link>
                    <Link className='btn btn-primary' to={'/editeprofile/:id'}>Edite profile </Link>

                  </div>

                  {(editModeDoctor.firstName || editModeDoctor.phoneNumber || editModeDoctor.address || editModeDoctor.Profiledoctor || editModeDoctor.aboutMe || editModeDoctor.age || editModeDoctor.bio || editModeDoctor.description || editModeDoctor.education || editModeDoctor.specialization || editModeDoctor.yearsOfExperience) && doctorHasChanges && (
                    <button
                      className='btn btn-primary mt-3'
                      onClick={handleSaveDoctor}
                    >
                      Save Changes
                    </button>


                  )}

                </div>
              </div>
            </div>
          </>
        )
      }

    </div>
  )
}
