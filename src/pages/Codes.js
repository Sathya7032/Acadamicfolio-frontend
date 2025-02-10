import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import CodeDisplay from "./CodeDisplay";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ClipLoader } from 'react-spinners'; // Import the spinner component
import { ThemeContext } from "../components/ThemeContext";
import Base from "../components/Base";

const Codes = () => {
    const baseUrl = "https://acadamicfolio.pythonanywhere.com";
    const { url } = useParams();
    const [topics, setTopics] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const { theme } = useContext(ThemeContext);
    const the = useTheme();
    const isMobile = useMediaQuery(the.breakpoints.down('sm'));

    useEffect(() => {
        setLoading(true); // Set loading to true when fetching starts
        axios
            .get(`${baseUrl}/languages/codes/${url}/`)
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => {
                setError("Error fetching tutorials");
                console.error("Error fetching tutorials:", error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when fetching ends
            });
    }, [url]);

    return (
       
            <div
                style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff', justifyContent: 'center', alignContent: 'center', maxHeight: '100vh', marginTop: '20px' }}
            >
                {error && (
                    <Typography color="error" style={{ margin: 20 }}>
                        {error}
                    </Typography>
                )}
                {loading ? ( // Show loading spinner while fetching
                    <div className="text-center" style={{ padding: 20 }}>
                        <ClipLoader color={theme === 'light' ? '#000' : '#fff'} loading={loading} size={50} />
                    </div>
                ) : topics && (
                    <>
                        <Paper
                            style={{
                                margin: isMobile ? 0 : 5,
                                backgroundColor: theme === 'light' ? 'darkslategrey' : '#2c2c2c',
                                padding: isMobile ? 5 : 5,
                            }}
                        >
                            <Typography
                                variant={isMobile ? "h6" : "h6"}
                                style={{
                                    textAlign: "center",
                                    color: 'white',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {topics.title}
                            </Typography>
                            <script
                                async
                                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
                                crossOrigin="anonymous"
                            ></script>
                            <ins
                                className="adsbygoogle"
                                style={{ display: "block", textAlign: "center" }}
                                data-ad-layout="in-article"
                                data-ad-format="fluid"
                                data-ad-client="ca-pub-6919135852803356"
                                data-ad-slot="9140112864"
                            ></ins>
                        </Paper>
                        <Paper
                            style={{
                                margin: isMobile ? 0 : 20,
                                backgroundColor: theme === 'light' ? 'snow' : '#2c2c2c',
                                padding: isMobile ? 10 : 20,
                            }}
                        >
                            <CodeDisplay code={topics.code} />
                        </Paper>
                        <Paper
                            style={{
                                margin: isMobile ? 0 : 20,
                                backgroundColor: theme === 'light' ? 'snow' : '#2c2c2c',
                                padding: isMobile ? 10 : 20,
                            }}
                        >
                            <Typography
                                style={{ fontSize: isMobile ? '14px' : 'inherit', color: theme === 'light' ? '#000000' : '#ffffff' }}
                                dangerouslySetInnerHTML={{ __html: topics.content }}
                            />
                        </Paper>
                    </>
                )}
            </div>
       
    );
};

export default Codes;
