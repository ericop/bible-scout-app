//  https://tinyurl.com/v9ez7jk for an example of meiosis without streams
export const MyClass = data => {
const self = data
const convenienceMethods = () => ({
    fullName: () =>  `${self.firstName} ${self.lastName}`,
    addressString: () => [self.address.address1, self.address.city].join(', ')
  });


  return Object.assign(me, convenienceMethods())
}

export const State = () => {
  let _selectedIndex = undefined
  let _selectedCopy = undefined

  const state = {
    // state
    users: [
      User({ id: 1, firstName: 'Jane',  lastName: 'Doe', address: { address1: '1 main st', city: 'london' } }),
      User({ id: 2, firstName: 'John', lastName: 'Smith', address: { address1: '2 eiffel', city: 'paris'} })
    ],
    // computed properties
    get selectedIndex() {
      return _selectedIndex
    },
    get selectedUser() {
      return _selectedIndex !== undefined ? state.users[_selectedIndex] : {}
    },
    set selectedIndex(i) {
      _selectedIndex = i
      copySelected()
    },
    get isDirty() {
      return _isDirty()
    },
    revert: () => {
      state.users[_selectedIndex] = User(JSON.parse(_selectedCopy))
    }
  }
  
  return state
  
  function copySelected() {
    _selectedCopy = JSON.stringify(state.selectedUser)
  }
  function _isDirty() {
    //debugger
    return _selectedCopy !== JSON.stringify(state.selectedUser)
  }
  
}
