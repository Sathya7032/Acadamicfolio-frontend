import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

import image from '../styles/astronaut2.png';
import { ClipLoader } from 'react-spinners'; // Import the spinner component
import { ThemeContext } from "../components/ThemeContext";
import Base from "../components/Base";


const CodeTopics = () => {
    const baseUrl = "https://acadamicfolio.pythonanywhere.com";
    const { url } = useParams();
    const [codes, setCodes] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setLoading(true); // Set loading to true when fetching starts
        axios
            .get(baseUrl + `/languages/${url}/codes/`)
            .then((response) => {
                setCodes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching codes:", error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when fetching ends
            });
    }, [url]);

    return (
        <Base>
            <div style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000000' : '#ffffff', minHeight: '100vh' }}>
                <Typography
                    variant="h4"
                    style={{ textAlign: "center", paddingTop: 20, fontFamily: 'cursive' }}
                >
                    Pick your Program
                </Typography>

                <div className="container p-5">
                    <div className="row">
                        <div className="col-md-8">
                            {loading ? ( // Show loading spinner while fetching
                                <div className="text-center">
                                    <ClipLoader color={theme === 'light' ? '#000' : '#fff'} loading={loading} size={50} />
                                </div>
                            ) : (
                                codes.length > 0 ? (
                                    <ul className='list-group'>
                                        {codes.map((code, index) => (
                                            <div key={code.id}>
                                                <a href={`/languages/codes/${code.url}/`}>
                                                    <li className='list-group-item' style={{ backgroundColor: theme === 'light' ? '#f8f9fa' : '#2c2c2c' }}>
                                                        <span style={{ fontSize: 15, color: theme === 'light' ? 'darkslategrey' : 'lightgrey', fontWeight: 'bolder', padding: 5 }}>
                                                            {index + 1}. {code.title}
                                                        </span>
                                                    </li>
                                                </a>
                                            </div>
                                        ))}
                                    </ul>
                                ) : (
                                    <Typography variant="h6" style={{ textAlign: "center", color: theme === 'light' ? '#000000' : '#ffffff' }}>
                                        No codes yet
                                    </Typography>
                                )
                            )}
                        </div>
                        <div className="col-md-4">
                            <img src={image} alt='' className='img-fluid' style={{ borderRadius: '20px' }} />
                        </div>
                    </div>

                </div>
            </div>
        </Base>
    );
};

export default CodeTopics;