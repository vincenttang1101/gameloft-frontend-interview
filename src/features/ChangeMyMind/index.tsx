import { useNavigate } from 'react-router-dom'
import { FiberManualRecord } from '@mui/icons-material'
import { Box, Button, Divider, Typography } from '@mui/material'
import { LOCALSTORAGE } from '@constants'
import { clearAll } from '@utils'
import './styles.css'

export const ChangeMyMind = () => {
  const navigate = useNavigate()

  return (
    <section className='consent'>
      <Box className='main-content' sx={{ width: 'var(--change-my-mind-container)' }}>
        <Box
          className='border-container'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'var(--primary-color)'
          }}
        >
          {/* Head */}
          <Typography
            component='h1'
            sx={{ fontSize: 'var(--font-size-heading)', fontWeight: 'var(--font-weight-heading)', textAlign: 'center' }}
          >
            "I no longer want to participate in the survey"
          </Typography>
          <Typography sx={{ marginTop: '14px', fontSize: '0.9rem' }}>Your progress will be lost.</Typography>

          {/* Width Container: 330px */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '28px',
              width: '330px',
              maxWidth: '100%',
              marginTop: '14px'
            }}
          >
            {/* Body */}
            <Box>
              <Typography sx={{ fontSize: '0.9rem' }}>
                You can learn more about the purpose of the survey by contacting our lead researchers if you have
                further questions.
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '28px' }}>
                <FiberManualRecord sx={{ fontSize: '0.5rem' }} />
                <Typography sx={{ fontSize: '0.9rem', fontWeight: '700' }}>Research Group</Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>(research@gameloft.com)</Typography>
              </Typography>
            </Box>

            {/* Separate */}
            <Divider sx={{ width: '100%', borderBottomWidth: 2 }} />

            {/* Foot */}
            <Box>
              {/* Description */}
              <Typography sx={{ fontSize: '0.9rem' }}>Are you sure you no longer want to take the survey?</Typography>

              {/* CTA Group */}
              <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '26px' }}
              >
                <Button
                  variant='outlined'
                  sx={{
                    width: '220px',
                    padding: '8px 0',
                    border: '2px solid var(--primary-color)',
                    fontSize: '1rem',
                    fontWeight: '700',
                    textTransform: 'none',
                    color: 'var(--secondary-color)',
                    background: 'var(--primary-color)',
                    '&:hover': {
                      background: 'var(--primary-color)'
                    },
                    '&:disabled': {
                      background: 'var(--secondary-color)'
                    }
                  }}
                  onClick={() => {
                    clearAll()
                    window.close()
                  }}
                >
                  I have changed my mind
                </Button>
                <Button
                  variant='outlined'
                  sx={{
                    width: '220px',
                    padding: '8px 0',
                    border: '2px solid var(--primary-color)',
                    fontSize: '1rem',
                    fontWeight: '700',
                    textTransform: 'none',
                    color: 'var(--primary-color)',
                    '&:hover': {
                      border: '2px solid var(--primary-color)'
                    }
                  }}
                  disabled={
                    localStorage.getItem(LOCALSTORAGE.KEY.AUTH_ROUTE) !== LOCALSTORAGE.VALUE.SURVEY &&
                    localStorage.getItem(LOCALSTORAGE.KEY.AUTH_ROUTE) !== LOCALSTORAGE.VALUE.COMPLETE
                  }
                  onClick={() => navigate('/survey')}
                >
                  Back to survey
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  )
}
