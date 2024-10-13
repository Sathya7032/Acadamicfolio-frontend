import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Base = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '80px' }}> {/* Adjust based on your navbar height */}
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Base
