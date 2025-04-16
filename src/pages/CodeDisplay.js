import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { FiCopy, FiCheck, FiPlay, FiAlertTriangle } from "react-icons/fi";
import Base from "../components/Base";

const CodeDisplay = ({ code }) => {
    const [copied, setCopied] = useState(false);
    const [codeValue, setCodeValue] = useState(code);
    const [error, setError] = useState(null);
    const editorRef = useRef(null);

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(codeValue)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => setError('Failed to copy code'));
    };

    const executeCode = () => {
        try {
            setError(null);
            // eslint-disable-next-line no-new-func
            new Function(codeValue)();
        } catch (error) {
            setError(error.message);
            console.error("Error executing code:", error);
        }
    };

    return (
        <div style={{ 
            position: "relative",
            border: "1px solid #2a2f3b",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
            {/* Editor Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
                background: "#1a1e24",
                borderBottom: "1px solid #2a2f3b"
            }}>
                <div style={{ 
                    fontSize: "0.875rem",
                    color: "#7f8c9a",
                    fontWeight: 500,
                    textTransform: "uppercase"
                }}>
                    JavaScript
                </div>
                
                <div style={{ display: "flex", gap: "8px" }}>
                    <button
                        onClick={copyCodeToClipboard}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            background: copied ? "#2ecc71" : "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                        title="Copy code"
                    >
                        {copied ? <FiCheck /> : <FiCopy />}
                        <span>{copied ? "Copied" : "Copy"}</span>
                    </button>

                    <button
                        onClick={executeCode}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            background: "#27ae60",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                        title="Execute code"
                    >
                        <FiPlay />
                        <span>Run</span>
                    </button>
                </div>
            </div>

            {/* Code Editor */}
            <CodeMirror
                value={codeValue}
                height="400px"
                theme={oneDark}
                extensions={[javascript()]}
                onChange={(value) => setCodeValue(value)}
                ref={editorRef}
                style={{ 
                    fontSize: "0.875rem",
                    padding: "16px"
                }}
            />

            {/* Error Display */}
            {error && (
                <div style={{
                    padding: "12px 16px",
                    background: "#c0392b20",
                    borderTop: "1px solid #c0392b",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    color: "#e74c3c"
                }}>
                    <FiAlertTriangle />
                    <pre style={{ margin: 0, fontSize: "0.875rem" }}>{error}</pre>
                </div>
            )}
        </div>
    );
};

export default CodeDisplay;