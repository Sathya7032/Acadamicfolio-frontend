import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Base from '../components/Base';
import { Editor } from '@monaco-editor/react';
import '../styles/video.css';
import DOMPurify from 'dompurify';
import { Divider } from '@mui/material';
import { FaLongArrowAltRight } from "react-icons/fa";
import ClipLoader from 'react-spinners/ClipLoader'; 

const Topic = () => {
    const { theme } = useContext(ThemeContext);
    const { url } = useParams();
    const [topic, setTopic] = useState(null);
    const [contentBlocks, setContentBlocks] = useState([]);
    const [relatedTopics, setRelatedTopics] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizResults, setQuizResults] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchTopicData = async () => {
            try {
                const response = await axios.get(`https://acadamicfolio.pythonanywhere.com/api/tutorials/${url}/`);
                setTopic(response.data.topic);
                setContentBlocks(response.data.content_blocks);
                setRelatedTopics(response.data.related_topics);
            } catch (err) {
                setError('Tutorial topic not found.');
            }finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchTopicData();
    }, [url]);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(`https://acadamicfolio.pythonanywhere.com/quiz/${url}/`);
                setQuiz(response.data);
            } catch (err) {
                console.error('Error fetching quiz:', err);
            }
        };

        fetchQuizData();
    }, [url]);

   

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying code: ', err);
            });
    };

    const handleAnswerChange = (index, value) => {
        setSelectedAnswers((prev) => ({ ...prev, [index]: value }));
    };

    const handleQuizSubmit = () => {
        if (!quiz) return;

        const results = quiz.questions.map((question, index) => {
            const selectedAnswer = selectedAnswers[index]; // Get the selected answer ID
            const correctOption = question.options.find(option => option.is_correct); // Find the correct option
            const isCorrect = selectedAnswer === correctOption.id; // Compare selected answer with correct option's ID

            return {
                question: question.question_text,
                selectedAnswer: selectedAnswer ? question.options.find(option => option.id === selectedAnswer)?.text : 'Not answered',
                correctAnswer: correctOption.text,
                is_correct: isCorrect,
            };
        });
        setQuizResults(results);
    };

    const renderQuiz = () => {
        if (!quiz) return null;

        return (
            <div className="mt-4 p-5 m-2" style={{ backgroundColor: theme === 'light' ? '#6495ed' : '#6495ed', color: theme === 'light' ? '#000' : '#fff', borderRadius: '30px' }}>
                <h3 className="fw-bold">Quiz: {quiz.title}</h3>
                {quiz.questions.map((question, index) => (
                    <div key={index} className="my-3">
                        <p className="fw-bold">{question.question_text}</p>
                        <ul className="list-group">
                            {question.options.map((option) => (
                                <li key={option.id} className="list-group-item" style={{ backgroundColor: '#008b8b', marginBottom: '5px', borderRadius: '5px' }}>
                                    <input
                                        type="radio"
                                        name={`question${index}`}
                                        id={option.id}
                                        value={option.id}
                                        className="custom-radio"
                                        onChange={() => handleAnswerChange(index, option.id)}
                                    />
                                    <label htmlFor={option.id} style={{ marginLeft: '8px', fontWeight: 'bolder' }}>
                                        {option.text}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <button className="btn btn-primary mt-3" onClick={handleQuizSubmit}>Submit Quiz</button>
                {quizResults.length > 0 && (
                    <h4 className="mt-3 text-danger">Results:</h4>
                )}
                {quizResults.map((result, index) => (
                    <div key={index} className="mt-2">
                        <p className='text-warning fw-bold'><span style={{ color: 'white' }}>Question :- </span>{result.question}</p>
                        <p className='fw-bold'><span style={{ color: 'white' }}>Selected Answer:- </span>{result.selectedAnswer}</p>
                        <p className='fw-bold'><span style={{ color: 'white' }}>Correct Answer:- </span>{result.correctAnswer}</p>
                        <h5 className='fw-bold' style={{ color: result.is_correct ? 'green' : 'red' }}>
                            {result.is_correct ? 'Correct!' : 'Wrong!'}
                        </h5>
                    </div>
                ))}
            </div>
        );
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div>
            <Base>
                <div className="pt-3 mt-0" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#c0c0c0', color: theme === 'light' ? '#000' : '#fff' }}>
                    <div className="row">
                        <div className="col-md-2" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e', color: theme === 'light' ? '#000' : '#fff' }}>
                            <h5 className='pt-3 pb-3 text-center fw-bold mt-4'>Related Topics</h5>
                            <ul className="list-group" style={{ listStyle: 'none' }}>
                            {loading ? ( // Show ClipLoader while loading
                                <div className="text-center my-5">
                                    <ClipLoader color={theme === 'light' ? '#000000' : '#ffffff'} loading={loading} size={20} />
                                </div>
                            ) : relatedTopics.length > 0 ? (
                                    relatedTopics.map((related) => (
                                        <li key={related.id} className="list-group-item" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e', color: theme === 'light' ? '#000' : '#fff',width:'103%',marginBottom:'1px' }}>
                                            <a href={`/${related.url}`} style={{ textDecoration: 'none', color: theme === 'light' ? '#000' : '#fff' }}>
                                                <FaLongArrowAltRight /> {related.title}
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e', color: theme === 'light' ? '#000' : '#fff' }}>
                                        No related topics found.
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="col-md-10">
                        {loading ? ( // Show ClipLoader while loading
                                <div className="text-center my-5">
                                    <ClipLoader color={theme === 'light' ? '#000000' : '#ffffff'} loading={loading} size={50} />
                                </div>
                            ) : topic ? (
                                <div>
                                    <div className="mt-3 p-3" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#c0c0c0', color: theme === 'light' ? '#000' : '#6495ed' }}>
                                        <h2 className='fw-bold p-3' style={{ borderRadius: '20px', margin: '0 30px' }}>{topic.title}</h2>
                                        <Divider />
                                        <div className='row mt-4'>
                                            <div className='col-md-2'></div>
                                            <div className='col-md-7'>
                                                <div className="video-responsive">
                                                    <iframe
                                                        width="300"
                                                        height="300"
                                                        src={topic.video_web}
                                                        frameBorder="20px"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        title="Embedded youtube"
                                                        
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-md-2'></div>
                                        </div>

                                        <Divider style={{marginTop:'10px'}}/>

                                        <div className="mt-4">
                                            {contentBlocks.length > 0 ? (
                                                contentBlocks.map((block, index) => {
                                                    switch (block.type) {
                                                        case 'text':
                                                            return (
                                                                <div key={index} className="my-3" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#c0c0c0', color: theme === 'light' ? '#000' : '#fff' }}>
                                                                    <div className="topic-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.content) }} />
                                                                </div>
                                                            );
                                                        case 'code':
                                                            return (
                                                                <div key={index} className="my-3">
                                                                    <div className="d-flex justify-content-between">
                                                                        <button className="btn btn-secondary" onClick={() => copyToClipboard(block.content)}>Copy Code</button>
                                                                    </div>
                                                                    <Editor
                                                                        height="200px"
                                                                        width="100%"
                                                                        defaultLanguage={block.language}
                                                                        value={block.content}
                                                                        theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
                                                                    />
                                                                    
                                                                </div>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                })
                                            ) : (
                                                <p>No content found.</p>
                                            )}
                                        </div>
                                    </div>
                                    {renderQuiz()}
                                </div>
                            ) : (
                                <div className="text-center my-5">
                                    <ClipLoader color={theme === 'light' ? '#000000' : '#ffffff'} loading={loading} size={50} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Base>
        </div>
    );
};

export default Topic;
