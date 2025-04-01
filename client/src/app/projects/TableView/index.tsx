import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { useGetTasksQuery } from '@/state/api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { format } from 'date-fns';

type TableProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

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
        renderCell: (params) => params.value?.author || "Inconnu"
    },
    {
        field: "assignee",
        headerName: "Attribution",
        width: 150,
        renderCell: (params) => params.value?.assignee || "Non attribué"
    },
]

const Table = ({ id, setIsModalNewTaskOpen }: TableProps) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: tasks, isLoading, isError } = useGetTasksQuery({ projectId: Number(id) });
    
    if ( isLoading ) return <div className="p-8">Chargement...</div>;
    if ( isError ) return ( <div className='p-8'>Une erreur est survenue lors de la récupération des tâches</div> );

    return (
        <div
            className={`
                h-[540px] w-full px-4 pb-8 xl:px-6
            `}
        >
            <div className="pt-5">
                <Header
                    name="Table"
                    buttonComponent={
                        <button
                            className={`
                                flex items-center px-3 py-2 text-white border-2
                                border-transparent transform cursor-pointer rounded
                                ${isDarkMode
                                    ? "bg-purple-900 hover:border-purple-900 hover:bg-white hover:text-purple-900"
                                    : "bg-purple-800 hover:border-purple-800 hover:bg-white hover:text-purple-900" }
                            `}
                            onClick={ () => setIsModalNewTaskOpen(true)}
                        >
                            Ajouter tâche
                        </button>
                    }
                    isSmallText
                />
            </div>
            <DataGrid
                rows={ tasks || [] }
                columns={ columns }
                className={ dataGridClassNames(isDarkMode) }
                sx={ dataGridSxStyles(isDarkMode) }
            />
        </div>
    );
};

export default Table;