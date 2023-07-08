import Gun, { IGunSchema, IGunUserInstance } from 'gun'
import 'gun/sea'

export const gunDB = new Gun({
  peers: ['https://gun-manhattan.herokuapp.com/gun'],
  localStorage: true,
})

export interface TodoItem extends IGunSchema {
  id: string
  text: string
  completed: boolean
}

export interface TodoData extends IGunSchema {
  [key: string]: TodoItem
}

export interface UserData extends IGunSchema {
  todos: TodoData
  alias: string
}

export const userDB = gunDB.user().recall({ sessionStorage: true }) as IGunUserInstance<UserData>

export const todoDB = userDB.get('todos')
