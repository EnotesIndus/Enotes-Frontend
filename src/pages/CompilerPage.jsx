import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeEditor from "../components/CodeEditor";
import LanguageSelector from "../components/LanguageSelector";
import InputBox from "../components/InputB";
import OutputBox from "../components/OutputB";
import { compileCode } from "../redux/compiler/compilerThunks";
import { clearOutput } from "../redux/compiler/compilerSlice";
import { templates } from "../services/templates";

export default function CompilerPage() {
  const dispatch = useDispatch();
  const { output, error, loading } = useSelector((state) => state.compiler);
  
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(templates.java);
  const [input, setInput] = useState("");

  const onRun = () => {
    dispatch(compileCode({ language, code, input }));
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <LanguageSelector
          language={language}
          setLanguage={(lang) => {
            setLanguage(lang);
            setCode(templates[lang]);
          }}
        />
        
        <button 
          onClick={onRun} 
          disabled={loading}
          className="px-6 py-2 bg-blue-600   rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Running..." : "Run"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left side - Editor and Input */}
        <div className="w-1/2 flex flex-col border-r">
          <div className="flex-1 overflow-auto">
            <CodeEditor language={language} code={code} setCode={setCode} />
          </div>
          
          <div>
            <InputBox input={input} setInput={setInput} />
          </div>
        </div>

        {/* Right side - Output */}
        <div className="w-1/2 overflow-auto">
          <OutputBox output={output} error={error} />
        </div>
      </div>
    </div>
  );
}