import { nanoid } from 'nanoid'
import { useRef } from 'react'
import { useRecoilState } from 'recoil'

import { AppState, recoilState, Todo } from '../dataStructure'

const NewTodoTextInput = () => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const textInput: React.RefObject<HTMLInputElement> | null = useRef<HTMLInputElement>(null)
  function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (!textInput?.current) return
    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
      const todo: Todo = {
        bodyText: textInput.current.value,
        completed: false,
        id: nanoid(),
      }

      setAppState({ todoList: [todo, ...appState.todoList] })

      textInput.current.value = ''
    }
  }
  return (
    <header>
      <h1>todos</h1>
      <input
        type='text'
        className='new-todo'
        placeholder='What needs to be done?'
        ref={textInput}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
        data-testid='new-todo-input-text'
        data-cy='new-todo-input-text'
      />
    </header>
  )
}

export default NewTodoTextInput
