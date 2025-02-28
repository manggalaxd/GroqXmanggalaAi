import { useState } from "react";
import { requestToGroqAI } from "./utils/groq";
import "./App.css";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSubmit = async () => {
    const userMessage = content.value;
    if (!userMessage.trim()) return;
    
    const ai = await requestToGroqAI(userMessage);
    
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', content: userMessage },
      { type: 'ai', content: ai }
    ]);
    
    // Clear input box
    content.value = '';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main
      className="flex flex-col min-h-[100vh] justify-end 
      w-full h-full bg-[#111827]"
    >
      <h1 className="text-2xl text-blue-500 mb-4 fixed top-4 left-4">ManggalaGPT</h1>

      {/* MESSAGE */}
      <div className="w-full overflow-y-auto h-full flex flex-col p-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg mb-2 max-w-[80%] ${
              message.type === 'user' 
                ? 'bg-[#2563eb] self-end' 
                : 'bg-[#374151] self-start'
            }`}
          >
            <SyntaxHighlight
              language="swift"
              style={darcula}
              wrapLongLines={true}
              customStyle={{
                backgroundColor: 'transparent',
                color: '#ffffff',
              }}
            >
              {message.content}
            </SyntaxHighlight>
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full p-4">
        <div className="flex items-center gap-2 w-full px-4">
          <textarea
            placeholder="Ketik permintaan di sini..."
            className="py-1 px-2 text-sm rounded-lg bg-[#2563eb] border-2 border-white text-white focus:ring-2 focus:ring-white focus:border-white transition-all flex-1"
            id="content"
            rows="1"
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-[#2563eb] py-2 px-4 font-bold text-white rounded-lg hover:bg-[#1d4ed8] transition-colors h-[42px]"
            onClick={handleSubmit}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
