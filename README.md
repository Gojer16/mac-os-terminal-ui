# 🖥️ Typewriter Terminal (React Component)

A **copy-paste React component** that simulates a macOS-style terminal with a typewriter effect.  
Supports multiple themes and typing/deleting animations.  

No npm package needed — just copy the component into your project and start using it.

---

## 🚀 Demo

![Demo Screenshot](./screenshot.png)  
*(add a screenshot or GIF of your terminal in action)*

---

## 📦 Installation

1. Copy [`Terminal.jsx`](./components/Terminal.jsx) into your `components/` folder.
2. Import and use it like a normal React component:




```jsx
import Terminal from "./components/Terminal";

export default function App() {
  const terminalLines = [
    "> whoami",
    "Orlando_Ascanio",
    "> passion",
    '"Designing robust systems and clean APIs that scale."',
    "> mission",
    '"Build efficient, secure, and scalable solutions that matter."',
    "> stack",
    "JavaScript | Express | Python | FastAPI | React.js | MySQL | MongoDB | Redis | Docker ",
    "> values",
    "Simplicity. Reliability. Curiosity. Impact. Growth.",
  ];

  return (
    <Terminal
      lines={terminalLines}
      loop
      withDeleteEffect={false}
      fontSize='text-sm'
      terminalStyle="light"
      className='shadow-xl'
      pauseBeforeDelete={50}
      pauseBeforeNextLine={2000}
      typingSpeed={25}
      deleteSpeed={30}
    />
  );
}
```
⚙️ Props
Prop	Type	Default	Description
lines	string[] OR { prompt, output }[]	—	(required) The text lines to render. Each entry can be a string or an object with prompt and output properties
loop	boolean	false	If true, the terminal restarts from the first line after finishing
withDeleteEffect	boolean	true	If true, text is "deleted" before typing the next line
typingSpeed	number (ms)	50	Delay between typing each character (smaller = faster)
deleteSpeed	number (ms)	25	Delay between deleting each character (smaller = faster)
pauseBeforeDelete	number (ms)	1000	How long to wait after typing before deletion starts
pauseBeforeNextLine	number (ms)	2000	How long to wait before moving to the next line when deletion is disabled
terminalStyle	"mac" | "hacker" | "light"	"mac"	Predefined visual themes for the terminal
fontSize	string	"text-sm"	Font size of the terminal content (Tailwind classes)
className	string	""	Additional classes to customize container styl

🎨 Themes
mac: macOS-style window with traffic lights and dark background

hacker: Black/green terminal with glowing effect

light: Light-mode terminal with white background

🕹️ Interaction
Drag: Click and drag the top bar to move the terminal

Resize: Use the handle in the bottom-right corner to resize the window

Responsive: Content area automatically becomes scrollable when window is too small

🛠️ Customization
You can extend the component by:

Adding new themes to the themes object

Customizing the styling with Tailwind classes via the className prop

Adjusting animation speeds to create faster or more deliberate typing effects

📝 Example Content

```
const terminalLines = [
  "> whoami",
  "Orlando_Ascanio",
  "> passion",
  '"Designing robust systems and clean APIs that scale."',
  "> mission",
  '"Build efficient, secure, and scalable solutions that matter."',
  "> stack",
  "JavaScript | Express | Python | FastAPI | React.js | MySQL | MongoDB | Redis | Docker ",
  "> values",
  "Simplicity. Reliability. Curiosity. Impact. Growth.",
];
```

📄 License
This component is free to use in personal and commercial projects.

🤝 Contributing
Feel free to submit issues and enhancement requests!
