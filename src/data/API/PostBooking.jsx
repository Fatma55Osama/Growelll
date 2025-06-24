import axios from "axios"

export const PostBooking = async (values, token, domain, id) => {
       const [testnamevalue,scorevalue,appointmentvalue,isconfirmedvalue,notevalue]=values
    await axios.post(`${domain}/api/DoctorHome/${id}/book`,{
        
            'testName': testnamevalue,
            'score': scorevalue,
            'appointmentDate': appointmentvalue,
            'isConfirmed': isconfirmedvalue,
            'notes': notevalue
    },{
       
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        console.log("PostBooking", res)
        
    }).catch((err) => {
        console.log("PostBooking", err)
    })

}