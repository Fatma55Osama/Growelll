import axios from "axios"

export const show_singlebook =async(domain,id)=>{
    let final ={}
    await axios.get(`${domain}/api/HomeEvents/GetbookID`, {
      params: {
        bookId: id
      }
    }).then((res)=>{
        final = res.data
        console.log("Details ," , final)
    }).catch((err)=>{console.log(err)})
    return final
}