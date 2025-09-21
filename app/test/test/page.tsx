"use client";

import { useRef, useState, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

export default function MiniIDE() {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    const [theme, setTheme] = useState("jetbrains-dark");
    const [fontSize, setFontSize] = useState(14);
    const [fontFamily, setFontFamily] = useState("JetBrains Mono, monospace");
    const [code, setCode] = useState(`<!DOCTYPE html>
<html>
  <head>
    <style>
      body { background-color: #1e1e1e; color: #fff; font-family: sans-serif; }
      h1 { color: #ff5555; }
    </style>
  </head>
  <body>
    <h1>Hello JetBrains IDE!</h1>
    <script>
      console.log("Hello from JS!");
    </script>
  </body>
</html>`);

    const [editorWidth, setEditorWidth] = useState(50); // % de la partie gauche
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            setCode(editor.getValue());
        });
    };

    // Capture console.log pour afficher dans la console
    useEffect(() => {
        const originalLog = console.log;
        console.log = (...args) => {
            setConsoleOutput((prev) => [...prev, args.join(" ")]);
            originalLog(...args);
        };
        return () => {
            console.log = originalLog;
        };
    }, []);

    // Drag & Drop
    const isDragging = useRef(false);

    const startDrag = () => { isDragging.current = true; };
    const stopDrag = () => { isDragging.current = false; };
    const onDrag = (e: React.MouseEvent) => {
        if (isDragging.current) {
            const newWidth = (e.clientX / window.innerWidth) * 100;
            if (newWidth > 20 && newWidth < 80) setEditorWidth(newWidth);
        }
    };

    return (
        <div className="h-full flex flex-col border rounded shadow-lg" onMouseMove={onDrag} onMouseUp={stopDrag}>
            {/* Barre d’outils */}
            <div className="flex gap-2 bg-gray-800 p-2 text-white rounded-t items-center">
                <button onClick={() => alert("Run!") } className="px-3 py-1 bg-green-600 rounded">Run</button>
                <button onClick={() => editorRef.current?.getAction("editor.action.formatDocument")?.run()} className="px-3 py-1 bg-blue-600 rounded">Format</button>
                <button onClick={() => setTheme(theme === "jetbrains-dark" ? "vs" : "jetbrains-dark")} className="px-3 py-1 bg-gray-600 rounded">Toggle Theme</button>

                <span className="ml-auto flex items-center gap-2">
          <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="px-2 py-1 bg-gray-700 rounded">
            <option value="JetBrains Mono, monospace">JetBrains Mono</option>
            <option value="Fira Code, monospace">Fira Code</option>
            <option value="Courier New, monospace">Courier New</option>
          </select>
          <button onClick={() => setFontSize(f => f - 1)} className="px-2 py-1 bg-gray-700 rounded">A-</button>
          <span>{fontSize}px</span>
          <button onClick={() => setFontSize(f => f + 1)} className="px-2 py-1 bg-gray-700 rounded">A+</button>
        </span>
            </div>

            {/* Partie principale : éditeur + aperçu */}
            <div className="flex flex-1 relative h-[400px]">
                {/* Editeur */}
                <div className="relative" style={{ width: `${editorWidth}%` }}>
                    <Editor
                        height="100%"
                        value={code}
                        defaultLanguage="html"
                        theme={theme}
                        onMount={handleEditorDidMount}
                        options={{
                            fontFamily,
                            fontSize,
                            cursorBlinking: "smooth",
                            lineHeight: 20,
                            minimap: { enabled: true },
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                            renderLineHighlight: "all",
                            glyphMargin: true,
                            lineNumbers: "on",
                            overviewRulerBorder: false,
                        }}
                    />
                </div>

                {/* Drag handle */}
                <div
                    className="cursor-col-resize bg-gray-600"
                    style={{ width: "5px" }}
                    onMouseDown={startDrag}
                />

                {/* Aperçu */}
                <div className="border-l relative" style={{ width: `${100 - editorWidth}%`, backgroundColor: "#1e1e1e" }}>
                    <iframe
                        title="preview"
                        srcDoc={code}
                        style={{ width: "100%", height: "100%", border: "none" }}
                    />
                </div>
            </div>

            {/* Console de sortie */}
            <div className="h-32 overflow-auto bg-black text-white p-2 font-mono">
                {consoleOutput.map((line, idx) => (
                    <div key={idx}>{line}</div>
                ))}
            </div>

            {/* Styles décorations */}
            <style jsx>{`
                .line-warning { background-color: #53333355; }
                .glyph-warning { background-color: #ff5555; }
            `}</style>
        </div>
    );
}
