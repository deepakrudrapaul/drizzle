"use client";

import { deleteProject, fetchToken } from '@/lib/actions';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ProjectActions = async ({projectId}: {projectId: string}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const {token} = await fetchToken(); 

    const handleDeleteProject = async () => {
        setIsDeleting(true);
        try {
            await deleteProject(projectId, token);
            router.push("/");
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleting(false);
        }
    }
  return (
    <>
        <Link href={`/edit-project/${projectId}`} className='flexCenter edit-action_btn'>
            <Image src='/pencile.svg' width={15} height={15} alt='edit'/>
        </Link>

        <button onClick={handleDeleteProject} type='button' className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray': 'bg-primary-purple'}`}>
            <Image src='/trash.svg' width={15} height={15} alt='delete'/>
        </button>

    </>
  )
}

export default ProjectActions;