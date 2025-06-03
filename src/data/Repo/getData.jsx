import { show_single_question } from "../API/show_single_question"
import { show_singledoctor } from "../API/show_singledoctor"
import { show_singlebook } from "../API/show_singlebook";
import { store_books } from "../API/store_books"
import { store_doctor } from "../API/store_doctor"
import { store_event } from "../API/store_event";
import { show_singlevent } from "../API/show_singlevent";
import { profile } from "../API/profile";
import { rebort_show } from "../API/rebort_show";
import { store_question } from "../API/store_question";
import { Doctorprofile } from "../API/Doctorprofile";
import { store_test } from "../API/store_test";
import { DoctorReport } from "../API/DoctorReport";
import { store_contectus } from "../API/store_contectus";

export const getData = {
    get_all_doctor: async (domain, page = 1, pageSize = 10) => {
        return await store_doctor(domain, page, pageSize)
    },
    get_single_dotor: async (domain, id) => {
        return await show_singledoctor(domain, id)
    },
    get_single_question: async (domain,  token,id) => {
        return await show_single_question(domain, token,id)
    },
    get_store_books: async (domain) => {
        return await store_books(domain)
    },
    get_store_event: async (domain) => {
        return await store_event(domain)
    },
    get_profile: async (domain, token) => {
        return await profile(domain, token)
    },
    get_single_dotor: async (domain, id) => {
        return await show_singledoctor(domain, id)
    },
    get_show_singlebook: async (domain, id) => {
        return await show_singlebook(domain, id)
    },
    get_show_singlevent: async (domain, id) => {
        return await show_singlevent(domain, id)
    },
    get_rebort_show: async (token) => {
        return await rebort_show(token)
    }, 
    get_profileDoctor: async (domain, tokenDoctor) => {
        return await Doctorprofile(domain, tokenDoctor)
    },
     get_store_question: async ( tokenDoctor) => {
        return await store_question( tokenDoctor)
    },
    get_store_test: async ( tokenDoctor,domain) => {
        return await store_test( tokenDoctor,domain)
    },
    get_DoctorReport: async ( tokenDoctor) => {
        return await DoctorReport( tokenDoctor)
    },
      get_store_contectus: async ( tokenDoctor,domain) => {
        return await store_contectus( tokenDoctor,domain)
    },
    
} 
