import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { clearCard, throttle } from "../util"
import { fetchTitles } from "./titleSearchSlice"

export const fetchAnime = createAsyncThunk(
  'activeCard/fetchAnimeStatus',
  (id) => fetch(`http://localhost:3001/anime/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText)
      }

      return res.json()
    })
)

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState: {},
  reducers: {
    init: (state, { payload }) => ({ ...payload }),
    update: (state, { payload }) => ({ ...state, ...payload }),
    clear: (state) => clearCard(state),
    updateDetails: (state, { payload }) => { state.details[payload.key] = payload.value }
  },
  extraReducers: (builder) => builder
    .addCase(fetchAnime.fulfilled, (state, action) => {
      state.loading = false
      state.loadingSuccess = true
      
      state.id = action.payload.mal_id
      state.title = action.payload.title
      state.imgUrl = action.payload.image_url
    })
    .addCase(fetchTitles.fulfilled, (state) => {
      state.loading = false
    })
    .addMatcher((action) => action.type.endsWith('pending'), (state) => {
      state.loading = true
      state.loadingSuccess = false
      state.loadingFailed = false
    })
    .addMatcher((action) => action.type.endsWith('rejected'), (state) => {
      state.loading = false
      state.loadingSuccess = false
      state.loadingFailed = true

      state.title = ''
      state.imgUrl = ''
    })
    .addDefaultCase((state) => state)
})

export const { init, update: updateActiveCard, clear: clearActiveCard, updateDetails } = activeCardSlice.actions

export const createActiveCard = (position) => (dispatch, getState) => {
  dispatch(init(getState().cards.find(card => card.position === parseInt(position))))
}

export const updateCardPosition = (position) => (dispatch, getState) => {
  const { title, id, started, finished, imgUrl } = getState().activeCard

  dispatch(createActiveCard(position))
  dispatch(updateActiveCard({ title, id, started, finished, imgUrl }))
}

export const updateIdAndFetchAnime = (id) => (dispatch) => {
  dispatch(updateActiveCard({ id }))
  throttle(500, () => id && dispatch(fetchAnime(id)))
}

export default activeCardSlice.reducer