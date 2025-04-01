import { useAppSelector } from '@/app/redux';
import { Project } from '@/state/api';
import React from 'react';

type ProjectCardProps = {
    project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    console.log('isDarkMode', isDarkMode);

    return (
        <div
            className={`rounded border p-4 shadow mt-3`}
        >
            <h3>{ project.name }</h3>
            <p>{ project.description }</p>
            <p>Date début: { project.startDate }</p>
            <p>Date find: { project.endDate }</p>

        </div>
    );
}

export default ProjectCard;