"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {
    id: string, 
    title: string,
    image: string,
    name: string,
    avatarUrl: string,
    userId: string
}
const ProjectCard = ({id, image, title, name, avatarUrl, userId}: Props) => {

  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState('');



  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(String((Math.floor(Math.random() * 10000)/1000).toFixed(1) + 'k'));
  }, [])
  




  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-card'>
        <Link href={`/project/${id}`} className='flexCenter group relative w-full h-full'>
            <Image width={414} height={314} className='w-full h-full object-cover' alt='Project Image' src={image}/>
            <div className='hidden group-hover:flex related_project-card_title'>
                                    <p className='w-full'>{title}</p>
                                </div>
        </Link>
        <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
          <Link href={`/profile/${userId}`}>
            <div>
              <Image src={avatarUrl} width={24} height={24} alt='Profile Image'/>
              <p>{name.split(' ')[0]}</p>
            </div>
          </Link>

          <div className='flexCenter gap-3'>
            <div className='flexCenter gap-3'>
              <Image src="/hearth.svg" width={13} height={12} alt='heart'/>
              <p className='text-sm'>{randomLikes}</p>
            </div>
          </div>

          <div className='flexCenter gap-3'>
            <div className='flexCenter gap-3'>
              <Image src="/eye.svg" width={13} height={12} alt='eye'/>
              <p className='text-sm'>{randomViews}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProjectCard