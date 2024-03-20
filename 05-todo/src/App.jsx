import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos(prevTodos => [{ id: Date.now(), ...todo }, ...prevTodos])
  }

  const updateTodo = (id, todo) => {
    setTodos(prevTodos => prevTodos.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(prevTodos => prevTodos.map(
      prevTodo => (prevTodo.id === id) ? {...prevTodo, isCompleted: !prevTodo.isCompleted} : prevTodo
    ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 1){
      setTodos(todos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ addTodo, deleteTodo, todos, toggleComplete, updateTodo, }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
