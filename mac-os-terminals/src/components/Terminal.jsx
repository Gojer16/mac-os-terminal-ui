import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Terminal Component
 * ------------------
 * A customizable terminal-like UI component with typewriter text effects.
 * 
 * Features:
 * - Typewriter effect with configurable typing speed, delete speed, and pauses.
 * - Supports multiple "themes" (mac, hacker, light) with traffic-light style top bar.
 * - Responsive resizing: 
 *   - Draggable window (click + drag the top bar).
 *   - Resizable window (bottom-right corner handle).
 *   - Stays within viewport boundaries.
 * - Accepts both strings and { prompt, output } objects as input lines.
 * 
 * Props:
 * - lines: Array<string | { prompt: string, output: string }>
 *   The text lines to display in sequence.
 * - loop (bool): Whether to loop lines endlessly. Default: false.
 * - withDeleteEffect (bool): If true, text deletes before moving to next line. Default: true.
 * - typingSpeed (number): Delay (ms) between typing characters. Default: 50.
 * - deleteSpeed (number): Delay (ms) between deleting characters. Default: 25.
 * - pauseBeforeDelete (number): Delay (ms) before starting to delete. Default: 1000.
 * - pauseBeforeNextLine (number): Delay (ms) before moving to next line (if no delete). Default: 2000.
 * - terminalStyle ("mac" | "hacker" | "light"): Theme style. Default: "mac".
 * - fontSize (string): Tailwind font size class. Default: "text-sm".
 * - className (string): Extra CSS classes.
 */

const themes = {
  mac: {
    container:
      "bg-[#1e1e1ece] text-white rounded-xl shadow-lg max-w-full sm:max-w-2xl mx-auto",
    topBar: "flex space-x-2 p-3 cursor-move",
    trafficLights: ["bg-red-500", "bg-yellow-500", "bg-green-500"],
    content: "p-4 sm:p-6 font-mono",
    prompt: "text-green-400",
    output: "text-gray-300",
  },
  hacker: {
    container:
      "bg-black text-green-300 font-mono p-4 sm:p-6 rounded-xl shadow-[0_0_20px_rgba(0,255,0,0.2)] border border-green-500",
    topBar: "flex space-x-2 p-3 cursor-move",
    trafficLights: ["bg-red-500", "bg-yellow-500", "bg-green-500"],
    content: "",
    prompt: "text-green-400",
    output: "text-green-300",
  },
  light: {
    container:
      "bg-white text-gray-900 font-mono p-4 sm:p-6 rounded-xl shadow-md border border-gray-300",
    topBar: "flex space-x-2 p-3 cursor-move",
    trafficLights: ["bg-red-500", "bg-yellow-500", "bg-green-500"],
    content: "",
    prompt: "text-blue-600",
    output: "text-gray-700",
  },
};

