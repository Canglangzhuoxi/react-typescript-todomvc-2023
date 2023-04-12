import { useState } from 'react'

interface Props {
  addTodo: (text: string) => void
}
export const useTodoTextInput = ({ addTodo }: Props) => {
  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && e.currentTarget.value.trim().length > 0) {
      addTodo(text)
      setText('')
    }
  }

  return {
    text,
    onChange,
    onKeyDown,
  }
}
