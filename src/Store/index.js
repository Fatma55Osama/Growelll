import { atom } from "recoil";
import imgplay from "../assets/Image play.png";

import Skaak from "../assets/Image Wrapper.png";
import doctorsimg from "../assets/Link → doctor_11.png.png";
import book from "../assets/Rectangle 113.png";
import { create } from "zustand";
import girle from "../assets/Imagegrile.png";
import doctor from "../assets/Link → doctor_4.png.png";

export const $active = atom({
  key: "$active",
  default: "Home",
});
export const $eventsState = atom({
  key: "$eventsState",
  default: [
    {
      id: 1,
      img: Skaak,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      img: imgplay,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      img: Skaak,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      img: Skaak,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 5,
      img: imgplay,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 6,
      img: Skaak,
      name: "Full name",
      descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
});

// export const $booksState = atom({
//   key: "$booksState",
//   default: [
//     {
//       id: 1,
//       img: book,
//       name: "Full name",
//       descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     {
//       id: 2,
//       img: book,
//       name: "Full name",
//       descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     {
//       id: 3,
//       img: book,
//       name: "Full name",
//       descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     {
//       id: 4,
//       img: book,
//       name: "Full name",
//       descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     {
//       id: 5,
//       img: book,
//       name: "Full name",
//       descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     {
//       id: 6,
//       img: book,
//       name: "Full name",
//       descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//   ],
// });

export const useData = create((set) => ({
  dataDoctor: [
    // {
    //   id: 1,
    //   img: doctorsimg,
    //   name: "Dr: Esraa Nagy",
    //   descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //   experice:"Board-certified Pediatrician",
    //   information:"With experience in managing complex medical conditions in children"
    // },
    // {
    //   id: 2,
    //   img: doctorsimg,
    //   name: "Dr: Esraa Nagy",
    //   descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //    experice:"Board-certified Pediatrician",
    //   information:"With experience in managing complex medical conditions in children"
    // },
    // {
    //   id: 3,
    //   img: doctorsimg,
    //   name: "Dr: Esraa Nagy",
    //   descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //    experice:"Board-certified Pediatrician",
    //   information:"With experience in managing complex medical conditions in children"
    // },
    // {
    //   id: 4,
    //   img: girle,
    //   name: "Dr: Esraa Nagy",
    //   descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //    experice:"Board-certified Pediatrician",
    //   information:"With experience in managing complex medical conditions in children"
    // },
    // {
    //   id: 5,
    //   img: doctor,
    //   name: "Dr: Esraa Nagy",
    //   descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //    experice:"Board-certified Pediatrician",
    //   information:"With experience in managing complex medical conditions in children"
    // },
    // {
    //   id: 6,
    //   img: doctor,
    //   name: "Dr: Esraa Nagy",
    //   descript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //    experice:"Board-certified Pediatrician",
    //   information:"With experience in managing complex medical conditions in children"
    // },
  ],
  dataEvent: [],
  detailsdoctor: {},
  setdailsdoctor: (singe) => set(() => ({ detailsdoctor: singe })),
  setdataDoctor: (doctor) => set(() => ({ dataDoctor: doctor })),
  page: 1,
  setPage: (val) => set({ page: val }),

  pageSize: 10,
  setPageSize: (val) => set({ pageSize: val }),
}));
export const usePagenation = create((set) => ({
 
  page: 1,
  setPage: (val) => set({ page: val }),
  currentPage:1,
  pageSize: 10,
  setPageSize: (val) => set({ pageSize: val }),
}));

export const usedomain = create((set) => ({
  domain: "https://localhost:7071",
}));
export const useQuestion = create((set)=>({
  question:{},
  setquestion:(val)=>set({question:val})
}))
export const useBooks = create((set)=>({
  books:[],
  setbooks:(val)=>set({books:val})
}))
export const usedetailsbooks = create((set)=>({
  book:{},
  setbooks:(val)=>set({book:val})
}))
export const useEvents = create((set)=>({
  events:[],
  setevents:(val)=>set({events:val})
}))
export const usedetailsevent= create((set)=>({
  event:{},
  setdetailsevent:(val)=>set({event:val})
}))
export const useProfile = create((set)=>({
  Profile:[],
  setprofile:(val)=>set({Profile:val})
}))
export const useModale = create((set) => ({
  modalindex: false,
  openModal: () => set(() => ({ modalindex: true })),
  closeModal: () => set(() => ({ modalindex: false })),
}));

export const usePlay= create((set) => ({
  isplaying: false,
  setIsplaying: () => set(() => ({ isplaying: true })),
}));
export const useModalevedio = create((set) => ({
  modalindex: false,
  openModal: () => set(() => ({ modalindex: true })),
  closeModal: () => set(() => ({ modalindex: false })),
}));
export const useReport = create((set)=>({
  report:[],
  setreport:(val)=>set({report:val})
}))
export const useProfileDoctor = create((set)=>({
  Profiledoctor:[],
  setprofiledoctor:(val)=>set({Profiledoctor:val})
}))
export const useDoctorQuestion = create((set)=>({
  Doctorquestion:[],
  setDoctorquestion:(val)=>set({Doctorquestion:val})
}))
export const useDoctorTest = create((set)=>({
  Doctortest:[],
  setDoctortest:(val)=>set({Doctortest:val})
}))
export const useDoctorReport = create((set)=>({
  doctorreport:[],
  setdoctorreport:(val)=>set({doctorreport:val})
}))
export const useSearch = create((set)=>({
  Searchs:[],
  setsearch:(val)=>set({Searchs:val})
}))
export const usecontactus = create((set)=>({
  contact:[],
  setcontact:(val)=>set({contact:val})
}))
export const usebookdoctor = create((set)=>({
  bookdoctor:[],
  setbookdoctor:(val)=>set({bookdoctor:val})
}))
export const usevediodoctor = create((set)=>({
  videodoctor:[],
  setvideodoctor:(val)=>set({videodoctor:val})
}))
// export const useDoctorsingleTest = create((set)=>({
//   Doctorsingletest:{},
//   setDoctorsingletest:(val)=>set({Doctorsingletest:val})
// }))
export const useCategory = create((set)=>({
  category:[],
  setcategory:(val)=>set({category:val})
}))
export const usebookingAppoiement = create((set)=>({
  booking:[],
  setbooking:(val)=>set({booking:val})
}))
// export const usesingleCategory = create((set)=>({
//   singlecategory:{},
//   setsinglecategory:(val)=>set({singlecategory:val})
// }))

