import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";

import "@xterm/xterm/css/xterm.css";

export default function CodeEditor(props) {
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  const terminalRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  const [code, setCode] = useState(props.code);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      fontFamily:
        '"JetBrains Mono", "Fira Code", Consolas, monospace',
      fontSize: 14,
      lineHeight: 1.3,
      letterSpacing: 0,
    });

    const fitAddon = new FitAddon();

    term.loadAddon(fitAddon);

    term.open(terminalContainerRef.current);

    fitAddon.fit();

    terminalRef.current = term;
    fitAddonRef.current = fitAddon;

    term.writeln("$");
    term.writeln("");

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, []);

  async function runCode() {
    const term = terminalRef.current;

    if (!term) return;

    term.clear();

    term.writeln("$ g++ main.cpp && ./main");
    term.writeln("");

    setLoading(true);
    try {
      const response = await fetch(
        "https://piston.iotafox.com/execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "plain/text",
          },
          body: code,
        }
      );

      const result = await response.json();

      if (result.compile?.stderr) {
        term.writeln(result.compile.stderr);
      }

      if (result.compile?.stdout) {
        term.write(result.compile.stdout);
      }

      if (result.run?.stdout) {
        term.write(result.run.stdout);
      }

      if (result.run?.stderr) {
        term.writeln(result.run.stderr);
      }

      term.writeln("");
      term.writeln("$");
    } catch (err) {
      term.writeln("Execution failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #333",
        background: "#1e1e1e",
      }}
    >
      <Editor
        height="400px"
        defaultLanguage="cpp"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: '"JetBrains Mono", monospace',
          automaticLayout: true,
          smoothScrolling: true,
          insertSpaces: true,
          tabSize: 2,
          detectIndentation: false,
          padding: {
            top: 12,
            bottom: 12,
          },
        }}
      />

      <div
        style={{
          background: "#252526",
          padding: "10px",
          borderTop: "1px solid #333",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={runCode}
          disabled={loading}
          style={{
            background: loading ? "#094f7a" : "#0e639c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 14px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "13px",
            fontWeight: 500,
            opacity: loading ? 0.7 : 1,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {loading && (
            <span
              style={{
                width: "10px",
                height: "10px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTopColor: "white",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.7s linear infinite",
              }}
            />
          )}
          {loading ? "Running..." : "Run"}
        </button>

        <span
          style={{
            color: "#999",
            fontSize: "12px",
            fontFamily: "sans-serif",
          }}
        >
          C++23
        </span>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div
        ref={terminalContainerRef}
        style={{
          height: "150px",
          background: "#1e1e1e",
        }}
      />
    </div>
  );
}