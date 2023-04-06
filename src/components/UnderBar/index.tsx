import FilterLink from './FilterLink'

interface UnderBarProps {
  backlogLength: number
  completedIsNotEmpty: boolean
  clearCompletedTodos: () => void
}

const UnderBar: React.FC<UnderBarProps> = ({
  backlogLength,
  completedIsNotEmpty,
  clearCompletedTodos,
}) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{backlogLength}</strong>
      </span>

      <FilterLink />

      {completedIsNotEmpty && (
        <button onClick={clearCompletedTodos} className='clear-completed'>
          Clear completed
        </button>
      )}
    </footer>
  )
}
export default UnderBar
