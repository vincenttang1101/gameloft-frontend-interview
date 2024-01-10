import { Box, Typography } from '@mui/material'
import Logo from '@assets/logo.png'
import './styles.css'

export const Footer = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        padding: '3px 0',
        backgroundColor: 'var(--primary-color)'
      }}
    >
      <Box className='main-content'>
        <Typography
          className='desc'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 0',
            color: 'var(--secondary-color)'
          }}
        >
          in collaboration with
          <img src={Logo} alt='Logo' style={{ width: '30px', height: '25px' }} />
        </Typography>
      </Box>
    </footer>
  )
}
