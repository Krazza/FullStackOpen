export const setFilter = (filter) => {
    return {
      type: "SET_FILTER",
      payload: filter
    }
  }

export const filterReducer = (state = "", action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return state = action.payload;
      default:
        return state
    }
}

