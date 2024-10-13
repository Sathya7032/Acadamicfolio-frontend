import React, { useContext } from 'react'
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';
import { Divider } from '@mui/material';

const Footer = () => {
    const { theme } = useContext(ThemeContext);

    // Define colors based on the theme
    const footerBgColor = theme === 'light' ? '#f8f9fa' : '#343a40'; // Light background for light theme, dark for dark theme
    const textColor = theme === 'light' ? '#000' : '#fff'; // Text color based on the theme
    const iconColor = theme === 'light' ? '#fff' : '#fff'; // Icons color based on the theme

    const accentColor = theme === 'light' ? 'tomato' : '#ff6347';
    return (
        <div>
            <footer style={{ backgroundColor: footerBgColor }} className="text-center">
                <Divider sx={{ borderColor: accentColor }} />
                <div className="container p-4 pb-0">
                    <section className="mb-4">
                        <a className="btn btn-floating m-1" style={{ backgroundColor: '#3b5998', color: iconColor }} href="#!" role="button">
                            <FaFacebookF />
                        </a>
                        <a className="btn btn-floating m-1" style={{ backgroundColor: '#55acee', color: iconColor }} href="#!" role="button">
                            <FaTwitter />
                        </a>
                        <a className="btn btn-floating m-1" style={{ backgroundColor: '#dd4b39', color: iconColor }} href="#!" role="button">
                            <FaGoogle />
                        </a>
                        <a className="btn btn-floating m-1" style={{ backgroundColor: '#ac2bac', color: iconColor }} href="#!" role="button">
                            <FaInstagram />
                        </a>
                        <a className="btn btn-floating m-1" style={{ backgroundColor: '#0082ca', color: iconColor }} href="#!" role="button">
                            <FaLinkedinIn />
                        </a>
                        <a className="btn btn-floating m-1" style={{ backgroundColor: '#333333', color: iconColor }} href="#!" role="button">
                            <FaGithub />
                        </a>
                    </section>
                </div>
                <div className="text-center p-3" style={{ backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)', color: textColor }}>
                    © 2024 Copyright:
                    <a className="text-body" href="https://acadamicfolio.info/" style={{ color: textColor }}>
                        AcadamicFolio.com
                    </a>
                </div>
            </footer>

           
        </div >
    )
}

export default Footer