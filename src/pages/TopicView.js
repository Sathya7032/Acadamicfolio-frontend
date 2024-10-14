import React, { useContext, useEffect, useState } from 'react';
import Base from '../components/Base';
import '../styles/sidebar.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../components/ThemeContext';
import '../styles/link.css';
import image from '../styles/astronaut2.png';
import ClipLoader from 'react-spinners/ClipLoader';

const TopicView = () => {
    const { theme } = useContext(ThemeContext);
    const { url } = useParams(); // Assuming you're using React Router
    const [topics, setTopics] = useState([]); // Updated state name to reflect it's an array of topics
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // State to handle loading
    const baseUrl = 'https://acadamicfolio.pythonanywhere.com/';

    useEffect(() => {
        // Fetch the tutorial topic and related topics
        const fetchTopicData = async () => {
            try {
                const response = await axios.get(`${baseUrl}api/category/${url}/topics/`);
                setTopics(response.data); // Set the list of topics
                setLoading(false); // Stop loading once data is fetched
            } catch (err) {
                setError('Tutorial topics not found.');
                setLoading(false); // Stop loading in case of an error
            }
        };

        fetchTopicData();
    }, [url]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <Base>
            <div className="starry-background pt-5" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <h3 className='text-center fw-bold text-danger'>List of Topics under <span className='text-uppercase'>{url}</span></h3>

                            {loading ? (
                                <div className="text-center py-5">
                                    <ClipLoader color={theme === 'light' ? '#000' : '#fff'} loading={loading} size={50} />
                                </div>
                            ) : (
                                <ul className="list-group pb-5 pt-3" style={{ listStyle: 'none' }}>
                                    {topics.length > 0 ? (
                                        topics.map((top, index) => (
                                            <li key={top.id} className="list-group-item text-white" style={{margin:'10px',borderRadius:'20px', backgroundColor:'#778899'}}>
                                                <a href={`/${top.url}`} className="topic-link" style={{ textDecoration: 'none', color:'white',paddingLeft:'20px' }}>
                                                    {index+1}. {top.title}
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        <div>No topics found for this category.</div>
                                    )}
                                </ul>
                            )}
                        </div>
                        <div className='col-md-4'>
                            <img src={image} alt='' className='img-fluid' style={{ borderRadius: '20px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default TopicView;
