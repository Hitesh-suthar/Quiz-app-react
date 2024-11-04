import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './../componants/header'
import Footer from './../componants/footer'

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout