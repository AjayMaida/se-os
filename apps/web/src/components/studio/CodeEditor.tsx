"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
}

export default function CodeEditor({ 
  value, 
  onChange, 
  language,
  readOnly = false 
}: CodeEditorProps) {
  return (
    <div className="w-full h-full monaco-editor-container">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(val) => onChange(val || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          wordWrap: "on",
          tabSize: 4,
          readOnly,
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          renderWhitespace: "selection"
        }}
        loading={
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Loading editor...
          </div>
        }
      />
    </div>
  );
}
