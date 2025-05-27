import { show_single_question } from "../API/show_single_question"
import { show_singledoctor } from "../API/show_singledoctor"
import {show_singlebook} from "../API/show_singlebook";
import { store_books } from "../API/store_books"
import { store_doctor } from "../API/store_doctor"
import { store_event } from "../API/store_event";
import { show_singlevent } from "../API/show_singlevent";
import { profile } from "../API/profile";
import { rebort_show } from "../API/rebort_show";

export const getData = {
    get_all_doctor: async (domain, page = 1, pageSize = 10) => {
        return await store_doctor(domain, page, pageSize)
    },
    get_single_dotor: async (domain, id) => {
        return await show_singledoctor(domain, id)
    },
    get_single_question: async (domain, id, token) => {
        return await show_single_question(domain, id, token)
    },
    get_store_books: async (domain) => {
        return await store_books(domain)
    },
     get_store_event : async (domain) => {
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
} 
