import { useLocation } from 'react-router-dom'

import { useTodoList } from '../hooks/useTodoList'
import Copyright from './Copyright'
import TodoList from './TodoList'
import TodoTextInput from './TodoTextInput'
import UnderBar from './UnderBar'

const TodoMVC = () => {
  const { todoList, onToggleAll, onClearCompleted } = useTodoList()
  const { pathname } = useLocation()

  return (
    <>
      <section className='todo-app'>
        <TodoTextInput />
        {todoList.isNotEmpty ? (
          <>
            <TodoList
              matchedRouteTodoList={todoList.getMatchedRouteTodoList(pathname)}
              onToggleAll={onToggleAll}
            />
            <UnderBar
              backlogLength={todoList.backlogLength}
              completedIsNotEmpty={todoList.completedIsNotEmpty}
              onClearCompleted={onClearCompleted}
            />
          </>
        ) : null}
      </section>
      <Copyright />
    </>
  )
}

export default TodoMVC
