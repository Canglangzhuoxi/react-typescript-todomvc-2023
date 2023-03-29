import { TodoListAction, TodoListType } from '../../types'
import FilterLink from './FilterLink'

interface Props {
  todoList: TodoListType
  todoListDispatch: React.Dispatch<TodoListAction>
}
const UnderBar: React.FC<Props> = ({ todoList, todoListDispatch }) => {
  const completed: number = todoList.filter((t) => t.completed === true).length
  const backlog: number = todoList.filter((t) => t.completed === false).length

  function clearCompleted(): void {
    todoListDispatch({
      type: 'CLEAR_COMPLETED',
    })
  }

  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{backlog}</strong>
      </span>
      <FilterLink />

      {completed > 0 && (
        <button onClick={clearCompleted} className='clear-completed'>
          Clear completed
        </button>
      )}
    </footer>
  )
}
export default UnderBar
