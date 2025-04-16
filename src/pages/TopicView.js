import React, { useContext, useEffect, useState } from 'react';
import Base from '../components/Base';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../components/ThemeContext';
import ClipLoader from 'react-spinners/ClipLoader';
import { FiBookOpen } from 'react-icons/fi';
import image from '../styles/astronaut2.png';

const TopicView = () => {
    const { theme } = useContext(ThemeContext);
    const { url } = useParams();
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = 'https://acadamicfolio.pythonanywhere.com/';

    useEffect(() => {
        const fetchTopicData = async () => {
            try {
                const response = await axios.get(`${baseUrl}api/category/${url}/topics/`);
                setTopics(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load tutorial topics. Please try again later.');
                setLoading(false);
            }
        };

        fetchTopicData();
    }, [url]);

    if (error) {
        return (
            <Base>
                <div className="container mt-5">
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <FiBookOpen className="me-2" />
                        {error}
                    </div>
                </div>
            </Base>
        );
    }

    return (
        <Base>
            <div className="starry-background pt-5" style={{ 
                backgroundColor: theme === 'light' ? '#f8f9fa' : '#121212',
                minHeight: '100vh'
            }}>
                <div className='container'>
                    <div className='row g-4'>
                        <div className='col-12'>
                            <div className="d-flex align-items-center mb-4">
                                <div className="flex-grow-1">
                                    <h2 className='h1 fw-bold mb-0' style={{
                                        color: theme === 'light' ? '#2c3e50' : '#ecf0f1',
                                        letterSpacing: '-0.05rem'
                                    }}>
                                        {url.replace(/-/g, ' ').toUpperCase()}
                                    </h2>
                                    <p className="lead text-muted mb-0">
                                        {topics.length} topics available
                                    </p>
                                </div>
                                <div className="d-none d-md-block">
                                    <FiBookOpen size={48} color={theme === 'light' ? '#2c3e50' : '#ecf0f1'} />
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-8 order-2 order-lg-1'>
                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center py-5">
                                    <ClipLoader 
                                        color={theme === 'light' ? '#2c3e50' : '#ecf0f1'} 
                                        loading={loading} 
                                        size={50} 
                                    />
                                </div>
                            ) : (
                                <div className="pe-lg-4">
                                    {topics.length > 0 ? (
                                        <div className="row g-3">
                                            {topics.map((top, index) => (
                                                <div key={top.id} className="col-12">
                                                    <a 
                                                        href={`/${top.url}`} 
                                                        className="d-block p-4 rounded-3 text-decoration-none transition-all"
                                                        style={{
                                                            backgroundColor: theme === 'light' ? '#ffffff' : '#2c2c2c',
                                                            color: theme === 'light' ? '#2c3e50' : '#ecf0f1',
                                                            boxShadow: theme === 'light' 
                                                                ? '0 2px 8px rgba(0,0,0,0.1)' 
                                                                : '0 2px 8px rgba(255,255,255,0.1)',
                                                            transform: 'translateY(0)',
                                                            borderLeft: `4px solid ${theme === 'light' ? '#3498db' : '#2980b9'}`
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <div className="badge bg-primary me-3" style={{
                                                                backgroundColor: theme === 'light' ? '#3498db' : '#2980b9',
                                                                width: '40px',
                                                                height: '40px',
                                                                borderRadius: '8px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}>
                                                                <span className="text-white">{index + 1}</span>
                                                            </div>
                                                            <h5 className="mb-0 flex-grow-1">{top.title}</h5>
                                                            <span className="text-muted ms-3 d-none d-md-block">
                                                                Explore →
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="alert alert-info mt-4">
                                            No topics found for this category.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className='col-lg-4 order-1 order-lg-2'>
                            <div className="sticky-top" style={{ top: '100px' }}>
                                <img 
                                    src={image} 
                                    alt="Learning illustration" 
                                    className="img-fluid rounded-3 shadow-lg" 
                                    style={{ 
                                        maxWidth: '400px',
                                        margin: '0 auto',
                                        display: 'block'
                                    }} 
                                />
                                <div className="mt-4 text-center text-muted">
                                    <small>Explore comprehensive resources and tutorials</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default TopicView;