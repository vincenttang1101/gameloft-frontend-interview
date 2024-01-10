import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, Checkbox, Divider, FormControlLabel, TextField, Typography } from '@mui/material'
import { FiberManualRecord } from '@mui/icons-material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { LOCALSTORAGE } from '@constants'
import { updateFormValues, saveInfo } from '@features/Complete/completeSlice'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { clearLocalData } from '@utils'
import './styles.css'

export const Complete = () => {
  const { questions } = useAppSelector((state) => state.survey)
  const formValues = useAppSelector((state) => state.complete)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      yourName: '',
      email: '',
      checkBox1: false,
      checkBox2: false
    },
    validationSchema: Yup.object({
      yourName: Yup.string()
        .required('Your Name is required')
        .matches(/^[a-zA-Z ]*$/, "Your Name doesn't have any number"),
      email: Yup.string().required('Email is required').email('Invalid email address'),
      checkBox1: Yup.boolean().oneOf([true], 'Box is required'),
      checkBox2: Yup.boolean().oneOf([true], 'Box is required')
    }),
    onSubmit: (values) => {
      dispatch(
        saveInfo({
          userInfo: {
            yourName: values.yourName,
            email: values.email
          },
          survey: {
            questions
          }
        })
      )
      localStorage.setItem(LOCALSTORAGE.KEY.AUTH_ROUTE, LOCALSTORAGE.VALUE.THANK_YOU)

      clearLocalData()
      navigate('/thank-you')
    }
  })

  const handleFormValues = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element> | React.SyntheticEvent<Element, Event>
  ) => {
    const target = event.target as HTMLInputElement

    if (target.type === 'checkbox') {
      formik.setFieldValue(target.name, target.checked)
      dispatch(
        updateFormValues({
          ...formik.values,
          [target.name]: target.checked
        })
      )
    } else dispatch(updateFormValues(formik.values))
  }

  useEffect(() => {
    formik.setValues(formValues)
  }, [])

  return (
    <section className='complete'>
      <Box className='main-content' sx={{ width: 'var(--complete-container)' }}>
        <Box
          className='border-container'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            {/* Width Container: 500px */}
            <Box
              className='content-wrap'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
                width: '500px',
                maxWidth: '100%',
                fontSize: '0.9rem'
              }}
            >
              {/* Head */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Typography
                  component='h1'
                  sx={{
                    fontSize: 'var(--font-size-heading)',
                    fontWeight: 'var(--font-weight-heading)',
                    textAlign: 'center',
                    color: 'var(--third-color)'
                  }}
                >
                  Thank you for taking the time to complete our survey. Your help is very munch appreciated.
                </Typography>
                <Typography sx={{ marginTop: '20px', fontSize: '0.9rem' }}>
                  If you have any questions or concerns, please email the lead researchers:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '28px', fontSize: '0.9rem' }}>
                  <FiberManualRecord sx={{ fontSize: '0.5rem' }} />
                  <Typography sx={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Research Group</Typography>
                  <Typography component='span' sx={{ color: 'var(--primary-color)' }}>
                    (research@gameloft.com)
                  </Typography>
                </Box>
              </Box>

              {/* Separate */}
              <Divider sx={{ width: '100%', borderBottomWidth: 2 }} />

              {/* Body */}
              <Box sx={{ padding: '0 23px' }}>
                {/* Description */}
                <Box>
                  <Typography
                    component='h2'
                    sx={{ fontSize: '1.3rem', fontWeight: 'var(--font-weight-heading)', textAlign: 'center' }}
                  >
                    Interested in a summary of the survey?
                  </Typography>
                  <Typography sx={{ marginTop: '20px', fontSize: '0.9rem' }}>
                    If you would like to receive a summary of the survey findings OR if you are happy to be contracted
                    by Gameloft about future research, please provide your details below and tick the relevant box/es.
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    If you change your mind, you can always opt-out at a later date.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '25px' }}>
                  {/* Input 1*/}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <PersonIcon />
                      <Typography
                        component='span'
                        sx={{ fontSize: '0.8rem', fontWeight: '700', lineHeight: '0.5', color: 'var(--primary-color)' }}
                      >
                        YOUR NAME:
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      variant='outlined'
                      size='small'
                      name='yourName'
                      value={formik.values.yourName}
                      onChange={formik.handleChange}
                      onBlur={handleFormValues}
                      sx={{ marginTop: '8px' }}
                    />
                    {formik.touched.yourName && formik.errors.yourName && (
                      <Typography sx={{ color: 'red' }}>{formik.errors.yourName}</Typography>
                    )}
                  </Box>

                  {/* Input 2*/}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <EmailIcon
                        sx={{
                          fontSize: '15px'
                        }}
                      />
                      <Typography
                        component='span'
                        sx={{ fontSize: '0.8rem', fontWeight: '700', lineHeight: '0.5', color: 'var(--primary-color)' }}
                      >
                        EMAIL:
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      variant='outlined'
                      size='small'
                      name='email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={handleFormValues}
                      sx={{ marginTop: '8px' }}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <Typography sx={{ color: 'red' }}>{formik.errors.email}</Typography>
                    )}
                  </Box>

                  {/* Checkbox */}
                  <Box>
                    {/* Checkbox 1 */}
                    <FormControlLabel
                      control={<Checkbox sx={{ color: 'var(--primary-color)' }} />}
                      label={
                        <Typography sx={{ fontSize: '0.95rem' }}>
                          I agree to receive a summary of the survey findings.
                        </Typography>
                      }
                      name='checkBox1'
                      value={formik.values.checkBox1}
                      checked={formik.values.checkBox1}
                      onChange={handleFormValues}
                    />
                    {formik.touched.checkBox1 && formik.errors.checkBox1 && (
                      <Typography sx={{ color: 'red' }}>{formik.errors.checkBox1}</Typography>
                    )}

                    {/* Checkbox 2 */}
                    <FormControlLabel
                      control={<Checkbox sx={{ color: 'var(--primary-color)' }} />}
                      label={
                        <Typography sx={{ fontSize: '0.95rem' }}>
                          I agree to be contracted by Gameloft about future research.
                        </Typography>
                      }
                      name='checkBox2'
                      value={formik.values.checkBox2}
                      checked={formik.values.checkBox2}
                      onChange={handleFormValues}
                    />
                    {formik.touched.checkBox2 && formik.errors.checkBox2 && (
                      <Typography sx={{ color: 'red' }}>{formik.errors.checkBox2}</Typography>
                    )}
                  </Box>

                  {/* Text */}
                  <Typography sx={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                    <Typography component='span' sx={{ fontWeight: '700' }}>
                      Please note:{' '}
                    </Typography>{' '}
                    your name and email address will not be linked with your survey answers.
                  </Typography>

                  {/* CTA Group */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '42px' }}>
                    <Button
                      variant='outlined'
                      sx={{
                        width: '38%',
                        border: '2px solid var(--primary-color)',
                        fontWeight: '700',
                        textTransform: 'none',
                        color: 'var(--primary-color)',
                        '&:hover': {
                          border: '2px solid var(--primary-color)'
                        }
                      }}
                      onClick={() => navigate('/survey')}
                    >
                      Back to Survey
                    </Button>
                    <Button
                      type='submit'
                      variant='outlined'
                      sx={{
                        width: '60%',
                        fontWeight: '700',
                        textTransform: 'none',
                        color: 'var(--secondary-color)',
                        background: 'var(--primary-color)',
                        '&:hover': {
                          background: 'var(--primary-color)'
                        },
                        '&:disabled': {
                          border: 'transparent',
                          color: 'var(--secondary-color)',
                          background: '#D0D0D0'
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </section>
  )
}
