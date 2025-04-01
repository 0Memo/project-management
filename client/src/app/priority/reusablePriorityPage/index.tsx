"use client";

import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import ModalNewTask from '@/components/ModalNewTask';
import TaskCard from '@/components/TaskCard';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { Priority, Task, useGetTasksByUserQuery } from '@/state/api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { format } from 'date-fns';

type PriorityProps = {
    priority: Priority
}

const columns: GridColDef[] = [
    {
        field: "title",
        headerName: "Titre",
        width: 100
    },
    {
        field: "description",
        headerName: "Description",
        width: 200
    },
    {
        field: "status",
        headerName: "Statut",
        width: 130,
        renderCell: (params) => (
            <span
                className='inline-flex rounded-full bg-green-100
                px-2 text-xs font-semibold leading-5 text-green-800'
            >
                { params.value }
            </span>
        )
    },
    {
        field: "priority",
        headerName: "Priorité",
        width: 75
    },
    {
        field: "tags",
        headerName: "Étiquettes",
        width: 130
    },
    { 
                field: "startDate",
                headerName: "Date début",
                width: 130,
                renderCell: (params) => (
                    params.value ? format(new Date(params.value), "yyyy/MM/dd") : "Non configurée"
                )
            },
    { 
        field: "dueDate",
        headerName: "Date butoir",
        width: 130,
        renderCell: (params) => (
            params.value ? format(new Date(params.value), "yyyy/MM/dd") : "Non configurée"
        )
    },
    {
        field: "author",
        headerName: "Auteur",
        width: 150,
        renderCell: (params) => params.value?.username ?? "Inconnu"
    },
    {
        field: "assignee",
        headerName: "Attribution",
        width: 150,
        renderCell: (params) => params.value?.username ?? "Non attribué"
    },
]

const ReusablePriorityPage = ({ priority }: PriorityProps) => {
    const [ view, setView ] = useState("list");
    const [ isModalNewTaskOpen, setIsModalNewTaskOpen ] = useState(false);

    const userId = 1;
    const { data: tasks, isLoading, isError: isTasksError } = useGetTasksByUserQuery(userId || 0, {
        skip: userId === null
    });

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    console.log('isDarkMode', isDarkMode);

    const filteredTasks = tasks?.filter((task: Task) => task.priority === priority);
    console.log('filteredTasks', filteredTasks);

    if ( isTasksError || !tasks ) return <div className="p-8">Erreur lors de la récupération des tâches</div>

    return (
        <div
            className={`m-5 p-4`}
        >
            <ModalNewTask
                isOpen={ isModalNewTaskOpen }
                onClose={ () => setIsModalNewTaskOpen(false) }
            />
            <Header
                name="Page priorités"
                buttonComponent={
                    <button
                        className={`
                            mr-3 rounded px-4 py-2 font-bold border-2
                            border-transparent transform cursor-pointer 
                            text-white hover:bg-purple-700
                            ${isDarkMode
                                ? "bg-purple-900 hover:border-purple-900 hover:bg-white hover:text-purple-900"
                                : "bg-purple-800 hover:border-purple-800 hover:bg-white hover:text-purple-900"
                            }
                        `}
                        onClick={() => setIsModalNewTaskOpen(true)}
                    >
                        Ajouter tâche
                    </button>
                }
            />
            <div className="mb-4 flex justify-start">
                <button
                    className={`
                        px-4 py-2 round-l transform cursor-pointer
                        ${isDarkMode && view !== "list" ? "bg-gray-200 text-gray-900": "border-2 border-purple-900"}
                        ${isDarkMode && view === "list" ? "bg-purple-900 text-gray-200": ""}
                        ${!isDarkMode && view === "list" ? "bg-purple-900 text-gray-200": "border-2 border-purple-900"}
                    `}
                    onClick={() => setView("list")}
                >
                    Liste
                </button>
                <button
                    className={`
                        px-4 py-2 round-l transform cursor-pointer border-2
                        ${isDarkMode && view !== "table" ? "bg-gray-200 text-gray-900": "border-2 border-purple-900"}
                        ${isDarkMode && view === "table" ? "bg-purple-900 text-gray-200": ""}
                        ${!isDarkMode && view === "table" ? "bg-purple-900 text-gray-200": "border-2 border-purple-900"}
                    `}
                    onClick={() => setView("table")}
                >
                    Table
                </button>
            </div>
            { isLoading
                ? ( <div className="p-8">Chargement...</div>)
                : view === "list"
                    ? (
                        <div className="grid grid-cols-1 gap-4">
                            { filteredTasks?.map(( task: Task) => (
                                <TaskCard
                                    key={ task.id }
                                    task={ task }
                                />
                            ))}
                        </div>
                    )
                    : (
                        view === "table" && filteredTasks && (
                        <div className='w-full'>
                            <DataGrid
                                rows={ filteredTasks }
                                columns={ columns }
                                checkboxSelection
                                getRowId={ (row) => row.id }
                                className={ dataGridClassNames(isDarkMode) }
                                sx={ dataGridSxStyles(isDarkMode) }
                            />
                        </div>
                    ))
            }
        </div>
    )
}

export default ReusablePriorityPage;