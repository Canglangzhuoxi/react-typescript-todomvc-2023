import { useEffect } from 'react'

import { useTodoList } from '../hooks/useTodoList'
import Copyright from './Copyright'
import TodoList from './TodoList'
import TodoTextInput from './TodoTextInput'
import UnderBar from './UnderBar'

const TodoMVC = () => {
  const { todoList, toggleAllTodos, clearCompletedTodos, matchedRouteTodoList } = useTodoList()

  useEffect(() => {
    console.log(todoList)
  }, [todoList])

  return (
    <>
      <section>
        <TodoTextInput />
        {todoList.isNotEmpty ? (
          <>
            <TodoList matchedRouteTodoList={matchedRouteTodoList} toggleAllTodos={toggleAllTodos} />
            <UnderBar
              backlogLength={todoList.backlogLength}
              completedIsNotEmpty={todoList.completedIsNotEmpty}
              clearCompletedTodos={clearCompletedTodos}
            />
          </>
        ) : null}
      </section>
      <Copyright />
    </>
  )
}

export default TodoMVC
