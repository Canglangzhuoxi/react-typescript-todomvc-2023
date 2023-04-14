import { useState } from 'react'

import { TodoType } from '../types'
interface Props {
  id: TodoType['id']
  toggleTodo: (id: TodoType['id']) => void
  removeTodo: (id: TodoType['id']) => void
  editTodo: (id: TodoType['id'], text: TodoType['text']) => void
}
interface State {
  isEditing: boolean
}

export const useTodo = ({ id, toggleTodo, removeTodo, editTodo }: Props) => {
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
