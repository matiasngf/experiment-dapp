/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useCallback, useEffect, useMemo, useState } from "react";
import { TodoData, todoDB } from "../db";

const getRandomId = () => Math.random().toString(36).substr(2, 9)

export const Todo = () => {

  const [todos, setTodos] = useState<TodoData>({})

  const todosArr = useMemo(() => Object.values(todos), [todos]);

  useEffect(() => {
    todoDB.map().on((todoData, todoId) => {
      if(!todoData) {
        setTodos((prev) => {
          const copy = { ...prev }
          delete copy[todoId];
          return copy;
        })
        return 
      }
      setTodos((prev) => {
        const copy = { ...prev }
        copy[todoId] = todoData;
        return copy;
      })
    })
  }, [])

  const addNewTodo = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    if(!todoDB) return;
    e.preventDefault()
    const id = getRandomId()
    const text = (e.currentTarget.elements as any).text.value
    todoDB.get(id).put({
      id,
      text,
      completed: false
    })
    e.currentTarget.reset()
  }, [])

  const toggleCompleted = useCallback((id: string) => {
    todoDB.get(id).put({
      completed: !todos[id].completed
    })
  }, [todos])

  const deleteTodo = useCallback((id: string) => {
    if(!todoDB) return;
    todoDB.get(id).put(null as any)
  }, [])

  return (
    <div className="border rounded-lg border-gray-400 p-8">
      {todosArr.map(todo => (
        <div key={todo.id} className="flex space-x-4">
          <div>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo.id)} />
          </div>
          <div className="grow">{todo.text}</div>
          <button onClick={() => deleteTodo(todo.id)} className="w-6 rounded-full aspect-square border border-gray-400 cursor-pointer">X</button>
        </div>
      ))}
      <div>
        <form onSubmit={addNewTodo}>
          <input name="text" className="w-full border border-gray-300 rounded-md p-2" type="text" placeholder="Add new todo" />
        </form>
      </div>
    </div>
  )
}