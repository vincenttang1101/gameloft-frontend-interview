import { saveAs } from 'file-saver'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICompleteState, IPayloadSaveInfo, IPayloadUpdateFormValues } from '@typing'

const initialState: ICompleteState = {
  yourName: '',
  email: '',
  checkBox1: false,
  checkBox2: false
}

export const completeSlice = createSlice({
  name: 'complete',
  initialState,
  reducers: {
    updateFormValues: (state, action: PayloadAction<IPayloadUpdateFormValues>) => ({
      ...state,
      ...action.payload
    }),
    saveInfo: (_state, action: PayloadAction<IPayloadSaveInfo>) => {
      const data = action.payload
      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json'
      })
      saveAs(blob, 'completed.json')
    }
  }
})

export const { updateFormValues, saveInfo } = completeSlice.actions
export default completeSlice.reducer
