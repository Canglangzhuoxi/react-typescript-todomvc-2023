import React, { useCallback, useState } from 'react'

import { TodoListAction } from '../types'

interface Props {
  todoListDispatch: React.Dispatch<TodoListAction>
}
const TodoTextInput: React.FC<Props> = ({ todoListDispatch }) => {
  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const onAddTodo = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && e.currentTarget.value.trim().length > 0) {
      todoListDispatch({
        type: 'ADD',
        text: e.currentTarget.value,
      })
      setText('')
    }
  }, [])

  return (
    <header>
      <h1>todo</h1>
      <input
        type='text'
        className='new-todo'
        placeholder='What needs to be done?'
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onAddTodo(e)}
      />
    </header>
  )
}

export default TodoTextInput
