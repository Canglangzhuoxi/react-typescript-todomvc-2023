import { useRecoilState } from 'recoil'

import { AppState, recoilState, Todo } from '../dataStructure'
import FilterLink from './FilterLink'

const UnderBar = () => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const completed: number = appState.todoList.filter((t) => t.completed === true).length
  const backlog: number = appState.todoList.filter((t) => t.completed === false).length

  function clearCompleted(): void {
    setAppState({
      todoList: appState.todoList.filter((t: Todo) => !t.completed),
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
