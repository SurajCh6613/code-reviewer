import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css';


const App = () => {
  const [code, setCode] = useState(`function sum() {
   return a + b 
}`);
  const [review, setReview] = useState("");
  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });
    setReview(response.data);
  }
  return (
    <>
      <main className="flex h-screen p-2 bg-gray-700 gap-2 text-white">
        <div className="left w-1/2  bg-[#000] h-full rounded-md relative">
          <div className="code h-full">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              style={{
                fontFamily: '"Fira code","Fira Mono",monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
              }}
            ></Editor>
          </div>
          <div
            onClick={reviewCode}
            className="review absolute bottom-3 right-3 p-2 border-2 bg-blue-300 rounded-md px-3 cursor-pointer"
          >
            Review
          </div>
        </div>
        <div className="right w-1/2 bg-gray-900 rounded-md h-full overflow-auto p-4">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
};

export default App;
