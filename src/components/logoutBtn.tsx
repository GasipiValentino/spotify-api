'use client'

import { logout } from '@/actions/auth'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

const LogoutBtn = () => {

  return (
    <Button onClick={logout} size='icon' variant='ghost'>
      <LogOut />
    </Button>
  )
}

export default LogoutBtn