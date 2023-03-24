import { atom, useAtomValue } from 'jotai'

import Copyright from './Copyright'
import NewTodoTextInput from './NewTodoInput'
import TodoList from './TodoList'
import UnderBar from './UnderBar'

const todoListAtom = atom<string[]>([])
const lengthAtom = atom((get) => get(todoListAtom).length)

const TodoMVC = () => {
  const length = useAtomValue(lengthAtom)

  return (
    <>
      <section className='todoapp'>
        <NewTodoTextInput />
        {length ? (
          <>
            <TodoList />
            <UnderBar />
          </>
        ) : null}
      </section>
      <Copyright />
    </>
  )
}

export default TodoMVC
