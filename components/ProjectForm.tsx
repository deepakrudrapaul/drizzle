"use client";

import { SessionInterface } from "@/common.types"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";

type Props = {
    type: string,
    session: SessionInterface
}
const ProjectForm = ({type, session }: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [form, setForm] = useState({
        title: '',
        description: '',
        image: '',
        projectUrl: '',
        githubUrl: '',
        category: ''
    })


    const handleFormSubmit = (e: React.FormEvent) => {

    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {

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
            <button>Create</button>
        </div>
    </form>
  )
}

export default ProjectForm