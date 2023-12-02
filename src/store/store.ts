import { configureStore } from '@reduxjs/toolkit'
import { dataFormReducer } from './data-form-slice'
import { countriesReducer } from './countries-slice'


export const store = configureStore({
  reducer: { 
    dataForm: dataFormReducer,
    countries: countriesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
