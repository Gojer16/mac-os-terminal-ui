import './App.css'
import FistMac from './components/FistMac';
import SecondMac from './components/SecondMac';
import ThreeMac from './components/ThreeMac';
import FourthMac from './components/FourthMac';
import TypewriterTerminal from './components/Terminal';



function App() {

  return (
    <>
    <div className='px-8 py-8 gap-8 flex'>
        <FistMac />
        <SecondMac />
     </div>
     <div className='px-8 py-8 gap-8 flex'>
        <ThreeMac />
        
     </div>
     <div className='px-8 py-8 gap-8 flex'>
        <FourthMac />
     </div>

     <div className='px-8 py-8 gap-8 flex'>
     <TypewriterTerminal
  lines={[
    { prompt: '> whoami', output: 'orlando_dev' },
    { prompt: '> mission', output: 'Crafting full-stack & AI-powered magic ✨' },
    ]}
    loop
    withDeleteEffect
    sound
    typingSpeed={40}
    deleteSpeed={20}
    terminalStyle="mac"
    />
     </div>
     

    </>
  )
}

export default App
