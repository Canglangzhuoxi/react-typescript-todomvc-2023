import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { AppState, recoilState, Todo, TodoListType } from '../../dataStructure'

interface Props {
  todo: Todo
}

interface State {
  onEdit: boolean
}

const Item: React.FC<Props> = ({ todo }) => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const editInput = useRef<HTMLInputElement>(null)
  const init: State = { onEdit: false }
  const [state, setState] = useState(init)

  const onClick = (): void => {
    setState({ onEdit: true })
  }
  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setState({ onEdit: false })
    } else {
      removeItem(todo.id)
    }
  }

  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false })
      }
    }
  }
  const SwitchStyle = (t: Todo, onEdit: boolean) => {
    switch (true) {
      case onEdit && !t.completed:
        return ''
        break

      default:
        return ''
        break
    }
  }

  const reverseCompleted = (id: Todo['id']) => {
    const toggled: TodoListType = appState.todoList.map((t) => {
      if (t.id === id) {
        return { ...t, completed: !t.completed }
      } else {
        return t
      }
    })
    setAppState({ todoList: toggled })
  }
  const removeItem = (terminate: Todo['id']) => {
    const removed: TodoListType = appState.todoList.filter((t: Todo) => t.id !== terminate)

    setAppState({ todoList: removed })
  }
  const handleTodoTextEdit = (e: React.ChangeEvent<HTMLInputElement>, onEdit: Todo['id']): void => {
    const edited = appState.todoList.map((t: Todo): Todo => {
      if (t.id === onEdit) {
        return { ...t, bodyText: e.target.value }
      } else {
        return t
      }
    })
    setAppState({ todoList: edited })
  }

  return (
    <li className={SwitchStyle(todo, state.onEdit)} data-testid='todo-item'>
      <div className='view' data-testid='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={todo.completed}
          onChange={() => reverseCompleted(todo.id)}
        />
        <button onClick={onClick} onKeyDown={onClick}>
          {todo.bodyText}
        </button>
        <button className='destory' onClick={() => removeItem(todo.id)}></button>
      </div>
      <input
        ref={editInput}
        onBlur={onBlurEdit}
        className='edit'
        value={todo.bodyText}
        onChange={(e) => handleTodoTextEdit(e, todo.id)}
        onKeyDown={submitEditText}
      />
    </li>
  )
}

export default Item
