"use client";

import { useAppSelector } from '@/app/redux';
import { useGetProjectsQuery } from '@/state/api';
import React, { useMemo, useState } from 'react';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import '../globals.css';
import Header from '@/components/Header';

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: projects, isLoading, isError } = useGetProjectsQuery();

    const [ displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: "fr-FR"
    });

    console.log('projects', projects);

    const ganttTasks = useMemo(() => {
        return (
            projects?.filter(project => project.startDate && project.endDate).map((project) => ({
                start: new Date(project.startDate as string),
                end: new Date(project.endDate as string),
                name: project.name,
                id: `Project-${project.id}`,
                type: "project" as TaskTypeItems,
                progress: 50,
                isDisable: false
            })) || []
        )
    }, [ projects ]);

    const handleViewModeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDisplayOptions((prev) => ({
            ...prev,
            viewMode: event.target.value as ViewMode,
        }));
    }

    if ( isLoading ) return <div className="p-8">Chargement...</div>;
    if ( isError || !projects ) return ( <div className="p-8">Une erreur est survenue lors de la récupération des projets</div> );

    return (
        <div
            className={`
                max-w-full p-8
            `}
        >
            <header className="nb-4 flex items-center justify-between">
                <Header
                    name="Frise chronologique des projets"
                />
                <div className="relative inline-block w-64">
                    <select
                        className={`
                            focus:shadow-outline block w-full appearance-none
                            rounded px-4 py-2 pr-8 leading-tight
                            shadow hover:border-gray-500 focus:outline-none
                            ${isDarkMode ? "bg-gray-900 border-gray-900 text-gray-200" : "bg-gray-300 border-gray-400 hover:border-gray-500"}
                        `}
                        value={ displayOptions.viewMode }
                        onChange={ handleViewModeChange }
                    >
                        <option value={ ViewMode.Day }>Jour</option>
                        <option value={ ViewMode.Week }>Semaine</option>
                        <option value={ ViewMode.Month }>Mois</option>
                    </select>
                </div>
            </header>

            <div
                className={`
                    overflow-hidden rounded-md shadow
                    ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-200 text-gray-900" }
                `}
            >
                <div className="timeline">
                    <Gantt
                        tasks={ ganttTasks }
                        {...displayOptions}
                        columnWidth={ displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                        listCellWidth="100px"
                        projectBackgroundColor={ isDarkMode ? "#59168B" : "#6E11B0" }
                        projectProgressColor={ isDarkMode ? "#6E11B0" : "#59168B" }
                        projectProgressSelectedColor={ isDarkMode ? "#59168B" : "#6E11B0" }
                    />
                </div>
            </div>
        </div>
    )
}

export default Timeline;