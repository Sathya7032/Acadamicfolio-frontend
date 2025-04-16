import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { FiPlay, FiSun, FiMoon, FiMonitor, FiGitBranch } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CodeEditor = ({ language, onRun }) => {
    const editorRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [theme, setTheme] = useState('vs-dark');
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const editorInstance = monaco.editor.create(editorRef.current, {
            value: '',
            language: language,
            theme: theme,
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                useShadows: true
            },
            padding: { top: 10 },
            fontFamily: 'Menlo, Monaco, "Courier New", monospace'
        });

        setEditor(editorInstance);

        // Add keyboard shortcut (Ctrl/Cmd + Enter)
        editorInstance.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
            () => runCode()
        );

        return () => editorInstance.dispose();
    }, [language, theme]);

    const runCode = async () => {
        try {
            setIsRunning(true);
            const code = editor.getValue();
            await onRun(code);
        } catch (error) {
            toast.error(`Execution error: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const themeOptions = [
        { value: 'vs', label: 'Light', icon: <FiSun /> },
        { value: 'vs-dark', label: 'Dark', icon: <FiMoon /> },
        { value: 'hc-black', label: 'High Contrast', icon: <FiMonitor /> },
        { value: 'github', label: 'GitHub', icon: <FiGitBranch /> }
    ];

    return (
        <div className="code-editor-container">
            <div className="editor-toolbar">
                <div className="theme-selector">
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="theme-dropdown"
                    >
                        {themeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button 
                    onClick={runCode} 
                    className="run-button"
                    disabled={isRunning}
                >
                    <FiPlay className="run-icon" />
                    {isRunning ? 'Running...' : 'Run Code'}
                    <span className="shortcut-hint">(Ctrl/Cmd + Enter)</span>
                </button>
            </div>

            <div ref={editorRef} className="monaco-editor" />

            <style jsx>{`
                .code-editor-container {
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    background: ${theme === 'vs' ? '#ffffff' : '#1e1e1e'};
                }

                .editor-toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 16px;
                    background: ${theme === 'vs' ? '#f5f5f5' : '#252526'};
                    border-bottom: 1px solid ${theme === 'vs' ? '#e8e8e8' : '#333333'};
                }

                .theme-dropdown {
                    padding: 6px 12px;
                    border-radius: 4px;
                    border: 1px solid ${theme === 'vs' ? '#ddd' : '#444'};
                    background: ${theme === 'vs' ? '#fff' : '#333'};
                    color: ${theme === 'vs' ? '#333' : '#fff'};
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .run-button {
                    display: flex;
                    align-items: center;
                    padding: 8px 16px;
                    background: #007acc;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .run-button:hover {
                    background: #0069b4;
                }

                .run-button:disabled {
                    background: #004d80;
                    cursor: not-allowed;
                }

                .run-icon {
                    margin-right: 8px;
                }

                .shortcut-hint {
                    margin-left: 12px;
                    opacity: 0.8;
                    font-size: 0.9em;
                }

                .monaco-editor {
                    height: 500px;
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .editor-toolbar {
                        flex-direction: column;
                        gap: 8px;
                        align-items: flex-start;
                    }

                    .theme-dropdown {
                        width: 100%;
                    }

                    .run-button {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default CodeEditor;