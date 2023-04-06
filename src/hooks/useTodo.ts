import { useState } from 'react'

import { TodoType } from '../types'
import { useTodoList } from './useTodoList'

interface State {
  isEditing: boolean
}

export const useTodo = (id: TodoType['id']) => {
  const { removeTodo, editTodo, toggleTodo } = useTodoList()
  const init: State = { isEditing: false }
  const [isEditing, setIsEditing] = useState(init)

  const onCheckBoxChange = () => {
    toggleTodo(id)
  }
  const onFocusClick = () => {
    setIsEditing({ isEditing: true })
  }
  const onRemoveClick = () => {
    removeTodo(id)
  }
  const onEditBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim().length > 0) {
      setIsEditing({ isEditing: false })
    } else {
      removeTodo(id)
    }
  }
  const onEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editTodo(id, e.target.value)
  }
  const onEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (e.currentTarget.value.trim().length > 0) {
        setIsEditing({ isEditing: false })
      }
    }
  }

  return {
    isEditing,
    onCheckBoxChange,
    onFocusClick,
    onRemoveClick,
    onEditBlur,
    onEditChange,
    onEditKeyDown,
  }
}
