import { Box, Button, Typography } from '@mui/material'
import './styles.css'

export const ThankYou = () => {
  return (
    <section className='thank'>
      <Box className='main-content' sx={{ width: 'var(--thank-container)' }}>
        <Box
          className='border-container'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'var(--primary-color)',
            gap: '20px'
          }}
        >
          {/* Head */}
          <Typography
            component='h1'
            sx={{ fontSize: 'var(--font-size-heading)', fontWeight: 'var(--font-weight-heading)' }}
          >
            Thank you !
          </Typography>

          {/* Content */}
          <Typography sx={{ color: 'var(--primary-color)' }}>We appreciate your time so far!</Typography>

          {/* Food */}
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
            onClick={() => (window.location.href = 'https://www.gameloft.com/')}
          >
            Back to Gameloft
          </Button>
        </Box>
      </Box>
    </section>
  )
}
