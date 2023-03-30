import FilterLink from './FilterLink'

interface UnderBarProps {
  backlogLength: number
  completedIsNotEmpty: boolean
  onClearCompleted: () => void
}

const UnderBar: React.FC<UnderBarProps> = ({
  backlogLength,
  completedIsNotEmpty,
  onClearCompleted,
}) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{backlogLength}</strong>
      </span>

      <FilterLink />

      {completedIsNotEmpty && (
        <button onClick={onClearCompleted} className='clear-completed'>
          Clear completed
        </button>
      )}
    </footer>
  )
}
export default UnderBar
