export interface TodoType {
  id: string
  text: string
  completed: boolean
}

export type TodoListType = TodoType[]

export enum LocalStorageKeyType {
  APP_STATE = 'APP_STATE',
}

export type TodoListAction =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'EDIT'; id: string; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'TOGGLE_ALL'; completed: boolean }
  | { type: 'CLEAR_COMPLETED' }
