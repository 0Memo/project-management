import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import React, { useMemo, useState } from 'react';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import '../../globals.css';

type TimelineProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = ({ id, setIsModalNewTaskOpen }: TimelineProps) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: tasks, isLoading, isError } = useGetTasksQuery({ projectId: Number(id) });

    const [ displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: "fr-FR"
    });

    const ganttTasks = useMemo(() => {
        return (
            tasks?.map((task) => ({
                start: new Date(task.startDate as string),
                end: new Date(task.dueDate as string),
                name: task.title,
                id: `Task-${task.id}`,
                type: "task" as TaskTypeItems,
                progress: task.points ? (task.points / 10) * 100 : 0,
                isDisable: false
            })) || []
        )
    }, [ tasks ]);

    const handleViewModeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDisplayOptions((prev) => ({
            ...prev,
            viewMode: event.target.value as ViewMode,
        }));
    }

    if ( isLoading ) return <div className="p-8">Chargement...</div>;
    if ( isError ) return ( <div className="p-8">Une erreur est survenue lors de la récupération des tâches</div> );

    return (
        <div
            className={`
                px-4 xl:px-6
            `}
        >
            <div className="flex flex-wrap items-center justify-between gap-2 py-5">
                <h1
                    className={`
                        me-2 text-lg font-bold
                        ${isDarkMode ? "text-gray-200" : ""}
                    `}
                >
                    Frise chronologique des tâches des projets
                </h1>
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
            </div>

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
                        barBackgroundColor="#101828"
                        barBackgroundSelectedColor={ isDarkMode ? "#59168B" : "#6E11B0" }
                    />
                </div>
                <div className="px-4 pb-5">
                    <button
                        className={`
                            flex items-center rounded px-3 py-2 text-gray-200
                            ${isDarkMode ? "bg-purple-900 hover:bg-gray-200 hover:text-purple-900 hover:outline-2 hover:outline-purple-900" : "bg-purple-800 hover:bg-gray-200 hover:text-purple-800 hover:outline-2 hover:outline-purple-800"}
                        `}
                        onClick={() => setIsModalNewTaskOpen(true)}
                    >
                        Ajouter une tâche
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Timeline;