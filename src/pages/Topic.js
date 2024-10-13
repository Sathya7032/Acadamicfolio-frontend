import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Base from '../components/Base';
import { Editor } from '@monaco-editor/react';
import '../styles/video.css';
import DOMPurify from 'dompurify';
import { Divider } from '@mui/material';

const Topic = () => {
    const { theme } = useContext(ThemeContext);
    const { url } = useParams();
    const [topic, setTopic] = useState(null);
    const [contentBlocks, setContentBlocks] = useState([]);
    const [relatedTopics, setRelatedTopics] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState(null);
    const [output, setOutput] = useState('');
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizResults, setQuizResults] = useState([]);

    useEffect(() => {
        const fetchTopicData = async () => {
            try {
                const response = await axios.get(`https://acadamicfolio.pythonanywhere.com/api/tutorials/${url}/`);
                setTopic(response.data.topic);
                setContentBlocks(response.data.content_blocks);
                setRelatedTopics(response.data.related_topics);
            } catch (err) {
                setError('Tutorial topic not found.');
            }
        };

        fetchTopicData();
    }, [url]);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(`https://acadamicfolio.pythonanywhere.com/quiz/${url}/`);
                setQuiz(response.data);
                console.log(response.data)
            } catch (err) {
                console.error('Error fetching quiz:', err);
            }
        };

        fetchQuizData();
    }, [url]);

    const runCode = (code, language) => {
        try {
            if (language === 'javascript') {
                const result = eval(code);
                setOutput(result);
            } else if (language === 'java') {
                setOutput('Java execution not supported in this example.');
            } else {
                setOutput('Unsupported language.');
            }
        } catch (err) {
            setOutput(`Error: ${err.message}`);
        }
    };

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
            <div className="mt-4 p-3" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e', color: theme === 'light' ? '#000' : '#fff' }}>
                <h3 className="fw-bold">Quiz: {quiz.title}</h3>
                {quiz.questions.map((question, index) => (
                    <div key={index} className="my-3">
                        <p className="fw-bold">{question.question_text}</p>
                        <ul className="list-group">
                            {question.options.map((option) => (
                                <li key={option.id} className="list-group-item">
                                    <input
                                        type="radio"
                                        name={`question${index}`}
                                        id={option.id}
                                        value={option.id}
                                        onChange={() => handleAnswerChange(index, option.id)}
                                    />
                                    <label htmlFor={option.id} style={{ marginLeft: '8px' }}>
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
                        <p>{result.question}</p>
                        <p>Selected Answer: {result.selectedAnswer}</p>
                        <p>Correct Answer: {result.correctAnswer}</p>
                        <p style={{ color: result.is_correct ? 'green' : 'red' }}>
                            {result.is_correct ? 'Correct!' : 'Wrong!'}
                        </p>
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
                <div className="pt-4" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff' }}>
                    <div className="row">
                        <div className="col-md-3" style={{ backgroundColor: theme === 'light' ? '#708090' : '#1e1e1e', color: theme === 'light' ? '#000' : '#fff' }}>
                            <h3 className='pt-3'>Related Topics</h3>
                            <ul className="list-group" style={{ listStyle: 'none' }}>
                                {relatedTopics.length > 0 ? (
                                    relatedTopics.map((related) => (
                                        <li key={related.id} className="list-group-item" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e', color: theme === 'light' ? '#000' : '#fff' }}>
                                            <a href={`/${related.url}`} style={{ textDecoration: 'none', color: theme === 'light' ? '#007bff' : '#66b3ff' }}>
                                                {related.title}
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

                        <div className="col-md-9">
                            {topic ? (
                                <div>
                                    <div className="mt-3 p-3" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e', color: theme === 'light' ? '#000' : '#fff' }}>
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

                                        <div className="mt-4">
                                            {contentBlocks.length > 0 ? (
                                                contentBlocks.map((block, index) => {
                                                    switch (block.type) {
                                                        case 'text':
                                                            return (
                                                                <div key={index} className="my-3" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e', color: theme === 'light' ? '#000' : '#fff' }}>
                                                                    <div className="topic-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.content) }} />
                                                                </div>
                                                            );
                                                        case 'image':
                                                            const imageUrl = `https://acadamicfolio.pythonanywhere.com${block.content}`;
                                                            return (
                                                                <div key={index} className="my-3 d-flex justify-content-center">
                                                                    <img src={imageUrl} alt="Tutorial" className="img-fluid" style={{ width: '60%' }} />
                                                                </div>
                                                            );
                                                        case 'code':
                                                            return (
                                                                <div key={index} className="my-3" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e', color: theme === 'light' ? '#000' : '#fff' }}>
                                                                    <div className='d-flex'>
                                                                        <button className="btn btn-primary m-2" onClick={() => copyToClipboard(block.content)}>Copy Code</button>
                                                                        <button className="btn btn-primary m-2" onClick={() => runCode(block.content, topic.language)}>Run Code</button>
                                                                    </div>
                                                                    <Editor
                                                                        height="200px"
                                                                        theme={theme === 'light' ? 'light' : 'vs-dark'}
                                                                        defaultLanguage={topic.language}
                                                                        value={block.content}
                                                                        options={{ readOnly: true }}
                                                                    />
                                                                </div>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                })
                                            ) : (
                                                <p>No content available.</p>
                                            )}
                                        </div>
                                    </div>
                                    <Divider />
                                    {renderQuiz()}
                                </div>
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>
                    </div>
                </div>
            </Base>
        </div>
    );
};

export default Topic;
