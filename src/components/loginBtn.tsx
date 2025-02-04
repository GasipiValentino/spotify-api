'use client'

import { login } from '@/actions/auth'
import { Button } from './ui/button'

const LoginBtn = () => {

  const handleClick = async () => {
    await login('spotify')
  }

  return (
    <Button onClick={handleClick} variant='ghost'>
      Login
    </Button>
  )
}

export default LoginBtn