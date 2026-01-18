import Editor from "@monaco-editor/react";

export default function CodeEditor({ language, code, setCode }) {
  return (
    <Editor
      height="100%"
      language={language === "cpp" ? "cpp" : language}
      theme="vs-dark"
      value={code}
      onChange={value => setCode(value)}
      options={{
        fontSize: 14,
        minimap: { enabled: false }
      }}
    />
  );
}