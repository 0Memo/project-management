import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { Task, useGetTasksQuery } from '@/state/api';
import React from 'react';

type ListProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: ListProps) => {
    const { data: tasks, isLoading, isError } = useGetTasksQuery({ projectId: Number(id) });
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if ( isLoading ) return <div className="p-8">Chargement...</div>;
    if ( isError ) return <div className="p-8">Une erreur est survenue lors de la récupération des tâches</div>;

    return (
        <div
            className={`
                px-4 pb-8 xl:px-6
            `}
        >
            <div className="pt-5">
                <Header name="Liste"
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                { tasks?.map((task: Task) => 
                    <TaskCard
                        key={ task.id}
                        task={ task }
                    />
                )}
            </div>
        </div>
    );
};

export default ListView;