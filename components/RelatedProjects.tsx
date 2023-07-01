import { UserProfile, ProjectInterface } from '@/common.types'
import { getUserProjects } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


type Props = {
    userId: string, 
    projectId: string
}

const RelatedProjects = async ({userId, projectId}: Props) => {
    const result = await getUserProjects(userId) as {user?: UserProfile};
    const projects = result?.user?.projects?.edges?.filter(({node}:{node: ProjectInterface}) => node?.id !== projectId);

    console.log(projects)

    if (projects?.length === 0) return null;

   return (
    <section className='flex flex-col mt-32 w-full'>
        <div className='flexBetween'>
            <p className='text-base font-bold'>More By {result?.user?.name}</p>
            <Link href={`/profile/${result?.user?.id}`} className='text-primary-purple text-base'>
                View All
            </Link>
        </div>
        <div className='related_projects-grid'>
                {
                    projects?.map(({node}: {node:ProjectInterface}) => (
                        <div className='flexCenter related_project-card drop-shadow-card'>
                            <Link href={`/projects/${node?.id}`} className='flexCenter group relative w-full h-full'>
                                <Image src={node?.image} width={414} height={314} alt='Project Image' className='w-full h-full object-cover rounded-2xl'/>
                                <div className='hidden group-hover:flex related_project-card_title'>
                                    <p className='w-full'>{node?.title}</p>
                                </div>
                            </Link>

                        </div>
                    ))
                }
            </div>
    </section>
  )
}

export default RelatedProjects;