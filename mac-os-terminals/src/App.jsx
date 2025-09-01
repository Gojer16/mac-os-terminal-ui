import './App.css'
import Terminal from './components/Terminal';

function App() {
  const terminalLines = [
    "> whoami",
    "Orlando_Ascanio",
    "> passion",
    '"Designing robust systems and clean APIs that scale."',
    "> mission",
    '"Build efficient, secure, and scalable solutions that matter."',
    "> stack",
    "JavaScript | Express | Python | FastAPI | React.js ",
    "> values",
    "Simplicity. Reliability. Curiosity. Impact. Growth.",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex justify-end items-center flex-col-reverse pl-78 gap-6">
        {/* Title & description */}
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Orlando’s Dev Terminal</h1>
        </div>

        {/* Terminal */}
        <Terminal
          lines={terminalLines}
          loop
          withDeleteEffect={false}
          fontSize="text-sm"
          terminalStyle="mac"
          className="shadow-xl"
          pauseBeforeDelete={50}
          pauseBeforeNextLine={2000}
          typingSpeed={25}
          deleteSpeed={30}
        />
        <a
          href="https://github.com/Gojer16/mac-os-terminal-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg transition"
        >
          ⭐ Star this project on GitHub
        </a>
      </div>
    </div>
  );
}

export default App;
