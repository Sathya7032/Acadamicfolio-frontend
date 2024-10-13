import React, { useContext, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml'; // HTML Mode
import 'codemirror/mode/css/css'; // CSS Mode
import 'codemirror/mode/javascript/javascript'; // JavaScript Mode
import 'codemirror/theme/material.css'; // Dark theme (Material)
import 'codemirror/theme/eclipse.css'; // Light theme (Eclipse)
import '../styles/editor.css'; // Custom stylesheet for the layout
import { ThemeContext } from './ThemeContext'; // Importing Theme Context
import Base from './Base';

const HtmlEditor = () => {
    const [activeTab, setActiveTab] = useState('html'); // Active tab state
    const [htmlCode, setHtmlCode] = useState('<h1>Hello World</h1>');
    const [cssCode, setCssCode] = useState('h1 { color: blue; }');
    const [jsCode, setJsCode] = useState('console.log("Hello World from JS!");');
    const { theme } = useContext(ThemeContext); // Access the theme from ThemeContext

    // Function to combine the HTML, CSS, and JS code and render them in an iframe
    const generatePreview = () => {
        const previewTemplate = `
            <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>
                    ${jsCode}
                </script>
            </body>
            </html>
        `;
        return previewTemplate;
    };

    // Determine the CodeMirror theme based on the current theme context
    const codeMirrorTheme = theme === 'dark' ? 'material' : 'eclipse';

    return (
        <Base>
            <div className={`editor-preview-container ${theme}`}>
                {/* Tabs for switching between HTML, CSS, JS */}
                <div className="editor-tabs">
                    <button
                        className={`tab-button ${activeTab === 'html' ? 'active' : ''}`}
                        onClick={() => setActiveTab('html')}
                    >
                        HTML
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'css' ? 'active' : ''}`}
                        onClick={() => setActiveTab('css')}
                    >
                        CSS
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'js' ? 'active' : ''}`}
                        onClick={() => setActiveTab('js')}
                    >
                        JavaScript
                    </button>
                </div>

                {/* HTML Editor */}
                {activeTab === 'html' && (
                    <div className="editor-section">
                        <h3>HTML Code</h3>
                        <CodeMirror
                            value={htmlCode}
                            options={{
                                mode: 'xml',
                                theme: codeMirrorTheme,
                                lineNumbers: true,
                                tabSize: 2,
                                indentWithTabs: true,
                            }}
                            onBeforeChange={(editor, data, value) => {
                                setHtmlCode(value);
                            }}
                        />
                    </div>
                )}

                {/* CSS Editor */}
                {activeTab === 'css' && (
                    <div className="editor-section">
                        <h3>CSS Code</h3>
                        <CodeMirror
                            value={cssCode}
                            options={{
                                mode: 'css',
                                theme: codeMirrorTheme,
                                lineNumbers: true,
                                tabSize: 2,
                                indentWithTabs: true,
                            }}
                            onBeforeChange={(editor, data, value) => {
                                setCssCode(value);
                            }}
                        />
                    </div>
                )}

                {/* JS Editor */}
                {activeTab === 'js' && (
                    <div className="editor-section">
                        <h3>JavaScript Code</h3>
                        <CodeMirror
                            value={jsCode}
                            options={{
                                mode: 'javascript',
                                theme: codeMirrorTheme,
                                lineNumbers: true,
                                tabSize: 2,
                                indentWithTabs: true,
                            }}
                            onBeforeChange={(editor, data, value) => {
                                setJsCode(value);
                            }}
                        />
                    </div>
                )}

                {/* Preview Section */}
                <div className="preview-section">
                    <h3>Live Preview</h3>
                    <iframe
                        title="Preview"
                        srcDoc={generatePreview()}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                </div>
            </div>
        </Base>
    );
};

export default HtmlEditor;