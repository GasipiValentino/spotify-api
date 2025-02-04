'use client'

import { logout } from '@/actions/auth'
import { Button } from './ui/button'

const LogoutBtn = () => {

  return (
    <Button onClick={logout} size='icon' variant='ghost'>
      Cerrar Sesión
    </Button>
  )
}

export default LogoutBtn