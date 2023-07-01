import { ProjectInterface } from '@/common.types';
import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';
import RelatedProjects from '@/components/RelatedProjects';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Project = async ({params:{id}}: {params: {id: string}}) => {

    const session = await getCurrentUser();
    const {project} = await getProjectDetails(id) as {project?: ProjectInterface}


    console.log(project)
  return (
    <Modal>
        <section className='flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full'>
            <div className='flex-1 flex items-start gap-5 w-full max-xs:flex-col'>
                <Link href={'/'}>
                    <Image src={project?.createdBy?.avatarUrl || ''} width={50} height={50} alt='profile' className='rounded-full'/>
                </Link>


                <div className='flex-1 flexStart flex-col gap-1'>
                    <p className='self-start text-lg font-semibold'>{project?.title}</p>
                    <div className='user-info'>
                        <Link href={'/'}>
                            {project?.createdBy?.name}
                        </Link>

                        <Image src='/dot.svg' width={4} height={4} alt='dot' />
                        <Link href={'/?category'} className='text-primary-purple font-semibold'>
                            {project?.category}
                        </Link>
                    </div>
                </div>

            </div>
        </section>
        <section className='mt-14'>
                    <Image
                        src={`${project?.image}`}
                        className='object-cover rounded-2xl'
                        width={1064}
                        height={798}
                        alt='project image'
                        />
        </section>

        <section className='flexCenter flex-col mt-20'>
            <p className='max-w-5xl text-xl font-normal'>
                {project?.description}
            </p>

            <div className='flex flex-wrap mt-5 gap-5'>
                <Link href={project?.githubUrl || ''} target='_blank' rel='noreferrer' className='flexCenter gap-2 text-sm font-medium text-primary-purple'>
                    <span className='underline'>Github</span> 
                </Link>
                <Image src='/dot.svg' width={4} height={4} alt='dot' />
                <Link href={project?.projectUrl || ''} target='_blank' rel='noreferrer' className='flexCenter gap-2 text-sm font-medium text-primary-purple'>
                    <span className='underline'>Live Project</span> 
                </Link>
            </div>
        </section>

        <section className='flexCenter w-full mt-28 gap-8'>  
            <span className='w-full h-0.5 bg-light-white-200'/>
            <Image src={project?.createdBy?.avatarUrl || ''} className='rounded-full' width={82} height={82} alt='profile image'/>
            <span className='w-full h-0.5 bg-light-white-200'/>
        </section>


        <RelatedProjects userId={project?.createdBy?.id} projectId={project?.id}/>
    </Modal>
  )
}

export default Project