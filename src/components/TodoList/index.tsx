import React from 'react'

import { TodoType } from '../../types'
import Item from './Todo'

interface TodoListProps {
  matchedRouteTodoList: TodoType[]
  toggleAllTodos: (completed: TodoType['completed']) => void
  toggleTodo: (id: TodoType['id']) => void
  removeTodo: (id: TodoType['id']) => void
  editTodo: (id: TodoType['id'], text: TodoType['text']) => void
}

const TodoList: React.FC<TodoListProps> = ({
  matchedRouteTodoList,
  toggleTodo,
  removeTodo,
  editTodo,
  toggleAllTodos,
}) => {
  return (
    <section className='main'>
      <input
        id='toggle-all'
        className='toggle-all'
        type='checkbox'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleAllTodos(e.target.checked)}
      />
      <label htmlFor='toggle-all'>Mark all as complete</label>

      <ul className='todo-list'>
        {matchedRouteTodoList.map((t: TodoType) => {
          return <Item key={t.id} todo={t} {...{ toggleTodo, removeTodo, editTodo }} />
        })}
      </ul>
    </section>
  )
}

export default TodoList
