import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { LOCALSTORAGE, QUESTIONS } from '@constants'
import { addAnswer, nextQuestion, prevQuestion } from '@features/Survey/surveySlice'
import { useAppSelector, useAppDispatch } from '@redux/hook'
import './styles.css'

export const Survey = () => {
  const [selectSingle, setSelectSingle] = useState<string>('')
  const [selectMultiple, setSelectMultiple] = useState<string[]>([])
  const [textInput, setTextInput] = useState<string>('')

  const { questions, step, activedIndex, part, maxQuestions, count } = useAppSelector((state) => state.survey)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const questionType = questions[activedIndex].type

  const handleNextQuestion = () => {
    if (count === questions.length) {
      localStorage.setItem(LOCALSTORAGE.KEY.AUTH_ROUTE, LOCALSTORAGE.VALUE.COMPLETE)
      navigate('/complete')
      return
    }

    switch (questionType) {
      case QUESTIONS.SINGLE_SELECTION:
        setSelectSingle('')
        dispatch(
          nextQuestion({
            selectedPrevQuestion: selectSingle
          })
        )
        break
      case QUESTIONS.MULTIPLE_SELECTION:
        setSelectMultiple([])
        dispatch(
          nextQuestion({
            selectedPrevQuestion: selectMultiple
          })
        )
        break
      case QUESTIONS.TEXT_INPUT:
        setTextInput('')
        dispatch(
          nextQuestion({
            selectedPrevQuestion: textInput
          })
        )
        break
    }
  }

  const handlePrevQuestion = () => {
    switch (questionType) {
      case QUESTIONS.SINGLE_SELECTION:
        dispatch(prevQuestion())
        break
      case QUESTIONS.MULTIPLE_SELECTION:
        dispatch(prevQuestion())
        break
      case QUESTIONS.TEXT_INPUT:
        dispatch(prevQuestion())
        break
      default:
        break
    }
  }

  const handleSingleChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement
    setSelectSingle(target.value)
  }
  const handleMultipleChange = (event: SelectChangeEvent<string[]>) => {
    const target = event.target as HTMLSelectElement & { value: string[] }
    const value = target.value

    if (count === questions.length) {
      dispatch(
        addAnswer({
          selectedQuestion: value
        })
      )
    }
    setSelectMultiple(value)
  }

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement
    const value = target.value

    if (count === questions.length) {
      dispatch(
        addAnswer({
          selectedQuestion: value
        })
      )
    }
    setTextInput(value)
  }

  useEffect(() => {
    switch (questionType) {
      case QUESTIONS.SINGLE_SELECTION:
        setSelectSingle(questions[activedIndex].answer as string)
        break
      case QUESTIONS.MULTIPLE_SELECTION:
        if (questions[activedIndex].answer) setSelectMultiple(questions[activedIndex].answer as string[])
        break
      case QUESTIONS.TEXT_INPUT:
        setTextInput(questions[activedIndex].answer as string)
        break
      default:
        break
    }
  }, [activedIndex, questionType, questions])

  return (
    <section className='survey'>
      <Box className='main-content' sx={{ width: 'var(--survey-container)' }}>
        {/* Border Container */}
        <Box className='border-container' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '500px', maxWidth: '100%' }}>
            {/* Info */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  visibility: count > 1 ? 'visible' : 'hidden',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeftIcon onClick={handlePrevQuestion} />
                <Typography component='span'>{count > 1 && 'Back'}</Typography>
              </Typography>

              <Typography
                sx={{
                  padding: '8px 14px',
                  border: '1px solid var(--fourth-color)',
                  borderRadius: '3px',
                  fontSize: '0.9rem'
                }}
              >
                <Typography component='span' sx={{ fontWeight: '700' }}>
                  [Part {part}] {step.toString().padStart(2, '0')}
                </Typography>
                /{maxQuestions}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px', padding: '0 20px' }}>
              {/* Title */}
              <Typography
                component='h1'
                sx={{
                  width: '450px',
                  maxWidth: '100%',
                  fontSize: 'var(--font-size-heading)',
                  fontWeight: 'var(--font-weight-heading)',
                  color: 'var(--primary-color)',
                  textAlign: 'center'
                }}
              >
                {questions[activedIndex].question}
              </Typography>

              {/* Content - Single Selection */}
              {questionType === QUESTIONS.SINGLE_SELECTION && (
                <RadioGroup sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {questions[activedIndex].choices?.map((choice, index) => (
                    <FormControlLabel
                      control={
                        <Radio
                          sx={{ color: selectSingle === choice ? 'var(--primary-color)' : 'var(--fourth-color)' }}
                        />
                      }
                      label={choice}
                      checked={selectSingle === choice}
                      key={index}
                      value={choice}
                      onChange={handleSingleChange}
                      sx={{
                        margin: '0',
                        borderRadius: '4px',
                        color: selectSingle === choice ? 'var(--primary-color)' : 'var(--fifth-color)',
                        border:
                          selectSingle === choice ? '2px solid var(--primary-color)' : '2px solid var(--fourth-color)'
                      }}
                    />
                  ))}
                </RadioGroup>
              )}

              {/* Content - Multiple Selection */}
              {questionType === QUESTIONS.MULTIPLE_SELECTION && (
                <FormControl>
                  <InputLabel>Select Multiple Language</InputLabel>
                  <Select
                    multiple
                    value={selectMultiple}
                    onChange={handleMultipleChange}
                    input={<OutlinedInput label='Select Multiple Language' />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {questions[activedIndex].choices?.map((choice, index) => (
                      <MenuItem key={index} value={choice}>
                        <Checkbox checked={selectMultiple.includes(choice)} />
                        <ListItemText primary={choice} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Content - Text Input*/}
              {questionType === QUESTIONS.TEXT_INPUT && (
                <Box>
                  <TextField
                    value={textInput}
                    multiline
                    rows={8}
                    placeholder='Enter...'
                    onChange={handleTextInputChange}
                    sx={{ width: '100%' }}
                  />
                </Box>
              )}

              {/* Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant='outlined'
                  sx={{
                    width: '35%',
                    padding: '7px 10px',
                    fontWeight: '700',
                    textTransform: 'none',
                    border: '2px solid var(--primary-color)',
                    color: 'var(--secondary-color)',
                    background: 'var(--primary-color)',
                    '&:hover': {
                      background: 'var(--third-color)'
                    },
                    '&:disabled': {
                      background: 'var(--secondary-color)'
                    }
                  }}
                  disabled={!selectSingle && selectMultiple.length === 0 && !textInput}
                  onClick={handleNextQuestion}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  )
}
