//import {User} from './state'

// https://tinyurl.com/v9ez7jk for an example of meiosis without streams

let emptyAddress = {
  address1: '',
  city: ''
}
let emptyUser = {
  id: undefined,
  firstName: '',
  lastName: '',
  address: emptyAddress
}


export const Actions = state => ({
  setPath: (path, value) => {
    console.log('setPath', path, value)
    // using lodash
    _.set(state, path, value)
  },
  setSelected: (index) => state.selectedIndex = index,
  clear: (path) => {
    _.set(state, path, '')
  },
  save: (newUser) => state.users.push(newUser),
  // using lodash
  remove: (removeUser) => _.remove(state, removeUser),
  newUser: () => {
    let theNewUser = User(JSON.parse(JSON.stringify(emptyUser)))
    console.log('theNewUser', theNewUser)
      state.users.push(theNewUser)
      state.selectedIndex = state.users.length - 1
  },
  updateUser: () => {
    console.log('UPDATE USER')
    state.selectedIndex = state.selectedIndex
  },
  saveUser: () => {
    console.log('SAVE USER')
    state.selectedUser.id = state.users.length + 1
  },
  cancelUser: () => {
    console.log('CANCEL USER')
    state.selectedIndex = undefined
    state.users.pop()
  },
  cancelUpdate: () => {
    console.log('CANCEL Update')
    state.revert()
    state.selectedIndex = state.selectedIndex
  },
  deleteUser: () => {
    console.log('DELETE USER')
    state.users.splice(state.selectedIndex, 1)
    state.selectedIndex = undefined
  }

})