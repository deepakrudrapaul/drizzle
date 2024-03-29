"use client";

import { ProjectInterface, SessionInterface } from "@/common.types"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, updateProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
    type: string,
    session: SessionInterface,
    project?: ProjectInterface
}
const ProjectForm = ({type, session, project }: Props) => {

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [form, setForm] = useState({
        title: project?.title || '',
        description: project?.description || '',
        image: project?.image || '',
        projectUrl: project?.projectUrl || '',
        githubUrl: project?.githubUrl || '',
        category: project?.category || ''
    })


    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);


        try {
            if(type === 'create') {
                await createNewProject(form, session?.user?.id)
                router.push('/');
            }
            if(type === 'edit') {
                await updateProject(form, project?.id as string)
                router.push('/');
            }

        } catch (error) {
            console.log(error);

        } finally{
            setIsSubmitting(false);
        }

    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];

        if(!file) return;

        if(!file.type.includes('image')) {
            return alert('Please upload an image file');
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result);
        }
    }


    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => ({...prevState, [fieldName]: value}))
    }

    
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
        <div className="flexStart form_image-container">
            <label htmlFor="poster" className="flexCenter form_image-label">
                {!form.image && "Choose a thumbnail for your project"}
            </label>
            <input
                id="image"
                type="file"
                accept="image/*"
                required={type === 'create'}
                className="form_image-input"
                onChange={handleChangeImage}/>
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20"
                        alt="Project thumbnail"
                        fill/>
                )}
        </div>


        <FormField
            title="Title"
            state={form.title}
            placeholder="Drizzle"
            setState={(value) => handleStateChange("title", value)}
        />

        <FormField
            title="Description"
            state={form.description}
            placeholder="Showcase and discover remarkable developer projects"
            setState={(value) => handleStateChange("description", value)}
        />


        <FormField
            type="url"
            title="Project Url"
            state={form.projectUrl}
            placeholder="https://yourproject.com"
            setState={(value) => handleStateChange("projectUrl", value)}
        />
        <FormField
            type="url"
            title="Github Url"
            state={form.githubUrl}
            placeholder="https://github.com/deepakrudrapaul"
            setState={(value) => handleStateChange("githubUrl", value)}
        />


        <CustomMenu
            title="Category"
            state={form.category}
            filters={categoryFilters}
            setState={(value) => handleStateChange("category", value)}
        />

        <div className="flexStart w-full">
            <Button
                title={isSubmitting ? `${type === 'create' ? 'Creating' : 'Editing'}` : `${type === 'create' ? 'Create': 'Edit'}`}
                type="submit"
                leftIcon={isSubmitting ? "":  '/plus.svg'}
                isSubmitting={isSubmitting}
                handleClick={handleFormSubmit}
                />

        </div>
    </form>
  )
}

export default ProjectForm