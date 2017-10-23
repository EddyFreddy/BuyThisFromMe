const defaultState = {
  items: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_RECENT_ITEMS':
      return {
        ...state,
         items: action.items
      }
    case 'SEARCH':
      return {
        ...state,
         searchItems: action.searchItems
    }
    case 'QUERY':
      return {
        ...state,
         queries: action.queries
    }
    case 'CLEAR_SEARCH':
      return {
        ...state,
         searchItems: []
    }
    default:
      return state
  }
}

export default reducer;
