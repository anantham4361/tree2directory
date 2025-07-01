// import { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [structure, setStructure] = useState("");
//   const [os, setOs] = useState("windows");
//   const [script, setScript] = useState("");
//   const [loading, setLoading] = useState(false);

//   const generatePrompt = (structure, os) => {
//   const isWindows = os === "windows";

//   return `
// Convert the following directory tree into a ${isWindows ? "Windows .bat batch" : "Linux/macOS .sh shell"} script.

// Rules:
// - Do NOT explain anything.
// - Only return efficient script code.
// - Do NOT use multiple \`cd\` commands.
// - Create all folders with one command if possible.
// - Create files using '${isWindows ? "echo. >" : "touch"}'
// - Wrap the script in triple backticks.

// Tree structure:
// ${structure}

// Only return the script:
// \`\`\`${isWindows ? "bat" : "bash"}
// ...
// \`\`\`
//   `.trim();
// };

//   const extractScript = (text) => {
//     const match = text.match(/```(?:bash|bat)?\s*([\s\S]*?)```/);
//     return match ? match[1].trim() : text.trim();
//   };

//   const generateScript = async () => {
//     setLoading(true);
//     setScript("");

//     const prompt = generatePrompt(structure, os);
   
//     console.log(prompt)
//     try {
//       const response = await axios.post(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//           model: "meta-llama/llama-4-scout:free",
//           messages: [
//             {
//               role: "system",
//               content: "You generate code scripts for creating directory structures."
//             },
//             {
//               role: "user",
//               content: prompt
//             }
//           ]
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       const aiOutput = response.data.choices[0].message.content;
      
//       const clean = extractScript(aiOutput);
//       setScript(clean);
//     } catch (error) {
//       console.error("Error generating script:", error);
//       alert("Failed to generate script. Check API key or structure format.");
//     }

//     setLoading(false);
//   };

//   const downloadScript = () => {
//     const blob = new Blob([script], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = os === "windows" ? "generate.bat" : "generate.sh";
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
//       <h1>📁 Directory Script Generator</h1>

//       <label>Paste your directory structure:</label>
//       <textarea
//         rows={10}
//         value={structure}
//         onChange={(e) => setStructure(e.target.value)}
//         placeholder={`Example:
// project/
// ├── src/
// │   └── app.js
// └── README.md`}
//         style={{ width: "100%", marginBottom: 10 }}
//       />

//       <label>Select Operating System:</label>
//       <select value={os} onChange={(e) => setOs(e.target.value)}>
//         <option value="windows">Windows (.bat)</option>
//         <option value="unix">Linux/macOS (.sh)</option>
//       </select>

//       <div style={{ margin: "20px 0" }}>
//         <button onClick={generateScript} disabled={loading}>
//           {loading ? "Generating..." : "Generate Script"}
//         </button>
//       </div>

//       {script && (
//         <>
//           <h3>🧾 Script Preview:</h3>
//           <pre style={{ background: "#111", color: "#0f0", padding: 10, whiteSpace: "pre-wrap" }}>
//             {script}
//           </pre>

//           <button onClick={downloadScript} style={{ marginTop: 10 }}>
//             📥 Download Script
//           </button>

//           <div style={{ marginTop: 20 }}>
//             <h4>📘 How to Run:</h4>
//             {os === "windows" ? (
//               <ul>
//                 <li>1. Right-click the downloaded <code>.bat</code> file</li>
//                 <li>2. Choose <strong>"Run as Administrator"</strong></li>
//               </ul>
//             ) : (
//               <ul>
//                 <li>1. Open terminal</li>
//                 <li>2. Run: <code>chmod +x generate.sh</code></li>
//                 <li>3. Run: <code>./generate.sh</code></li>
//               </ul>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [structure, setStructure] = useState("");
  const [os, setOs] = useState("windows");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = (structure, os) => {
    const isWindows = os === "windows";

    if (isWindows) {
      return `
Convert the following directory tree into a Windows .bat batch script.

Rules:
- Only return the batch script, no explanation.
- Use 'mkdir' to create folders.
- Use 'echo. >' to create empty files.
- Avoid using 'cd'.
- Output should be as short and efficient as possible.

Directory structure:
${structure}
      `.trim();
    } else {
      return `
Convert the following directory tree into a Linux/macOS .sh shell script.

Rules:
- Only return plain shell script (no markdown, no triple backticks).
- Start with '#!/bin/bash'.
- Use 'mkdir -p' to create all folders (combine them).
- Use 'touch' to create all files (combine them).
- Do NOT use 'cd'.
- Do NOT explain anything.

Directory structure:
${structure}
      `.trim();
    }
  };

  const generateScript = async () => {
    setLoading(true);
    setScript("");

    const prompt = generatePrompt(structure, os);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "meta-llama/llama-4-scout:free", //model name
          messages: [
            {
              role: "system",
              content: "You generate minimal directory structure creation scripts for developers."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const aiOutput = response.data.choices[0].message.content;
      setScript(aiOutput.trim()); // No regex for Linux now
    } catch (error) {
      console.error("Error generating script:", error);
      alert("Failed to generate script. Please check API or structure input.");
    }

    setLoading(false);
  };

  const downloadScript = () => {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = os === "windows" ? "generate.bat" : "generate.sh";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>📁 Directory Script Generator</h1>

      <label>Paste your directory structure:</label>
      <textarea
        rows={10}
        value={structure}
        onChange={(e) => setStructure(e.target.value)}
        placeholder={`Example:
project/
├── src/
│   ├── app.js
│   └── utils/
│       └── helper.js
└── LICENSE`}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <label>Select Operating System:</label>
      <select value={os} onChange={(e) => setOs(e.target.value)}>
        <option value="windows">Windows (.bat)</option>
        <option value="unix">Linux/macOS (.sh)</option>
      </select>

      <div style={{ margin: "20px 0" }}>
        <button onClick={generateScript} disabled={loading}>
          {loading ? "Generating..." : "Generate Script"}
        </button>
      </div>

      {script && (
        <>
          <h3>🧾 Script Preview:</h3>
          <pre style={{ background: "#111", color: "#0f0", padding: 10, whiteSpace: "pre-wrap" }}>
            {script}
          </pre>

          <button onClick={downloadScript} style={{ marginTop: 10 }}>
            📥 Download Script
          </button>

          <div style={{ marginTop: 20 }}>
            <h4>📘 How to Run:</h4>
            {os === "windows" ? (
              <ul>
                <li>1. Right-click the downloaded <code>.bat</code> file</li>
                <li>2. Choose <strong>"Run as Administrator"</strong></li>
              </ul>
            ) : (
              <ul>
                <li>1. Open terminal</li>
                <li>2. Run: <code>chmod +x generate.sh</code></li>
                <li>3. Run: <code>./generate.sh</code></li>
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
