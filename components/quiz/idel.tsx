"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import Editor, { type OnMount } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import { Button } from "@/components/ui/button"
import {
    Play,
    Square,
    Maximize2,
    Minimize2,
    Copy,
    Download,
    Terminal,
    Eye,
    Code2,
    Palette,
    FileCode,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ConsoleMessage {
    type: "log" | "error" | "warn" | "info"
    message: string
    timestamp: number
}

interface LanguageConfig {
    id: string
    name: string
    extension: string
    monacoLanguage: string
    template: string
    mode: "preview" | "run" // preview for UI languages, run for programming languages
    executable: boolean
}

const LANGUAGE_CONFIGS: LanguageConfig[] = [
    {
        id: "html",
        name: "HTML",
        extension: "html",
        monacoLanguage: "html",
        mode: "preview",
        executable: true,
        template: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Hello World!</h1>
        <p class="text-gray-600">This is a Tailwind CSS styled component.</p>
        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click me
        </button>
      </div>
    </div>
  </body>
</html>`,
    },
    {
        id: "css",
        name: "CSS",
        extension: "css",
        monacoLanguage: "css",
        mode: "preview",
        executable: true,
        template: `/* CSS Styles */
body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
  max-width: 400px;
}

.title {
  color: #333;
  font-size: 2em;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  margin-bottom: 20px;
}

.button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.button:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}`,
    },
    {
        id: "javascript",
        name: "JavaScript",
        extension: "js",
        monacoLanguage: "javascript",
        mode: "run",
        executable: true,
        template: `// JavaScript Code
console.log("Hello, World!");

// Variables and functions
const name = "JavaScript";
const version = "ES2023";

function greet(language, ver) {
  return \`Welcome to \${language} \${ver}!\`;
}

console.log(greet(name, version));

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);

// Object example
const user = {
  name: "John Doe",
  age: 30,
  skills: ["JavaScript", "React", "Node.js"]
};

console.log("User info:", user);
console.log("Skills:", user.skills.join(", "));`,
    },
    {
        id: "python",
        name: "Python",
        extension: "py",
        monacoLanguage: "python",
        mode: "run",
        executable: false, // Cannot run Python in browser
        template: `# Python Code
print("Hello, World!")

# Variables and functions
name = "Python"
version = "3.11"

def greet(language, ver):
    return f"Welcome to {language} {ver}!"

print(greet(name, version))

# List operations
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print("Original:", numbers)
print("Doubled:", doubled)

# Dictionary example
user = {
    "name": "John Doe",
    "age": 30,
    "skills": ["Python", "Django", "FastAPI"]
}

print("User info:", user)
print("Skills:", ", ".join(user["skills"]))

# Class example
class Calculator:
    def add(self, a, b):
        return a + b
    
    def multiply(self, a, b):
        return a * b

calc = Calculator()
print("5 + 3 =", calc.add(5, 3))
print("5 * 3 =", calc.multiply(5, 3))`,
    },
    {
        id: "java",
        name: "Java",
        extension: "java",
        monacoLanguage: "java",
        mode: "run",
        executable: false, // Cannot run Java in browser
        template: `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables and methods
        String name = "Java";
        String version = "17";
        
        System.out.println(greet(name, version));
        
        // Array operations
        int[] numbers = {1, 2, 3, 4, 5};
        int[] doubled = new int[numbers.length];
        
        for (int i = 0; i < numbers.length; i++) {
            doubled[i] = numbers[i] * 2;
        }
        
        System.out.print("Original: ");
        printArray(numbers);
        System.out.print("Doubled: ");
        printArray(doubled);
        
        // Object example
        User user = new User("John Doe", 30);
        System.out.println("User: " + user.getName() + ", Age: " + user.getAge());
    }
    
    public static String greet(String language, String ver) {
        return "Welcome to " + language + " " + ver + "!";
    }
    
    public static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }
}

class User {
    private String name;
    private int age;
    
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
}`,
    },
    {
        id: "cpp",
        name: "C++",
        extension: "cpp",
        monacoLanguage: "cpp",
        mode: "run",
        executable: false, // Cannot run C++ in browser
        template: ` \`
#include <iostream>
#include <vector>
#include <string>
using namespace std;

string greet(const string& language, const string& version);
void printVector(const vector<int>& vec, const string& label);

int main() {
    cout << "Hello, World!" << endl;

    string name = "C++";
    string version = "20";

    cout << greet(name, version) << endl;

    vector<int> numbers = {1, 2, 3, 4, 5};
    vector<int> doubled;

    for (int n : numbers) {
        doubled.push_back(n * 2);
    }

    printVector(numbers, "Original");
    printVector(doubled, "Doubled");

    return 0;
}

string greet(const string& language, const string& version) {
    return "Welcome to " + language + " " + version + "!";
}

void printVector(const vector<int>& vec, const string& label) {
    cout << label << ": [";
    for (size_t i = 0; i < vec.size(); ++i) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
}
\`),
        `,
    },
]

