import { configureStore } from '@reduxjs/toolkit'
import surveyReducer from '@features/Survey/surveySlice'
import completeReducer from '@features/Complete/completeSlice'

export const store = configureStore({
  reducer: {
    survey: surveyReducer,
    complete: completeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
