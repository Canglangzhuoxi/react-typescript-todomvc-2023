import { TodoType } from '../types'

interface TodoListType {
  todos: TodoType[]
  isNotEmpty: boolean
  completedLength: number
  backlogLength: number
  completedIsNotEmpty: boolean
}

export class TodoListModel implements TodoListType {
  private _todos: TodoType[]

  constructor(todos: TodoType[]) {
    this._todos = todos
  }

  get todos() {
    return this._todos
  }

  get isNotEmpty() {
    return this.todos.length > 0
  }

  get completedLength() {
    return this.todos.filter((t) => t.completed === true).length
  }

  get backlogLength() {
    return this.todos.filter((t) => t.completed === false).length
  }

  get completedIsNotEmpty() {
    return this.completedLength > 0
  }
}
