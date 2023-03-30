import React from 'react'

import { TodoListType, TodoType } from '../../types'
import Item from './Todo'

interface TodoListProps {
  matchedRouteTodoList: TodoListType
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TodoList: React.FC<TodoListProps> = ({ matchedRouteTodoList, onToggleAll }) => {
  return (
    <section className='main'>
      <input id='toggle-all' className='toggle-all' type='checkbox' onChange={onToggleAll} />
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
