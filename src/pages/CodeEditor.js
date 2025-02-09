import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ language, onRun }) => {
    const editorRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [theme, setTheme] = useState('vs'); // Default theme

    useEffect(() => {
        // Create the editor
        const editorInstance = monaco.editor.create(editorRef.current, {
            value: '',
            language: language,
            theme: theme,
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
        });

        setEditor(editorInstance);

        return () => {
            editorInstance.dispose();
        };
    }, [language, theme]);

    const runCode = () => {
        const code = editor.getValue();
        onRun(code); // Pass the code to the parent component for execution
    };

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        monaco.editor.setTheme(newTheme);
    };

    return (
        <div>
            <div ref={editorRef} style={{ border: '1px solid #ccc' }} />
            <button onClick={runCode} className="btn btn-primary mt-2">Run Code</button>
            <div className="mt-2">
                <label htmlFor="theme-selector">Choose Theme: </label>
                <select
                    id="theme-selector"
                    value={theme}
                    onChange={(e) => changeTheme(e.target.value)}
                >
                    <option value="vs">Light (Default)</option>
                    <option value="vs-dark">Dark</option>
                    <option value="hc-black">High Contrast</option>
                    <option value="github">GitHub</option>
                    {/* Add more themes as needed */}
                </select>
            </div>
        </div>
    );
};

export default CodeEditor;
