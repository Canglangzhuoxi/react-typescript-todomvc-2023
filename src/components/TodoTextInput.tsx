import { useTodoTextInput } from '../hooks/useTodoTextInput'

const TodoTextInput = () => {
  const { text, onChange, onKeyDown } = useTodoTextInput()

  return (
    <header>
      <h1>todo</h1>
      <input
        type='text'
        className='new-todo'
        placeholder='What needs to be done?'
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </header>
  )
}

export default TodoTextInput
