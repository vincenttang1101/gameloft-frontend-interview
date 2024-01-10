import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LOCALSTORAGE, QUESTIONS } from '@constants'
import { data } from '@data/questions.json'
import { IPayloadAddAnswer, IPayloadNextQuestion, ISurveyState } from '@typing'
import { getInitialValue } from '@utils'

const initialState: ISurveyState = {
  questions: getInitialValue(LOCALSTORAGE.KEY.QUESTIONS, data),
  step: getInitialValue(LOCALSTORAGE.KEY.STEP, 1),
  part: getInitialValue(LOCALSTORAGE.KEY.PART, 1),
  count: getInitialValue(LOCALSTORAGE.KEY.COUNT, 1),
  activedIndex: getInitialValue(LOCALSTORAGE.KEY.ACTIVED_INDEX, 0),
  maxQuestions: QUESTIONS.PART_QUESTION_LIMIT
}

export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    nextQuestion: (state, action: PayloadAction<IPayloadNextQuestion>) => {
      state.count = state.count === state.questions.length ? state.count : state.count + 1
      state.activedIndex =
        state.activedIndex === state.questions.length - 1 ? state.activedIndex : state.activedIndex + 1
      state.step = state.count <= state.questions.length ? state.step + 1 : state.step

      if (state.step > QUESTIONS.PART_QUESTION_LIMIT) {
        state.step = 1
        state.part += 1
      }

      state.questions[state.activedIndex - 1].answer = action.payload.selectedPrevQuestion

      localStorage.setItem(LOCALSTORAGE.KEY.QUESTIONS, JSON.stringify(state.questions))
      localStorage.setItem(LOCALSTORAGE.KEY.STEP, JSON.stringify(state.step))
      localStorage.setItem(LOCALSTORAGE.KEY.PART, JSON.stringify(state.part))
      localStorage.setItem(LOCALSTORAGE.KEY.COUNT, JSON.stringify(state.count))
      localStorage.setItem(LOCALSTORAGE.KEY.ACTIVED_INDEX, JSON.stringify(state.activedIndex))
    },
    prevQuestion: (state) => {
      state.part = state.step === 1 ? state.part - 1 : state.part
      state.step = state.step === 1 ? state.maxQuestions : state.step - 1
      state.activedIndex -= 1
      state.count -= 1

      localStorage.setItem(LOCALSTORAGE.KEY.STEP, JSON.stringify(state.step))
      localStorage.setItem(LOCALSTORAGE.KEY.PART, JSON.stringify(state.part))
      localStorage.setItem(LOCALSTORAGE.KEY.ACTIVED_INDEX, JSON.stringify(state.activedIndex))
      localStorage.setItem(LOCALSTORAGE.KEY.COUNT, JSON.stringify(state.count))
    },
    addAnswer: (state, action: PayloadAction<IPayloadAddAnswer>) => {
      state.questions[state.activedIndex].answer = action.payload.selectedQuestion
      localStorage.setItem(LOCALSTORAGE.KEY.QUESTIONS, JSON.stringify(state.questions))
    }
  }
})

export const { nextQuestion, prevQuestion, addAnswer } = surveySlice.actions
export default surveySlice.reducer
