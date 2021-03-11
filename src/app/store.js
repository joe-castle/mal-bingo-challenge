import { configureStore } from '@reduxjs/toolkit'
import activeCardReducer from './activeCardSlice'
import cardsReducer from './cardsSlice'
import titleSearchReducer from './titleSearchSlice'

export default configureStore({
  reducer: {
    cards: cardsReducer,
    activeCard: activeCardReducer,
    titleSearch: titleSearchReducer
  }
})