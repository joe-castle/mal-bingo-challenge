import { createSlice } from "@reduxjs/toolkit"
import { get, set } from "../storage";
import { clearCard } from "../util";

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: get(),
  reducers: {
    update: (state, action) => {
      let index = state.findIndex(card => card.position == action.payload.position)

      state[index] = { ...state[index], ...action.payload }
    }
  }
})

export const { update: updateCards } = cardsSlice.actions

export const saveCards = () => (dispatch, getState) => {
  const { cards, activeCard: { position, title, id, started, finished, imgUrl, details }} = getState()
  
  const existingCard = cards.find(card => card.id == id)

  if (existingCard) {
    dispatch(updateCards(clearCard(existingCard)))
  }

  dispatch(updateCards({ position, title, id, started, finished, imgUrl, details }))

  set(getState().cards)
}

export default cardsSlice.reducer