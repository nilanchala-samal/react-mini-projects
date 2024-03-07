import { useState } from "react"


function App() {
  const [color, setColor] = useState('')

  return (
    <>
      <div className="w-full h-screen duration-200" style={{ backgroundColor: color }}>
        <h1 className="flex justify-center text-4xl py-40 text-slate-400">Change the background color by clicking below buttons</h1>
        <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-slate-400 px-3 py-2 rounded-xl">

            <button
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "olive" }}
              onClick={() => setColor('olive')}>
              Olive
            </button>
            
            <button
              className="outline-none px-4 py- rounded-full text-white shadow-lg"
              style={{ backgroundColor: "red" }}
              onClick={() => setColor('red')}>
              Red
            </button>

            <button
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "green" }}
              onClick={() => setColor('green')}>
              Green
            </button>

            <button
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "blue" }}
              onClick={() => setColor('blue')}>
              Blue
            </button>

            <button
              className="px-4 py-1 rounded-full text-slate-700 shadow-lg"
              style={{ backgroundColor: "white" }}
              onClick={() => setColor('white')}>
              White
            </button>

            <button
              className="outline-none px-4 py-1 rounded-full text-slate-700 shadow-lg" style={{ backgroundColor: "yellow" }}
              onClick={() => setColor('yellow')}>
              Yellow
            </button>

            <button
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "black" }}
              onClick={() => setColor('black')}>
              Black
            </button>

            <button
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "brown" }}
              onClick={() => setColor('brown')}>
              Brown
            </button>

            <button
              className="outline-none px-4 py-1 rounded-full text-slate-600 shadow-lg" style={{ backgroundColor: "cyan" }}
              onClick={() => setColor('cyan')}>
              Cyan
            </button>

            <button
              className="outline-none px-4 py-1 rounded-full text-slate-600 shadow-lg" style={{ backgroundColor: "orange" }}
              onClick={() => setColor('orange')}>
              Orange
            </button>

            <button
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
              style={{ backgroundColor: "purple" }}
              onClick={() => setColor('purple')}>
              Purple
            </button>

            <button
              className="outline-none px-4 py-1 rounded-full text-slate-600 shadow-lg" style={{ backgroundColor: "pink" }}
              onClick={() => setColor('pink')}>
              Pink
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
