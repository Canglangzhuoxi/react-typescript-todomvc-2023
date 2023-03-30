import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import { useCallback, useReducer } from 'react'

import { TodoListModel } from '../models/TodoListModal'
import { LocalStorageKeyType, TodoListAction, TodoListType, TodoType } from '../types'

const todoListReducer = (prev: TodoListModel, action: TodoListAction) => {
  let newTodoList = cloneDeep(prev.todoList)

  switch (action.type) {
    case 'ADD': {
      newTodoList.push({
        id: nanoid(),
        text: action.text,
        completed: false,
      })
      break
    }
    case 'REMOVE':
      newTodoList = newTodoList.filter((todo) => todo.id !== action.id)
      break
    case 'EDIT': {
      const index = newTodoList.findIndex((todo) => todo.id === action.id)
      newTodoList[index].text = action.text
      break
    }
    case 'TOGGLE': {
      const index = newTodoList.findIndex((todo) => todo.id === action.id)
      newTodoList[index].completed = !prev.todoList[index].completed
      break
    }
    case 'TOGGLE_ALL': {
      newTodoList.forEach((todo) => (todo.completed = action.completed))
      break
    }
    case 'CLEAR_COMPLETED': {
      newTodoList = newTodoList.filter((t) => !t.completed)
      break
    }
  }

  return new TodoListModel(newTodoList)
}

const convertTodoList = (todoList: TodoListType) => new TodoListModel(todoList)

const initialTodoList = () => {
  const stringifiedJSON: string | null = window.localStorage.getItem(LocalStorageKeyType.APP_STATE)
  if (typeof stringifiedJSON === 'string') {
    const Loaded: TodoListType = JSON.parse(stringifiedJSON)
    return convertTodoList(Loaded)
  }

  const BlankAppState: TodoListType = []
  return convertTodoList(BlankAppState)
}

export const useTodoList = () => {
  const [todoList, todoListDispatch] = useReducer(todoListReducer, initialTodoList())

  const onAdd = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    todoListDispatch({
      type: 'ADD',
      text: e.currentTarget.value,
    })
  }, [])
  const onRemove = useCallback((id: TodoType['id']) => {
    todoListDispatch({
      type: 'REMOVE',
      id: id,
    })
  }, [])
  const onEdit = useCallback((id: TodoType['id'], text: TodoType['text']) => {
    todoListDispatch({
      type: 'EDIT',
      id: id,
      text: text,
    })
  }, [])
  const onToggle = useCallback((id: TodoType['id']) => {
    todoListDispatch({
      type: 'TOGGLE',
      id: id,
    })
  }, [])
  const onToggleAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    todoListDispatch({
      type: 'TOGGLE_ALL',
      completed: e.target.checked,
    })
  }, [])
  const onClearCompleted = useCallback(() => {
    todoListDispatch({
      type: 'CLEAR_COMPLETED',
    })
  }, [])

  return {
    todoList,
    onAdd,
    onRemove,
    onEdit,
    onToggle,
    onToggleAll,
    onClearCompleted,
  }
}
