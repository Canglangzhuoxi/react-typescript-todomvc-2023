import { useRecoilValue } from 'recoil'

import Copyright from './Copyright'
import { AppState, recoilState } from './dataStructure'
import NewTodoTextInput from './NewTodoInput'
import TodoList from './TodoList'
import UnderBar from './UnderBar'

const TodoMVC = () => {
  const appState = useRecoilValue<AppState>(recoilState)
  return (
    <>
      <section className='todoapp'>
        <NewTodoTextInput />
        {appState.todoList.length ? (
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
