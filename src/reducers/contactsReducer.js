export default (state = {}, action) => {
 switch (action.type) {
  case 'LOAD_CONTACTS':
   return {
    contacts: action.payload
   }
  default:
   return state
 }
}
