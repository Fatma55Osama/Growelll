import React, { useEffect, useState } from 'react'
import { getData } from '../Repo/getData'
import { useBooks, useData, usedomain, useEvents, usePagenation } from '../../Store'

export default function OnMainPage() {
    const { domain } = usedomain()
    const { setdataDoctor } = useData()
    const { page, pageSize, currentPage } = usePagenation()
    const {  setbooks } = useBooks()
    const {  setevents } = useEvents()



    useEffect(() => {
        getData.get_all_doctor(domain, page, pageSize, currentPage).then((res) => {
            console.log(res)
            setdataDoctor(res)
        })
    }, [domain, page, pageSize, currentPage])
    useEffect(() => {
        getData.get_store_books(domain).then((res) => {
            console.log("this is books", res)
            setbooks(res.data)
        })
    }, [])
    useEffect(() => {
        getData.get_store_event(domain).then((res) => {
            console.log("this is event", res)
            setevents(res)
        })
    }, [])
    return (
        null
    )
}
