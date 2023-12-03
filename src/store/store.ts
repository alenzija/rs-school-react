import { configureStore } from '@reduxjs/toolkit'
import { dataFormReducer } from './data-form-slice'
import { countriesReducer } from './countries-slice'


export const store = configureStore({
  reducer: { 
    dataForm: dataFormReducer,
    countries: countriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
