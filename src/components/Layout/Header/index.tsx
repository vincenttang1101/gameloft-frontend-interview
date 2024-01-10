import { Link, useLocation } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Typography } from '@mui/material'
import Logo from '@assets/logo.png'
import './styles.css'

export const Header = () => {
  const { pathname } = useLocation()

  return (
    <header
      className='header'
      style={{
        padding: '3px 0',
        backgroundColor: 'var(--primary-color)'
      }}
    >
      <Box
        className='main-content'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'var(--primary-color)'
        }}
      >
        <Box className='info' sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to='/'>
            <img src={Logo} alt='Logo' style={{ width: '60px', height: '50px' }} />
          </Link>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Typography
              className='desc'
              sx={{
                fontSize: '1rem',
                fontWeight: '500',
                wordSpacing: '0.1em',
                color: 'var(--secondary-color)'
              }}
            >
              FAMILIES USING TECHNOLOGY SURVEY
            </Typography>
          </Link>
        </Box>
        <Box className='cta-group' sx={{ display: 'flex', alignItems: 'center', alignContent: 'center', gap: '4px' }}>
          <Link
            to='/change-my-mind'
            style={{
              fontSize: '0.9rem',
              wordSpacing: '0.1em',
              lineHeight: '0',
              color: '#D1D1D1',
              textDecoration: pathname === '/' || pathname === '/survey' ? 'none' : 'underline',
              cursor: 'pointer'
            }}
          >
            I HAVE CHANGE MY MIND
          </Link>
          {(pathname === '/' || pathname === '/survey') && (
            <Link to='/change-my-mind' className='cta-icon'>
              <ChevronRightIcon sx={{ fontSize: '1.5rem', color: 'var(--secondary-color)' }} />
            </Link>
          )}
        </Box>
      </Box>
    </header>
  )
}
