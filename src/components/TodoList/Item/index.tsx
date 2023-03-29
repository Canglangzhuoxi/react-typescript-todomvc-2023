import React, { useRef, useState } from 'react'

import { TodoListAction, TodoType } from '../../../types'

interface Props {
  todo: TodoType
  todoListDispatch: React.Dispatch<TodoListAction>
}

interface State {
  onEdit: boolean
}

const Item: React.FC<Props> = ({ todo, todoListDispatch }) => {
  const init: State = { onEdit: false }
  const [state, setState] = useState(init)

  const onClick = (): void => {
    setState({ onEdit: true })
  }
  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setState({ onEdit: false })
    } else {
      todoListDispatch({
        type: 'REMOVE',
        id: todo.id,
      })
    }
  }

  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false })
      }
    }
  }
  const SwitchStyle = (t: TodoType, onEdit: boolean) => {
    switch (true) {
      case onEdit && !t.completed:
        return ''

      default:
        return ''
    }
  }

  const handleTodoTextEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    onEdit: TodoType['id'],
  ): void => {
    todoListDispatch({
      type: 'EDIT',
      id: onEdit,
      text: e.target.value,
    })
  }

  return (
    <li className={SwitchStyle(todo, state.onEdit)} data-testid='todo-item'>
      <div className='view' data-testid='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={todo.completed}
          onChange={() =>
            todoListDispatch({
              type: 'TOGGLE',
              id: todo.id,
            })
          }
        />
        <button onClick={onClick} onKeyDown={onClick}>
          {todo.text}
        </button>
        <button
          className='destory'
          onClick={() => () =>
            todoListDispatch({
              type: 'REMOVE',
              id: todo.id,
            })}
        ></button>
      </div>

      <input
        onBlur={onBlurEdit}
        className='edit'
        value={todo.text}
        onChange={(e) => handleTodoTextEdit(e, todo.id)}
        onKeyDown={submitEditText}
      />
    </li>
  )
}

export default Item
