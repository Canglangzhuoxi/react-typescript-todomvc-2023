import { nanoid } from 'nanoid'
import { useEffect, useReducer } from 'react'
import { useLocation } from 'react-router-dom'

import { TodoListModel } from '../models/TodoListModel'
import { LocalStorageKeyType, TodoListAction, TodoType } from '../types'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils'

const todoListReducer = (prev: TodoListModel, action: TodoListAction) => {
  switch (action.type) {
    case 'ADD': {
      const newTodos = [
        ...prev.todos,
        {
          id: nanoid(),
          text: action.text,
          completed: false,
        },
      ]
      return new TodoListModel(newTodos)
    }
    case 'REMOVE': {
      const newTodos = prev.todos.filter((todo) => todo.id !== action.id)
      return new TodoListModel(newTodos)
    }
    case 'EDIT': {
      const newTodos = prev.todos.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, text: action.text }
        }
        return todo
      })
      return new TodoListModel(newTodos)
    }
    case 'TOGGLE': {
      const newTodos = prev.todos.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
      return new TodoListModel(newTodos)
    }
    case 'TOGGLE_ALL': {
      const newTodos = prev.todos.map((todo) => ({ ...todo, completed: action.completed }))
      return new TodoListModel(newTodos)
    }
    case 'CLEAR_COMPLETED': {
      const newTodos = prev.todos.filter((t) => !t.completed)
      return new TodoListModel(newTodos)
    }
  }
}

const initialTodoList = () => {
  const stringifiedJSON: string | null = getLocalStorage(LocalStorageKeyType.APP_STATE)
  if (typeof stringifiedJSON === 'string') {
    try {
      const todos: TodoType[] = JSON.parse(stringifiedJSON)
      return new TodoListModel(todos)
    } catch {
      console.error('Could not parse localStorage data')
    }
  }
  return new TodoListModel([])
}

export const useTodoList = () => {
  const [todoList, dispatch] = useReducer(todoListReducer, initialTodoList())
  const { pathname } = useLocation()

  const getMatchedRouteTodoList = (path: string) => {
    return todoList.todos.filter((t: TodoType) => {
      switch (path) {
        case '/':
          return true
        case '/active':
          return t.completed === false
        case '/completed':
          return t.completed === true
        default:
          return true
      }
    })
  }

  const storeTodoList = () => {
    if (todoList.isNotEmpty) {
      setLocalStorage(LocalStorageKeyType.APP_STATE, JSON.stringify(todoList.todos))
    } else {
      removeLocalStorage(LocalStorageKeyType.APP_STATE)
    }
  }

  const matchedRouteTodoList = getMatchedRouteTodoList(pathname)
  const addTodo = (text: TodoType['text']) => dispatch({ type: 'ADD', text })
  const removeTodo = (id: TodoType['id']) => dispatch({ type: 'REMOVE', id })
  const editTodo = (id: TodoType['id'], text: TodoType['text']) =>
    dispatch({ type: 'EDIT', id, text })
  const toggleTodo = (id: TodoType['id']) => dispatch({ type: 'TOGGLE', id })
  const toggleAllTodos = (completed: TodoType['completed']) =>
    dispatch({ type: 'TOGGLE_ALL', completed })
  const clearCompletedTodos = () => dispatch({ type: 'CLEAR_COMPLETED' })

  useEffect(() => {
    storeTodoList()
  }, [todoList])

  return {
    todoList,
    matchedRouteTodoList,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    toggleAllTodos,
    clearCompletedTodos,
  }
}
