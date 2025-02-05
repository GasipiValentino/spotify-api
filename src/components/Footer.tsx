import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Footer = () => {
  return (
    <div className='flex gap-4 items-center'>
        <Avatar className='shadow-md size-16'>
            <AvatarImage src='/assets/images/yo.jpeg' />
            <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
            <span className='font-medium text-lg'>Valentino Gasipi</span>
            <Link href='https://valentinogasipi-portfolio.netlify.app/' className='cursor-pointer' target='blank'><span className='text-gray-500'>Ver Portfolio</span></Link>
        </div>
    </div>
  )
}

export default Footer