const Terminal = ({
  lines,
  loop = false,
  withDeleteEffect = true,
  typingSpeed = 50,
  deleteSpeed = 25,
  pauseBeforeDelete = 1000,
  pauseBeforeNextLine = 2000,
  terminalStyle = "mac",
  fontSize = "text-sm",
  className = "",
}) => {
  // Typing state
  const [displayedText, setDisplayedText] = useState(""); // Current text shown
  const [lineIndex, setLineIndex] = useState(0);          // Current line index
  const [charIndex, setCharIndex] = useState(0);          // Current character index
  const [deleting, setDeleting] = useState(false);        // Deleting mode flag

  // Drag + resize state
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Window position
  const [size, setSize] = useState({
    width: Math.min(window.innerWidth * 0.9, 600),
    height: Math.min(window.innerHeight * 0.6, 400),
  });

  const dragging = useRef(false);        // Drag state
  const resizing = useRef(false);        // Resize state
  const dragStartPos = useRef({ x: 0, y: 0 });  // Initial drag mouse pos
  const sizeStart = useRef({ width: 0, height: 0 }); // Initial size before resize

  // Resolve current line (supports strings or {prompt, output})
  const currentLine =
    typeof lines[lineIndex % lines.length] === "string"
      ? { prompt: "", output: lines[lineIndex % lines.length] }
      : lines[lineIndex % lines.length];

  const fullText = `${currentLine.prompt}${currentLine.output}`;

  /**
   * Typing & deleting effect
   */
  useEffect(() => {
    let timeout;

    if (!deleting) {
      // Typing characters forward
      if (charIndex < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + fullText[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        // Finished typing → either delete or move to next line
        if (withDeleteEffect) {
          timeout = setTimeout(() => setDeleting(true), pauseBeforeDelete);
        } else if (loop) {
          timeout = setTimeout(() => {
            setLineIndex((prev) => (prev + 1) % lines.length);
            setDisplayedText("");
            setCharIndex(0);
          }, pauseBeforeNextLine);
        }
      }
    } else {
      // Deleting characters backwards
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Finished deleting → move to next line
        setDeleting(false);
        setCharIndex(0);
        setLineIndex((prev) => (prev + 1) % lines.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    deleting,
    displayedText,
    lines,
    fullText,
    typingSpeed,
    deleteSpeed,
    pauseBeforeDelete,
    pauseBeforeNextLine,
    withDeleteEffect,
    loop,
  ]);

  /**
   * Drag & resize handlers
   */
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Handle dragging
      if (dragging.current) {
        setPosition((prev) => {
          const newX = e.clientX - dragStartPos.current.x;
          const newY = e.clientY - dragStartPos.current.y;
          return {
            x: Math.max(0, Math.min(newX, window.innerWidth - size.width)),
            y: Math.max(0, Math.min(newY, window.innerHeight - size.height)),
          };
        });
      }

      // Handle resizing
      if (resizing.current) {
        const newWidth = Math.max(
          300,
          Math.min(
            window.innerWidth - position.x,
            sizeStart.current.width + (e.clientX - dragStartPos.current.x)
          )
        );
        const newHeight = Math.max(
          200,
          Math.min(
            window.innerHeight - position.y,
            sizeStart.current.height + (e.clientY - dragStartPos.current.y)
          )
        );
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      dragging.current = false;
      resizing.current = false;
      document.body.style.cursor = "auto";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position.x, position.y, size.width, size.height]);

  const theme = themes[terminalStyle] || themes.mac;

  return (
    <div
      className={`${theme.container} ${className}`}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        userSelect: "none",
        overflow: "hidden",
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
    >
      {/* Top bar (draggable handle) */}
      {["mac", "hacker", "light"].includes(terminalStyle) && (
        <div
          className={theme.topBar}
          onMouseDown={(e) => {
            dragging.current = true;
            dragStartPos.current = {
              x: e.clientX - position.x,
              y: e.clientY - position.y,
            };
            document.body.style.cursor = "move";
          }}
        >
          {theme.trafficLights.map((color, i) => (
            <span key={i} className={`h-3 w-3 rounded-full ${color}`} />
          ))}
        </div>
      )}

      {/* Terminal content area */}
      <div
        className={`${theme.content} ${fontSize}`}
        style={{
          overflow: "auto",
          height: `calc(100% - ${
            ["mac", "hacker", "light"].includes(terminalStyle) ? "50px" : "0px"
          })`,
        }}
      >
        <pre className={theme.output}>{displayedText}</pre>
      </div>

      {/* Resize handle (bottom-right corner) */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          resizing.current = true;
          dragStartPos.current = { x: e.clientX, y: e.clientY };
          sizeStart.current = { width: size.width, height: size.height };
          document.body.style.cursor = "se-resize";
        }}
        style={{
          position: "absolute",
          bottom: "2px",
          right: "2px",
          width: "12px",
          height: "12px",
          cursor: "se-resize",
          borderRadius: "2px",
        }}
      />
    </div>
  );
};

Terminal.propTypes = {
  lines: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        prompt: PropTypes.string.isRequired,
        output: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  loop: PropTypes.bool,
  withDeleteEffect: PropTypes.bool,
  typingSpeed: PropTypes.number,
  deleteSpeed: PropTypes.number,
  pauseBeforeDelete: PropTypes.number,
  pauseBeforeNextLine: PropTypes.number,
  terminalStyle: PropTypes.oneOf(["mac", "hacker", "light"]),
  fontSize: PropTypes.string,
  className: PropTypes.string,
};

export default Terminal;