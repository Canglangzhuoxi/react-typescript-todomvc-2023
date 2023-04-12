import { useTodoList } from '../hooks/useTodoList'
import Copyright from './Copyright'
import TodoList from './TodoList'
import TodoTextInput from './TodoTextInput'
import UnderBar from './UnderBar'

const TodoMVC = () => {
  const {
    todoList,
    matchedRouteTodoList,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    toggleAllTodos,
    clearCompletedTodos,
  } = useTodoList()

  return (
    <>
      <section>
        <TodoTextInput addTodo={addTodo} />
        {todoList.isNotEmpty ? (
          <>
            <TodoList
              {...{ matchedRouteTodoList, removeTodo, editTodo, toggleTodo, toggleAllTodos }}
            />
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
