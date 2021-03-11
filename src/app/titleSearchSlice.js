import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { clearCard, throttle } from "../util"

export const fetchTitles = createAsyncThunk(
  'titleSearch/fetchTitlesStatus',
  (title) => fetch(`http://localhost:3001/anime/search/${title}`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText)
      }

      return res.json()
    })
)

export const titleSearchSlice = createSlice({
  name: 'titleSearch',
  initialState: [],
  reducers: {
    reset: () => []
  },
  extraReducers: (builder) => builder
    .addCase(fetchTitles.fulfilled, (state, action) => action.payload.results)
    .addDefaultCase((state) => state)
})

export const { reset: resetTitleSearch } = titleSearchSlice.actions

export const throttleAndFetchTitles = (title) => (dispatch) => {
  throttle(500, () => title && dispatch(fetchTitles(title)))
}

export default titleSearchSlice.reducer