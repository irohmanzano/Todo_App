import { Box, Button } from '@mui/material'
import React from 'react'
import useAuthCtx from '../hooks/useAuthCtx'

function Header() {
  async function logout() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
      method: 'GET',
      credentials: 'include'
    });

    setAuth(null);    
  }

  const { auth, setAuth } = useAuthCtx();

  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.palette.primary.main,
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: '6rem',
        color: 'white'
      })}
    >
      Welcome, {auth?.username}!
      <Button
        sx={{
          color: 'white'
        }}
        onClick={logout}
      >
        Log out
      </Button>
    </Box>
  )
}

export default Header