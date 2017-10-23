export const addRecentItems = (items) => ({
  type: 'ADD_RECENT_ITEMS',
  items: items
});

export const search = (searchItems) => ({
  type: 'SEARCH',
  searchItems: searchItems
});

export const query = (queries) => ({
  type: 'QUERY',
  queries: queries
});

export const clearSearch = () => ({
  type: 'CLEAR_SEARCH',
  payload: {}
})
