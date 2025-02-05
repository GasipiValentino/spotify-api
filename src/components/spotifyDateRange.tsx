'use client'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { FC, useContext, useState } from 'react'
import { ISession } from '@/auth'
import { SpotifyContext } from '@/contexts/spotify-context'

interface DateButton {
  label: string;
  value: 'short_term' | 'medium_term' | 'long_term';
  active: boolean;
}

const initialDatesBtn: DateButton[] = [
  {
    label: '4 Wks',
    value: 'short_term',
    active: true
  },
  {
    label: '6 Mths',
    value: 'medium_term',
    active: false
  },
  {
    label: 'All Time',
    value: 'long_term',
    active: false
  }
]

interface Props {
  session: ISession | null
}

const SpotifyRangeDate: FC<Props> = ({ session }) => {

  const [datesBtn, setDatesBtn] = useState(initialDatesBtn)
  const { setDateRange } = useContext(SpotifyContext)

  const handleButtonClick = async (clickedIndex: number, value: 'short_term' | 'medium_term' | 'long_term') => {
    setDatesBtn((prevButtons) =>
      prevButtons.map((btn: DateButton, index: number) => ({
        ...btn,
        active: index === clickedIndex
      }))
    )
    setDateRange(value)
  }

  return (
    <div className='flex items-center mx-auto mb-4'>
      <div className='flex justify-center shadow rounded-full overflow-hidden'>
        {datesBtn.map((btn, index) => (
          <Button
            disabled={!session}
            key={index}
            className={cn('rounded-none hover:bg-foreground text-xs hover:text-white', btn.active && 'bg-foreground text-white')}
            size='sm'
            variant='ghost'
            value={btn.value}
            onClick={() => handleButtonClick(index, btn.value)}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default SpotifyRangeDate