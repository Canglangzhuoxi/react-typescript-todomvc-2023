import { useEffect } from 'react'

import { useTodoTextInput } from '../hooks/useTodoTextInput'

const TodoTextInput = () => {
  const { text, onChange, onKeyDown } = useTodoTextInput()
  useEffect(() => {
    console.log(text)
  }, [text])

  return (
    <header>
      <h1>todo</h1>
      <input
        type='text'
        placeholder='What needs to be done?'
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </header>
  )
}

export default TodoTextInput
