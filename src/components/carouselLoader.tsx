import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import { Skeleton } from "../components/ui/skeleton"

const CarouselLoader = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className='-ml-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <div className="p-0">
              <Card className="group space-y-4 border-none shadow-none">
                <CardContent className="p-0 rounded-3xl">
                  <div className="flex flex-col gap-6 sm:gap-4 pb-5">
                    <Skeleton className='aspect-square w-full' />
                    <div className="w-full h-full flex flex-col gap-1 items-center justify-center">
                      <Skeleton className="w-20 h-4 sm:h-3" />
                      <Skeleton className="w-16 h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CarouselLoader