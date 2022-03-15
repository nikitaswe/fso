import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      const filterText = action.payload
      return filterText
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
