import { useTodoTextInput } from '../hooks/useTodoTextInput'

interface Props {
  addTodo: (text: string) => void
}

const TodoTextInput = ({ addTodo }: Props) => {
  const { text, onChange, onKeyDown } = useTodoTextInput({ addTodo })

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