export default function MiniIDE() {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const [theme, setTheme] = useState("vs-dark")
    const [fontSize, setFontSize] = useState(14)
    const [fontFamily, setFontFamily] = useState("JetBrains Mono, Fira Code, monospace")
    const [language, setLanguage] = useState("html")
    const [code, setCode] = useState(LANGUAGE_CONFIGS[0].template)

    const [editorWidth, setEditorWidth] = useState(50)
    const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [activeTab, setActiveTab] = useState<"preview" | "console">("preview")

    const getCurrentLanguageConfig = useCallback(() => {
        return LANGUAGE_CONFIGS.find((config) => config.id === language) || LANGUAGE_CONFIGS[0]
    }, [language])

    const handleLanguageChange = useCallback((newLanguage: string) => {
        const config = LANGUAGE_CONFIGS.find((c) => c.id === newLanguage)
        if (config) {
            setLanguage(newLanguage)
            setCode(config.template)
            if (editorRef.current) {
                editorRef.current.setValue(config.template)
            }
            // Clear console when switching languages
            setConsoleMessages([])
            setActiveTab(config.mode === "preview" ? "preview" : "console")
        }
    }, [])

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor

        // Enhanced editor configuration
        editor.updateOptions({
            fontLigatures: true,
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            mouseWheelZoom: true,
            formatOnPaste: true,
            formatOnType: true,
        })

        editor.onDidChangeModelContent(() => {
            setCode(editor.getValue())
        })
    }

    // Enhanced console capture
    useEffect(() => {
        const addConsoleMessage = (type: ConsoleMessage["type"], ...args: unknown[]) => {
            const message = args
                .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
                .join(" ")

            setConsoleMessages((prev) => [
                ...prev.slice(-49),
                {
                    type,
                    message,
                    timestamp: Date.now(),
                },
            ])
        }

        // Intercept iframe console messages
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === "console") {
                addConsoleMessage(event.data.level, event.data.message)
            }
        }

        window.addEventListener("message", handleMessage)
        return () => window.removeEventListener("message", handleMessage)
    }, [])

    // Drag functionality with smooth animations
    const isDragging = useRef(false)
    const startDrag = useCallback(() => {
        isDragging.current = true
        document.body.style.cursor = "col-resize"
        document.body.style.userSelect = "none"
    }, [])

    const stopDrag = useCallback(() => {
        isDragging.current = false
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
    }, [])

    const onDrag = useCallback((e: React.MouseEvent) => {
        if (isDragging.current) {
            const newWidth = Math.max(25, Math.min(75, (e.clientX / window.innerWidth) * 100))
            setEditorWidth(newWidth)
        }
    }, [])

    const runCode = useCallback(() => {
        const currentConfig = getCurrentLanguageConfig()
        setIsRunning(true)
        setConsoleMessages([])

        if (currentConfig.mode === "preview") {
            // Handle preview mode for UI languages (HTML, CSS)
            if (currentConfig.id === "html") {
                // Inject console capture script for HTML
                const enhancedCode = code.replace(
                    "</head>",
                    `<script>
            (function() {
              const originalLog = console.log;
              const originalError = console.error;
              const originalWarn = console.warn;
              const originalInfo = console.info;
              
              console.log = (...args) => {
                originalLog(...args);
                window.parent.postMessage({type: 'console', level: 'log', message: args.join(' ')}, '*');
              };
              
              console.error = (...args) => {
                originalError(...args);
                window.parent.postMessage({type: 'console', level: 'error', message: args.join(' ')}, '*');
              };
              
              console.warn = (...args) => {
                originalWarn(...args);
                window.parent.postMessage({type: 'console', level: 'warn', message: args.join(' ')}, '*');
              };
              
              console.info = (...args) => {
                originalInfo(...args);
                window.parent.postMessage({type: 'console', level: 'info', message: args.join(' ')}, '*');
              };
              
              window.addEventListener('error', (e) => {
                console.error('Runtime Error:', e.message, 'at', e.filename + ':' + e.lineno);
              });
            })();
          </script>
          </head>`,
                )

                if (iframeRef.current) {
                    iframeRef.current.srcdoc = enhancedCode
                }
            } else if (currentConfig.id === "css") {
                // Create HTML wrapper for CSS preview
                const cssPreview = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Preview</title>
  <style>
    ${code}
  </style>
</head>
<body>
  <div class="card">
    <h1 class="title">CSS Preview</h1>
    <p class="subtitle">Your styles are applied here</p>
    <button class="button">Styled Button</button>
  </div>
</body>
</html>`

                if (iframeRef.current) {
                    iframeRef.current.srcdoc = cssPreview
                }
            }
            setActiveTab("preview")
        } else if (currentConfig.mode === "run") {
            // Handle run mode for programming languages
            if (currentConfig.id === "javascript") {
                // Execute JavaScript code
                try {
                    // Create a safe execution context
                    const logs: string[] = []
                    const mockConsole = {
                        log: (...args: unknown[]) => logs.push(args.join(" ")),
                        error: (...args: unknown[]) => logs.push(`ERROR: ${args.join(" ")}`),
                        warn: (...args: unknown[]) => logs.push(`WARN: ${args.join(" ")}`),
                        info: (...args: unknown[]) => logs.push(`INFO: ${args.join(" ")}`),
                    }

                    // Execute the code with mock console
                    const func = new Function("console", code)
                    func(mockConsole)

                    // Add results to console
                    logs.forEach((log) => {
                        const level = log.startsWith("ERROR:")
                            ? "error"
                            : log.startsWith("WARN:")
                                ? "warn"
                                : log.startsWith("INFO:")
                                    ? "info"
                                    : "log"
                        const message = log.replace(/^(ERROR:|WARN:|INFO:)\s*/, "")

                        setConsoleMessages((prev) => [
                            ...prev,
                            {
                                type: level as "log" | "error" | "warn" | "info",
                                message,
                                timestamp: Date.now(),
                            },
                        ])
                    })

                    if (logs.length === 0) {
                        setConsoleMessages((prev) => [
                            ...prev,
                            {
                                type: "info",
                                message: "Code executed successfully (no output)",
                                timestamp: Date.now(),
                            },
                        ])
                    }
                } catch (error) {
                    setConsoleMessages((prev) => [
                        ...prev,
                        {
                            type: "error",
                            message: `Execution Error: ${error instanceof Error ? error.message : String(error)}`,
                            timestamp: Date.now(),
                        },
                    ])
                }
            } else {
                // For non-executable languages (Python, Java, C++)
                setConsoleMessages((prev) => [
                    ...prev,
                    {
                        type: "info",
                        message: `${currentConfig.name} code cannot be executed directly in the browser.`,
                        timestamp: Date.now(),
                    },
                    {
                        type: "info",
                        message: `This is a code editor for ${currentConfig.name}. Use an external compiler/interpreter to run this code.`,
                        timestamp: Date.now(),
                    },
                ])
            }
            setActiveTab("console")
        }

        setTimeout(() => setIsRunning(false), 1000)
    }, [code, getCurrentLanguageConfig])

    const formatCode = useCallback(() => {
        if (editorRef.current) {
            editorRef.current.getAction("editor.action.formatDocument")?.run()
        }
    }, [])

    const copyCode = useCallback(() => {
        navigator.clipboard.writeText(code)
    }, [code])

    const downloadCode = useCallback(() => {
        const blob = new Blob([code], { type: "text/plain" }) // Changed type to text/plain for broader compatibility
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `mini-ide-project.${getCurrentLanguageConfig().extension}` // Use language extension
        a.click()
        URL.revokeObjectURL(url)
    }, [code, getCurrentLanguageConfig])

    const resetCode = useCallback(() => {
        const currentConfig = getCurrentLanguageConfig()
        if (editorRef.current) {
            editorRef.current.setValue(currentConfig.template)
        }
    }, [getCurrentLanguageConfig])

    return (
        <div
            className={cn(
                "flex flex-col h-full min-h-[600px] rounded-lg overflow-hidden",
                "bg-[var(--color-ide-background)] border border-[var(--color-ide-border)]",
                "ide-surface-pattern shadow-2xl",
                isFullscreen && "fixed inset-0 z-50 rounded-none",
            )}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
        >
            {/* Enhanced Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-ide-surface)] border-b border-[var(--color-ide-border)]">
                <div className="flex items-center gap-2">
                    <select
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="px-3 py-1 bg-[var(--color-ide-surface)] border border-[var(--color-ide-border)] rounded text-[var(--color-ide-text-primary)] text-sm ide-transition focus:ide-glow mr-2"
                    >
                        {LANGUAGE_CONFIGS.map((config) => (
                            <option key={config.id} value={config.id}>
                                {config.name}
                            </option>
                        ))}
                    </select>

                    <Button
                        onClick={runCode}
                        disabled={isRunning}
                        size="sm"
                        className={cn(
                            "bg-[var(--color-ide-success)] hover:bg-[var(--color-ide-success)]/80",
                            "text-white border-0 ide-transition",
                            isRunning && "animate-pulse",
                        )}
                    >
                        {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isRunning ? "Processing" : getCurrentLanguageConfig().mode === "preview" ? "Preview" : "Run"}
                    </Button>

                    <Button
                        onClick={formatCode}
                        variant="outline"
                        size="sm"
                        className="bg-[var(--color-ide-surface)] border-[var(--color-ide-border)] text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)] ide-transition"
                    >
                        <Code2 className="w-4 h-4" />
                        Format
                    </Button>

                    <Button
                        onClick={() => setTheme(theme === "vs-dark" ? "vs-light" : "vs-dark")}
                        variant="outline"
                        size="sm"
                        className="bg-[var(--color-ide-surface)] border-[var(--color-ide-border)] text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)] ide-transition"
                    >
                        <Palette className="w-4 h-4" />
                        Theme
                    </Button>

                    <Button
                        onClick={resetCode}
                        variant="outline"
                        size="sm"
                        className="bg-[var(--color-ide-surface)] border-[var(--color-ide-border)] text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)] ide-transition"
                    >
                        <FileCode className="w-4 h-4" />
                        Reset
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-ide-accent)]/10 border border-[var(--color-ide-accent)]/20 rounded text-[var(--color-ide-accent)] text-sm">
                        <FileCode className="w-4 h-4" />
                        {getCurrentLanguageConfig().name}
                    </div>

                    <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="px-3 py-1 bg-[var(--color-ide-surface)] border border-[var(--color-ide-border)] rounded text-[var(--color-ide-text-primary)] text-sm ide-transition focus:ide-glow"
                    >
                        <option value="JetBrains Mono, Fira Code, monospace">JetBrains Mono</option>
                        <option value="Fira Code, monospace">Fira Code</option>
                        <option value="Monaco, Consolas, monospace">Monaco</option>
                        <option value="Source Code Pro, monospace">Source Code Pro</option>
                    </select>

                    <div className="flex items-center gap-1">
                        <Button
                            onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                            variant="outline"
                            size="sm"
                            className="bg-[var(--color-ide-surface)] border-[var(--color-ide-border)] text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)] ide-transition px-2"
                        >
                            A-
                        </Button>
                        <span className="text-[var(--color-ide-text-secondary)] text-sm min-w-[3rem] text-center">
              {fontSize}px
            </span>
                        <Button
                            onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                            variant="outline"
                            size="sm"
                            className="bg-[var(--color-ide-surface)] border-[var(--color-ide-border)] text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)] ide-transition px-2"
                        >
                            A+
                        </Button>
                    </div>

                    <div className="flex items-center gap-1 ml-2">
                        <Button
                            onClick={copyCode}
                            variant="outline"
                            size="sm"
                            className="bg-[var(--color-ide-surface)] border-[var(--color-ide-border)] text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)] ide-transition"
                        >
                            <Copy className="w-4 h-4" />
                        </Button>

                        <Button
                            onClick={downloadCode}
                            variant="outline"
                            size="sm"
                            className="bg-[var(--color-ide-surface)] border-[var(--color-ide-border)] text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)] ide-transition"
                        >
                            <Download className="w-4 h-4" />
                        </Button>

                        <Button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            variant="outline"
                            size="sm"
                            className="bg-[var(--color-ide-surface)] border-[var(--color-ide-border)] text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)] ide-transition"
                        >
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 relative">
                {/* Editor Panel */}
                <div
                    className="relative border-r border-[var(--color-ide-border)] ide-transition overflow-hidden"
                    style={{ width: `${editorWidth}%` }}
                >
                    <div className="absolute inset-0">
                        <Editor
                            height="100%"
                            value={code}
                            defaultLanguage={getCurrentLanguageConfig().monacoLanguage}
                            language={getCurrentLanguageConfig().monacoLanguage}
                            theme={theme}
                            onMount={handleEditorDidMount}
                            options={{
                                fontFamily,
                                fontSize,
                                fontLigatures: true,
                                cursorBlinking: "smooth",
                                cursorSmoothCaretAnimation: "on",
                                lineHeight: Math.max(18, fontSize + 4),
                                minimap: { enabled: true, scale: 1 },
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                renderLineHighlight: "all",
                                glyphMargin: true,
                                lineNumbers: "on",
                                overviewRulerBorder: false,
                                smoothScrolling: true,
                                mouseWheelZoom: true,
                                formatOnPaste: true,
                                formatOnType: true,
                                bracketPairColorization: { enabled: true },
                                guides: {
                                    bracketPairs: true,
                                    indentation: true,
                                },
                                suggest: {
                                    showKeywords: true,
                                    showSnippets: true,
                                },
                                scrollbar: {
                                    vertical: "visible",
                                    horizontal: "visible",
                                    useShadows: true,
                                    verticalHasArrows: false,
                                    horizontalHasArrows: false,
                                    verticalScrollbarSize: 14,
                                    horizontalScrollbarSize: 14,
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Resizer */}
                <div
                    className="w-1 bg-[var(--color-ide-border)] hover:bg-[var(--color-ide-accent)] cursor-col-resize ide-transition relative group"
                    onMouseDown={startDrag}
                >
                    <div className="absolute inset-y-0 -inset-x-1 group-hover:bg-[var(--color-ide-accent)]/20" />
                </div>

                {/* Preview/Console Panel */}
                <div className="flex flex-col ide-transition" style={{ width: `${100 - editorWidth}%` }}>
                    {/* Tab Bar */}
                    <div className="flex border-b border-[var(--color-ide-border)] bg-[var(--color-ide-surface)]">
                        {getCurrentLanguageConfig().mode === "preview" && (
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 text-sm ide-transition",
                                    activeTab === "preview"
                                        ? "bg-[var(--color-ide-background)] text-[var(--color-ide-text-primary)] border-b-2 border-[var(--color-ide-accent)]"
                                        : "text-[var(--color-ide-text-secondary)] hover:text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)]",
                                )}
                            >
                                <Eye className="w-4 h-4" />
                                Preview
                            </button>
                        )}
                        <button
                            onClick={() => setActiveTab("console")}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm ide-transition",
                                activeTab === "console"
                                    ? "bg-[var(--color-ide-background)] text-[var(--color-ide-text-primary)] border-b-2 border-[var(--color-ide-accent)]"
                                    : "text-[var(--color-ide-text-secondary)] hover:text-[var(--color-ide-text-primary)] hover:bg-[var(--color-ide-surface-hover)]",
                            )}
                        >
                            <Terminal className="w-4 h-4" />
                            Console
                            {consoleMessages.length > 0 && (
                                <span className="bg-[var(--color-ide-accent)] text-white text-xs px-1.5 py-0.5 rounded-full">
                  {consoleMessages.length}
                </span>
                            )}
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 relative overflow-hidden">
                        {activeTab === "preview" && getCurrentLanguageConfig().mode === "preview" ? (
                            <div className="h-full overflow-auto">
                                <iframe
                                    ref={iframeRef}
                                    title="preview"
                                    srcDoc={code}
                                    className="w-full h-full border-0 bg-white"
                                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                />
                            </div>
                        ) : (
                            <div className="h-full overflow-auto bg-[var(--color-ide-background)]">
                                {consoleMessages.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-[var(--color-ide-text-muted)] p-4">
                                        <div className="text-center">
                                            <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            <p>Console output will appear here</p>
                                            <p className="text-xs mt-1">
                                                {getCurrentLanguageConfig().mode === "run"
                                                    ? "Run your code to see logs"
                                                    : `${getCurrentLanguageConfig().name} output and information will be shown here`}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 space-y-1">
                                        {consoleMessages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={cn(
                                                    "flex items-start gap-2 py-1 px-2 rounded text-sm ide-transition",
                                                    msg.type === "error" && "bg-[var(--color-ide-error)]/10 text-[var(--color-ide-error)]",
                                                    msg.type === "warn" && "bg-[var(--color-ide-warning)]/10 text-[var(--color-ide-warning)]",
                                                    msg.type === "info" && "bg-[var(--color-ide-accent)]/10 text-[var(--color-ide-accent)]",
                                                    msg.type === "log" && "text-[var(--color-ide-text-primary)]",
                                                )}
                                            >
                        <span className="text-[var(--color-ide-text-muted)] text-xs mt-0.5 shrink-0">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                                                <span className="break-all">{msg.message}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
