import { cn } from '@/lib/utils'
import React, { FC } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

const Container: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("w-full max-w-7xl mx-auto px-4 md:px-8", className)}>
      {children}
    </div>
  )
}

export default Container