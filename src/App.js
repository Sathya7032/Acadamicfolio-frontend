import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import HtmlEditor from './components/HtmlEditor';
import TopicView from './pages/TopicView';
import Topic from './pages/Topic';
import SearchComponent from './components/SearchComponent';
import CodeTopics from './pages/CodeTopics';
import Codes from './pages/Codes';
import Topics from './pages/Topics';


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route element={<HtmlEditor />} path="/editor" />
                <Route element={<TopicView />} path='tutorials/:url' />
                <Route element={<Topic />} path='/:url' />
                <Route element={<SearchComponent />} path="/search" />
                <Route element={<CodeTopics />} path="languages/:url" />
                <Route element={<Codes />} path="languages/codes/:url/" />
                <Route element={<Topics />} path="/topics/:url" />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
