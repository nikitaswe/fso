import { createSlice } from '@reduxjs/toolkit'

let timer = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'There are no notifications',
  reducers: {
    setN(state, action) {
      clearTimeout(timer)
      const notification = action.payload
      return notification
    },
    removeN(state, action) {
      return ''
    }
  }
})

export const { setN, removeN } = notificationSlice.actions

export const setNotification = (text, seconds) => {
  return async dispatch => {
    dispatch(setN(text))
    timer = setTimeout(() => {
      dispatch(removeN())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
