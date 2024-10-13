import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import Base from "../components/Base";

const CodeDisplay = ({ code }) => {
    const [copied, setCopied] = useState(false);
    const [codeValue, setCodeValue] = useState(code);
    const editorRef = useRef(null);

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(codeValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    };

    const executeCode = () => {
        try {
            // eslint-disable-next-line no-new-func
            new Function(codeValue)();
        } catch (error) {
            console.error("Error executing code:", error);
        }
    };

    return (

        <div style={{ position: "relative" }}>
            <button
                onClick={copyCodeToClipboard}
                style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    padding: "5px 10px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: 5,
                    cursor: "pointer",
                }}
            >
                {copied ? "Copied!" : "Copy"}
            </button>
            <CodeMirror
                value={codeValue}
                theme={oneDark}
                extensions={[javascript()]}
                onChange={(value) => setCodeValue(value)}
                style={{ paddingTop: "50px" }}
                ref={editorRef}
            />
            <button
                onClick={executeCode}
                style={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    padding: "5px 10px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: 5,
                    cursor: "pointer",
                }}
            >
                Run Code
            </button>
        </div>
    );
};

export default CodeDisplay;