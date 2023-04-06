import { useState } from 'react'

import { useTodoList } from './useTodoList'

export const useTodoTextInput = () => {
  const { addTodo } = useTodoList()

  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && e.currentTarget.value.trim().length > 0) {
      addTodo(e.currentTarget.value)
      setText('')
    }
  }

  return {
    text,
    onChange,
    onKeyDown,
  }
}
