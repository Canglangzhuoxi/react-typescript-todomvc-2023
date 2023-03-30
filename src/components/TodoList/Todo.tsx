import React from 'react'

import { useTodo } from '../../hooks/useTodo'
import { TodoType } from '../../types'

interface Props {
  todo: TodoType
}

const Todo: React.FC<Props> = ({ todo }) => {
  const { onCheckBoxChange, onFocusClick, onRemoveClick, onEditBlur, onEditChange, onEditKeyDown } =
    useTodo(todo.id)

  return (
    <li>
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={todo.completed}
          onChange={onCheckBoxChange}
        />
        <button onClick={onFocusClick} onKeyDown={onFocusClick}>
          {todo.text}
        </button>
        <button className='remove' onClick={onRemoveClick}></button>
      </div>

      <input
        onBlur={onEditBlur}
        className='edit'
        value={todo.text}
        onChange={onEditChange}
        onKeyDown={onEditKeyDown}
      />
    </li>
  )
}

export default Todo
