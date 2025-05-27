import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaAddressCard, FaCamera } from "react-icons/fa";
import { getData } from '../../data/Repo/getData';
import { usedomain, useProfile } from '../../Store';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { HiPencil } from "react-icons/hi2";
import Swal from 'sweetalert2';

export default function Profile() {
  const { domain } = usedomain()
  const { Profile, setprofile } = useProfile()
  const [editMode, setEditMode] = useState({ userName: false, email: false, phoneNumber: false, adderss: false })
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    profilePictureFile: null,
    adderss: ''
  })

  let token = localStorage.getItem('token') || sessionStorage.getItem('token')

  useEffect(() => {
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
  }, [domain, token])


  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  console.log('   {formData.adderss}', formData.adderss)

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

    }
  }

  
 const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  return phoneRegex.test(phone);
};

const handleSave = async () => {
  // ✅ تحقق من رقم الهاتف قبل إرسال البيانات
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
      <div id={styles.section1}>
        <div>
          <Link className='btn btn-white ms-3 mt-3' id={styles.btn} to={'/'}>
            <IoIosArrowRoundBack id={styles.iconarrow} />
          </Link>
        </div>
        <div className='container d-flex justify-content-center '>
          <div className='d-flex flex-column justify-content-center align-items-center gap-1  mt-5 ' id={styles.img}>
            <div className='position-relative d-inline-block'>

              <img
                src={
                  Profile?.profilePicturePath
                    ? `${domain}${Profile.profilePicturePath}`
                    : '/default-profile.png'
                }
                alt="Profile"
                width={250}
                height={247}
              />
              <label
                htmlFor="profileImageInput"
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
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
                onBlur={() => setEditMode(prev => ({ ...prev, userName: false }))}
              />
            ) : (
              <h3 className='d-flex align-items-center gap-3'>
                {formData.userName}
                <button onClick={() => setEditMode(prev => ({ ...prev, userName: true }))} id={styles.edit} title="Edit UserName">
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
                  onBlur={() => setEditMode(prev => ({ ...prev, phoneNumber: false }))}
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
                  onBlur={() => setEditMode(prev => ({ ...prev, adderss: false }))}
                />
              ) : (
                <div className='d-flex align-items-center gap-3'>
                  {formData.adderss || 'No adderss'}
                  <button onClick={() => setEditMode(prev => ({ ...prev, adderss: true }))} id={styles.edit} title="Edit adderss">
                    <HiPencil />
                  </button>
                </div>
              )}

              {/* <div className='d-flex align-items-center gap-3'>
                <div className='d-flex align-items-center gap-3'>
                  Cario
                  <button onClick={() => setEditMode(prev => ({ ...prev, phoneNumber: true }))} id={styles.edit} title="Edit Phone Number">
                    <HiPencil />
                  </button>
                </div>
              </div> */}
            </div>

            {/* زر الحفظ */}
            {(editMode.userName || editMode.phoneNumber || editMode.adderss || formData.profilePictureFile) && (
              <button
                className='btn btn-primary mt-3'
                onClick={handleSave}
              >
                Save Changes
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
