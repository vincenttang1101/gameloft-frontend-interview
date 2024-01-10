import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { LOCALSTORAGE } from '@constants'
import './styles.css'

export const Consent = () => {
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate()

  const SITE_KEY = process.env.VITE_SITE_KEY || ''

  const handleSubmit = () => {
    localStorage.setItem(LOCALSTORAGE.KEY.AUTH_ROUTE, LOCALSTORAGE.VALUE.SURVEY)
    navigate('/survey')
  }

  return (
    <section className='consent'>
      <Box className='main-content' sx={{ width: 'var(--consent-width-container)' }}>
        <Box
          className='border-container'
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          {/* Head */}
          <Typography
            component='h1'
            sx={{ fontSize: 'var(--font-size-heading)', fontWeight: '700', color: 'var(--third-color)' }}
          >
            Thank you for your interest
          </Typography>
          <Typography
            className='desc-1'
            sx={{
              position: 'relative',
              fontStyle: 'italic',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                display: 'inline-block',
                width: '200px',
                height: '1.8px',
                backgroundColor: 'var(--fourth-color)'
              },
              '&::before': {
                top: 11,
                left: -214
              },
              '&::after': {
                top: 11,
                right: -214
              },
              textAlign: 'center'
            }}
          >
            Please read the information below.
          </Typography>

          {/* Body */}
          <Box sx={{ width: '550px', maxWidth: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              {/* Description */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography className='desc-2' sx={{ fontSize: '0.9rem' }}>
                  Once you have read and understood the information, if you agree to take part in the research, click on
                  the{' '}
                  <Typography component='span' sx={{ fontWeight: '700' }}>
                    "I Agree"{' '}
                  </Typography>
                  button to begin the survey.
                </Typography>
              </Box>

              {/* List */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  padding: '20px 20px',
                  borderRadius: '4px',
                  color: 'var(--primary-color)',
                  backgroundColor: 'var(--fourth-color)'
                }}
              >
                {/* Item - 1 */}
                <Box>
                  <Typography sx={{ fontWeight: '700' }}>Why are we asking you to take part?</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
                    <Typography className='title'>
                      We have invited you to take part in this survey because you have downloaded Gameloft mobile games
                      for your child. We want to hear from parents all over the world whose children use apps.
                    </Typography>
                  </Box>
                </Box>

                {/* Item - 2 */}
                <Box>
                  <Typography sx={{ fontWeight: '700' }}>What would i need to do?</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
                    <Typography className='title'>
                      Taking part is voluntary. If you choose not to take part, this will not affect your use of
                      Gameloft mobile games. If you do decide to take part, we will ask some questions about your
                      household and about your child who uses Gameloft mobile games (or who you think will use Gameloft
                      mobile games, if you have just downloaded the app). We want to hear from you, even if you think
                      your child might not like the app or play it very much!
                    </Typography>
                    <Typography className='title'>
                      The questions will ask about the different activities your child does at home, how your child uses
                      technology (like smartphones, tablets or television) and whether other people join them in these
                      activities. We will also ask about your view on children using technology.
                    </Typography>
                    <Typography className='title'>
                      The survey will be anonymous. We will not ask for your name or your child's name. We will collect
                      some information concerning you on your child but in any case these data could directly identify
                      you on your child
                    </Typography>
                  </Box>
                </Box>

                {/* Item - 3 */}
                <Box>
                  <Typography sx={{ fontWeight: '700' }}>How will we use the in the information?</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
                    <Typography className='title'>
                      This research will help to improve the design of Gameloft mobile games and other apps, so that
                      they are better able to meet the needs of children and parents, and to support child learning. We
                      will share out findings with parents, app developers, and in academic publications.
                    </Typography>
                    <Typography className='title'>
                      Please click here to find out more about how we store your data, and how the study has been
                      reviewed to make sure it is ethical.
                    </Typography>
                  </Box>
                </Box>

                {/* Item - 4 */}
                <Box>
                  <Typography sx={{ fontWeight: '700' }}>What if I change my mind?</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
                    <Typography className='title'>
                      While you are completing the survey, you can stop at any time by clicking the button which says 'I
                      have changed my mind, please delete my information'. Once you have completed the survey, we will
                      not be able to withdraw your information because it will be anonymous (we will not know which
                      answers are yours). We will also delete the email address collected to send you the link to the
                      survey within one month.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Recaptcha */}
              <ReCAPTCHA sitekey={SITE_KEY} onChange={() => setVerified(!verified)} />

              {/* CTA Group */}
              <Box className='cta-group' sx={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
                <Button
                  variant='outlined'
                  sx={{
                    padding: '7px 10px',
                    minWidth: '180px',
                    border: '2px solid var(--primary-color)',
                    textTransform: 'none',
                    color: 'var(--primary-color)'
                  }}
                  onClick={() => {
                    window.close()
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant='outlined'
                  sx={{
                    padding: '7px 10px',
                    minWidth: '180px',
                    border: '2px solid var(--primary-color)',
                    textTransform: 'none',
                    color: 'var(--secondary-color)',
                    background: 'var(--primary-color)',
                    '&:hover': {
                      background: 'var(--third-color)'
                    },
                    '&:disabled': {
                      background: 'var(--secondary-color)'
                    }
                  }}
                  disabled={!verified}
                  onClick={handleSubmit}
                >
                  I have read and agree with the terms of use
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  )
}
