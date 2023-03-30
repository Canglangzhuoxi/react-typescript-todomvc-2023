import { TodoListType, TodoType } from '../types'

export class TodoListModel {
  private readonly _todoList: TodoListType
  constructor(todoList: TodoListType) {
    this._todoList = todoList
  }

  get todoList() {
    return this._todoList
  }

  get isNotEmpty() {
    return this._todoList.length > 0
  }

  get completedLength() {
    return this._todoList.filter((t) => t.completed === true).length
  }

  get backlogLength() {
    return this._todoList.filter((t) => t.completed === false).length
  }

  get completedIsNotEmpty() {
    return this.completedLength > 0
  }

  getMatchedRouteTodoList(path: string) {
    return this._todoList.filter((t: TodoType) => {
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
}
