import { type FC } from 'react'
import { Card, CardContent } from './ui/card';
import { CarouselItem } from '@/components/ui/carousel'
import Image from 'next/image';

interface Props {
  image: string
  name: string
  aditionalInfo: string
}

const SpotifyCard: FC<Props> = ({ image, name, aditionalInfo }) => {
  return (
    <CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
      <div className="p-0">
        <Card className="group space-y-4 border-none shadow-none">
          <CardContent className="p-0 rounded-3xl">
            <div className="flex flex-col gap-6 sm:gap-4 pb-5">
              <div className={`flex justify-center items-center overflow-hidden aspect-square relative`}>
                <div className="absolute w-full border-2 h-full -translate-x-1/2 group-hover:-translate-x-1/2 sm:translate-x-0 z-10 duration-300 transition-all">
                  <Image src={image} alt="artist-cover" fill className="object-cover object-center" />
                </div>
                <Image className="max-sm:animate-spinDisc p-2" src='/assets/images/disc-vinyl.webp' alt="disco-de-vinilo" fill />
              </div>
              <div className="w-full h-full flex flex-col gap-1 items-center justify-center text-center px-2">
                <span className="text-lg sm:text-xs text-foreground font-semibold">{name}</span>
                <span className="text-xs text-muted-foreground capitalize">{aditionalInfo}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  )
}

export default SpotifyCard;