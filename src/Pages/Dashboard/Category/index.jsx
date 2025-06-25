import React, { useEffect } from 'react'
import styles from './index.module.css'
import { useCategory, usedomain } from '../../../Store'
import { getData } from '../../../data/Repo/getData'
import { Link } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2'
import { DeleteCategory } from '../../../data/API/DeleteCategory'
import { BiSolidCategory } from "react-icons/bi";
export default function Category() {
  const { category, setcategory } = useCategory()
  const { domain } = usedomain()
  let tokenDoctor = localStorage.getItem("tokenDoctor") || sessionStorage.getItem("tokenDoctor");
  useEffect(() => {
    if (tokenDoctor) {
      getData.get_store_Category(domain, tokenDoctor).then((res) => {
        setcategory(res)
        console.log('category', res)
      })
        .catch(err => {
          console.log(err);
        });
    } else {
      navigate("/error");
    }
  }, [])
  // const fetchcategory = () => {
  //     if (tokenDoctor) {
  //         getData.get_store_Category(domain, tokenDoctor).then((res) => {
  //             setcategory(res)
  //             console.log('category', res)
  //         })
  //             .catch(err => {
  //                 console.log(err);
  //             });
  //     } else {
  //         navigate("/error");
  //     }
  // }
  const fetchCategory = () => {
    getData.get_store_Category(domain, tokenDoctor).then((res) => {
      setcategory(res)
      console.log('category', res)
    })
      .catch(err => {
        console.log(err);
      });
  };
  const handeldeleteCategory = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This Category will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteCategory(domain, tokenDoctor, id).then(res => {
          Swal.fire('Deleted!', 'The Category has been deleted.', 'success');
          fetchCategory()
        })
          .catch((error) => {
            console.error(error);
            Swal.fire('Error!', 'Something went wrong while deleting the Category.', 'error');
          });
      }
    })
  }

  return (
    <div className={styles.category}>
      <div className="container py-5" id={styles.spacediv1}>
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className={styles.pageTitle}><BiSolidCategory /> Categories</h2>
          <p className="text-muted">Browse and manage your test categories</p>
        </div>

        {/* Doctor Info */}
        {category.length > 0 ? (
          <div className={styles.doctorCard + " shadow-sm d-flex  justify-content-between "}>
            <div className='d-flex align-items-center gap-3'>
              <img
                src={`${domain}/${category[0]?.doctor?.imageUrl}`}
                alt="Doctor"
                className={styles.doctorImg}
              />
              <div className={styles.doctorInfo}>
                <h4>Dr. {category[0]?.doctor?.doctorName}</h4>
                <p>{category[0]?.doctor?.bio}</p>
              </div>
            </div>
            <div className="d-flex   justify-content-end align-items-start mt-4 mb-3">
              <Link to="/createcategory" className={styles.addBtn}>
                <IoIosAddCircleOutline /> Add New Category
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.doctorCard + " shadow-sm d-flex  justify-content-between "}>
            <div className='d-flex align-items-center gap-3'>
              <img
                src={`${domain}/${category?.doctor?.imgUrl}`}
                alt="Doctor"
                className={styles.doctorImg}
              />
              <div className={styles.doctorInfo}>
                <h4>Dr. {category?.doctor?.firstName} {category?.doctor?.lastName} </h4>
                <p>{category?.doctor?.bio}</p>
              </div>
            </div>
            <div className="d-flex   justify-content-end align-items-start mt-4 mb-3">
              <Link to="/createcategory" className={styles.addBtn}>
                <IoIosAddCircleOutline /> Add New Category
              </Link>
            </div>
          </div>
        )}

        {/* Add Category Button */}
        {/* <div className="d-flex justify-content-end mt-4 mb-3">
          <Link to="/createcategory" className={styles.addBtn}>
            <IoIosAddCircleOutline /> Add New Category
          </Link>
        </div> */}

        {/* Category Cards */}
        <div className="row g-4">
          {Array.isArray(category) && category.length > 0 ? (
            category.map((el, index) => (
              <div key={el.categoryID} className="col-md-6">
                <div className={styles.categoryCard}>
                  <h6 className="fw-bold text-primary">Category {index + 1}</h6>
                  <h5>Name: {el.name}</h5>
                  <p className="mb-1">Description: {el.description}</p>
                  <p>Category ID: {el.categoryID}</p>
                  <div className="d-flex gap-3 mt-3">
                    <Link to={`/editecategory/${el.categoryID}`} className={styles.editBtn}>
                      <FiEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handeldeleteCategory(el.categoryID)}
                      className={styles.deleteBtn}
                    >
                      <RiDeleteBin6Line /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-5 text-secondary">
              <h5>{category?.message || "No category found."}</h5>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}
