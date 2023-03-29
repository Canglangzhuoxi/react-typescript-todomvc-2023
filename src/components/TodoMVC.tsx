import { nanoid } from 'nanoid'
import { useImmerReducer } from 'use-immer'

import { LocalStorageKeyType, TodoListAction, TodoListType } from '../types'
import Copyright from './Copyright'
import TodoList from './TodoList'
import TodoTextInput from './TodoTextInput'
import UnderBar from './UnderBar'

const todoListReducer = (draft: TodoListType, action: TodoListAction) => {
  switch (action.type) {
    case 'ADD':
      if (action.text && action.text.trim().length > 0) {
        draft.push({
          id: nanoid(),
          text: action.text,
          completed: false,
        })
      }
      break
    case 'REMOVE':
      return draft.filter((todo) => todo.id !== action.id)
    case 'EDIT': {
      const index = draft.findIndex((todo) => todo.id === action.id)
      draft[index].text = action.text
      break
    }
    case 'TOGGLE':
      const index = draft.findIndex((todo) => todo.id === action.id)
      draft[index].completed = !draft[index].completed
      break
    case 'TOGGLE_ALL':
      draft.forEach((todo) => (todo.completed = action.completed))
      break
    case 'CLEAR_COMPLETED':
      return draft.filter((t) => !t.completed)
    default:
      break
  }
}

const initialTodoList = () => {
  const stringifiedJSON: string | null = window.localStorage.getItem(LocalStorageKeyType.APP_STATE)
  if (typeof stringifiedJSON === 'string') {
    const Loaded: TodoListType = JSON.parse(stringifiedJSON)
    return Loaded
  }

  const BlankAppState: TodoListType = []
  return BlankAppState
}

const TodoMVC = () => {
  const [todoList, todoListDispatch] = useImmerReducer(todoListReducer, initialTodoList())

  return (
    <>
      <section className='todo-app'>
        <TodoTextInput todoListDispatch={todoListDispatch} />
        {todoList.length > 0 ? (
          <>
            <TodoList todoListDispatch={todoListDispatch} todoList={todoList} />
            <UnderBar todoList={todoList} todoListDispatch={todoListDispatch} />
          </>
        ) : null}
      </section>
      <Copyright />
    </>
  )
}

export default TodoMVC
