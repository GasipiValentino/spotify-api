import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { auth } from '@/auth';

const UserMenu = async () => {
  const session = await auth();

  // Si hay una sesión iniciada, mostrar los datos del usuario
  if (session) {
    const name = session.user?.name;
    const email = session.user?.email;
    // const image = session.user?.image;

    return (
      <div className='flex gap-4 items-center'>
        <Avatar className='shadow-md size-16'>
          {/* <AvatarImage src={image} /> */}
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='font-medium text-lg'>{name}</span>
          <span className='text-gray-500'>{email}</span>
        </div>
      </div>
    );
  }

  // Si no hay sesión, mostrar un perfil por defecto
  return (
    <div className='flex gap-4 items-center'>
      <Avatar className='shadow-md size-16'>
        <AvatarImage src='/assets/images/yo.jpeg' />
        <AvatarFallback>VGF</AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <span className='font-medium text-lg'>Valentino Gasipi - Creador</span>
        <Link href='https://valentinogasipi-portfolio.netlify.app/' className='cursor-pointer' target='_blank'>
          <span className='text-gray-500'>Ver Portfolio</span>
        </Link>
      </div>
    </div>
  );
};

export default UserMenu;
