import React from 'react'
import { useLocation } from 'react-router-dom'

import { TodoListAction, TodoListType, TodoType } from '../../types'
import Item from './Item'

interface Props {
  todoList: TodoListType
  todoListDispatch: React.Dispatch<TodoListAction>
}
const TodoList: React.FC<Props> = ({ todoList, todoListDispatch }) => {
  const { pathname } = useLocation()

  function toggleAllCheckbox(e: React.ChangeEvent<HTMLInputElement>): void {
    todoListDispatch({
      type: 'TOGGLE_ALL',
      completed: e.target.checked,
    })
  }

  return (
    <section className='main'>
      <input
        id='toggle-all'
        className='toggle-all'
        type='checkbox'
        onChange={toggleAllCheckbox}
        data-cy='toggle-all-btn'
        data-testid='toggle-all-btn'
      />
      <label htmlFor='toggle-all'>Mark all as complete</label>

      <ul className='todo-list' data-testid='todo-list'>
        {todoList
          .filter((t: TodoType) => {
            switch (pathname) {
              case '/':
                return true
              case '/active':
                return t.completed === false
              case '/completed':
                return t.completed === true
              default:
                return true
            }
          })
          .map((t: TodoType) => {
            return <Item key={t.id} todo={t} todoListDispatch={todoListDispatch} />
          })}
      </ul>
    </section>
  )
}

export default TodoList
