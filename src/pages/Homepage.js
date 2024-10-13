import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import '../styles/background.css'; // Import the CSS file for custom styling
import { Divider } from '@mui/material';
import Base from '../components/Base';
import axios from 'axios';
import image1 from '../styles/renamed.png'
import video from '../styles/intro.mp4'

const Homepage = () => {
    const { theme } = useContext(ThemeContext);

    // Set the accent color based on the theme context
    const accentColor = theme === 'light' ? 'tomato' : '#ff6347';

    const baseUrl = 'https://acadamicfolio.pythonanywhere.com/';

    const [tutorials, setTutorials] = useState([]);

    // Fetch data on component mount
    useEffect(() => {
        fetchTodos();
    }, []);

    // Function to fetch tutorials from the API
    const fetchTodos = async () => {
        await axios
            .get(baseUrl + 'api/categories/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                console.log(res.data);
                setTutorials(res.data);
            });
    };


     // Function to get alternating background colors
     const getBackgroundColor = (index) => {
        const colors = theme === 'light' ? ['#f0f0f0', '#e0e0e0', '#d0d0d0'] : ['#36454F', '#2f4f4f', '#2e2e2e'];
        return colors[index % colors.length]; // Cycle through colors based on the index
    };
  return (
    <Base>
    <div className="starry-background" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff' }}>
            <div className='container pb-3' style={{ fontFamily: 'unset' }}>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='header'>
                            <h1 className='text-center fw-bold pt-5' style={{ color: accentColor }}>Learn With Ease</h1>
                            <h3 className='text-center'>Unlock Your Potential with Our Educational Platform</h3>
                        </div>
                        <div className='content'>
                            <p className='text-center fw-bold'>
                                Dive into the world of technology with our comprehensive Java courses and resources. From beginner fundamentals to advanced concepts, we provide interactive tutorials, hands-on projects, and expert guidance to accelerate your learning journey. Empower yourself with practical skills and stay ahead in the ever-evolving tech landscape.
                            </p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <img src={image1} alt='' className='img-fluid image-slide-in' style={{ borderRadius: '20px' }} />
                    </div>
                </div>
            </div>

            <Divider sx={{ borderColor: accentColor }} />

            {/* Tutorials Section */}
            <div style={{ padding: '20px', borderRadius: '10px' }}>
                {tutorials.map((tutorial, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: getBackgroundColor(index),
                            borderRadius: '10px',
                            margin: '10px 0',
                            padding: '20px',
                            boxShadow: theme === 'light' ? '0px 4px 8px rgba(0, 0, 0, 0.1)' : '0px 4px 8px rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <div className='row'>
                            <div className='col-md-6'>
                                <h1 className='text-center pt-3' style={{ color: theme === 'light' ? '#333' : '#ddd' }}>{tutorial.name}</h1>
                                <p className='text-center p-2' style={{ color: theme === 'light' ? '#555' : '#ccc' }}>{tutorial.content}</p>
                                <center>
                                    <div className='d-grid gap-2 col-12 col-md-4 col-lg-4 d-grid mx-auto'>
                                        <a href={`/topics/${tutorial.url}`} className='btn btn-secondary' style={{ backgroundColor: theme === 'light' ? 'tomato' : 'tomato', color: '#fff' }}>
                                            {tutorial.name} Code snippets
                                        </a>
                                        <a href={`/tutorials/${tutorial.url}`} className='btn btn-success' style={{ backgroundColor: theme === 'light' ? 'green' : 'green', color: '#fff' }}>
                                            {tutorial.name} Tutorials
                                        </a>
                                    </div>
                                </center>
                            </div>
                            <div className='col-md-6' style={{ display: 'flex', justifyContent: 'center' }}>
                                <img
                                    className='img-fluid'
                                    src={`https://acadamicfolio.pythonanywhere.com${tutorial.image}`}
                                    alt=''
                                    style={{
                                        padding: '10px',
                                        borderRadius: '20px',
                                        width: '70%',
                                        justifySelf: 'center',
                                        boxShadow: theme === 'light' ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : '0px 4px 8px rgba(255, 255, 255, 0.1)',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='container pb-3'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2 className="text-center fw-bold p-2" style={{ fontFamily: 'serif' }}>Try our Html Editor</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                            <video controls className="responsive-video">
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className='d-grid gap-2 col-12 col-md-4 col-lg-4 d-grid mx-auto'>
                            <a href={`/editor`} className='btn btn-success' style={{ backgroundColor: theme === 'light' ? 'tomato' : 'grey', color: '#fff' }}>
                                Try Html Editor
                            </a>
                        </div>

                        <Divider sx={{ borderColor: accentColor, margin: '20px 0' }} />

                        <div className="p-3">
                            <h2 className="text-center fw-bold p-2" style={{ fontFamily: 'serif' }}>Try our Language Editor</h2>
                            <iframe
                                frameBorder="0"
                                height="450px"
                                src="https://onecompiler.com/embed/"
                                width="100%"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    </Base>
  )
}

export default Homepage
