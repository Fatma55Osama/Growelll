// import axios from 'axios'
// import React from 'react'
// import Swal from 'sweetalert2'
// import "react-toastify/ReactToastify.css"
// export default function HandelRegist(formRefs ,event) {
//     event.preventDefault()
//     let first_name=formRefs.current[0].value
//     let last_name =formRefs.current[1].value
//     let address = formRefs.current[2].value
//     let email = formRefs.current[3].value
//     let pass = formRefs.current[4].value
//     const toast =()=>toast("Registration successful")
//     if(!first_name || !last_name || !address || !email || !pass ){
//       Swal.fire({
//         icon:"warning",
//         text:"All fields are required"
//       })
//     }
//   axios.post("",{
//     "fristName" : first_name,
//     "lastName":last_name,
//     "email":email,
//     "address":address,
//     "password":pass

//   }).then((res)=>{
//      toast()
//   })
 
// }
