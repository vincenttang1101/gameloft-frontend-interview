import { ReactNode } from 'react'

/* Layout */
export interface IChildrenProps {
  children: ReactNode
}

/* Survey */
export interface ISingleSlectionProps {
  choice: string
  setSelected: (value: string) => void
}

export interface IMultipleSelectionProps extends Pick<ISingleSlectionProps, 'choice'> {
  handleMultipleChange: (event: SelectChangeEvent<string[]>) => void
}

export interface IAmounts {
  singleSelection: number
  multipleSelection: number
  textInput: number
}

export interface IQuestion {
  id: number
  question: string
  choices?: string[]
  answer?: string | string[]
  type: string
}

export interface ISurveyState {
  questions: IQuestion[]
  step: number
  part: number
  count: number
  activedIndex: number
  maxQuestions: number
}

export enum TQuestionType {
  SingleSelection = 'singleSelection',
  MultipleSelection = 'multipleSelection',
  TextInput = 'textInput'
}

export interface IPayloadNextQuestion {
  selectedPrevQuestion: string | string[]
}

export interface IPayloadAddAnswer {
  selectedQuestion: string | string[]
}

export interface IPayloadSaveInfo {
  userInfo: {
    yourName: string
    email: string
  }
  survey: {
    questions: IQuestion[]
  }
}

/* Complete */
export interface ICompleteState {
  yourName: string
  email: string
  checkBox1: boolean
  checkBox2: boolean
}

export interface IPayloadUpdateFormValues extends ICompleteState {}
