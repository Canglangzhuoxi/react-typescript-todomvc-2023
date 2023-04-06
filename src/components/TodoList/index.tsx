import React from 'react'

import { TodoType } from '../../types'
import Item from './Todo'

interface TodoListProps {
  matchedRouteTodoList: TodoType[]
  toggleAllTodos: (completed: boolean) => void
}

const TodoList: React.FC<TodoListProps> = ({ matchedRouteTodoList, toggleAllTodos }) => {
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
          return <Item key={t.id} todo={t} />
        })}
      </ul>
    </section>
  )
}

export default TodoList
