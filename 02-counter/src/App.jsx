import { useState } from 'react'

function App() {

  const [count, setCount] = useState(0)
  

  return (

    <div className='w-full h-screen bg-gray-700 flex justify-center items-center'>
      <div className="bg-gray-800 rounded-lg p-5 text-slate-200 flex flex-col justify-center items-center">
        <span className="text-7xl mb-10">{count}</span>
        <div className="flex justify-center gap-3 bg-slate-500 p-2 rounded-xl">

          <button
            className="outline-none hover:bg-green-800 px-3 py-1 bg-green-700 rounded-full text-white shadow-lg"
            onClick={() => setCount(prevCount => prevCount + 1)}>
            Increment
          </button>

          <button
            className="outline-none px-3 py-1 hover:bg-red-700 bg-red-600 rounded-full text-white shadow-lg"
            onClick={() => setCount(prevCount => prevCount - 1)}>
            Decrement
          </button>

          <button
            className="outline-none px-3 py-1 hover:bg-yellow-700 bg-yellow-600 rounded-full text-white shadow-lg"
            onClick={() => setCount(0)}>
            Reset
          </button>

        </div>
      </div>
    </div>

  )
}

export default App
