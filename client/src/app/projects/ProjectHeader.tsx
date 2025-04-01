/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/components/Header';
import React, { useState } from 'react';
import { useAppSelector } from '../redux';
import { Filter, History, LayoutDashboard, Logs, PlusSquare, Share2, Table2 } from 'lucide-react';
import ModalNewProject from './ModalNewProject';

type Props = {
    activeTab: string;
    setActiveTab: (tabName: string) => void
}

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
    const [ isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    return (
        <div
            className='px-4 xl:px-6'
        >
            <ModalNewProject
                isOpen={ isModalNewProjectOpen }
                onClose={ () => setIsModalNewProjectOpen(false) }
            />
            <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
                <Header name="Outil de Gestion des tâches"
                    buttonComponent={
                        <button
                            className={`
                                flex items-center rounded-md px-3 py-2 text-white border-2
                                border-transparent transform cursor-pointer
                            ${isDarkMode
                                ? "bg-purple-900 hover:text-purple-900 hover:border-purple-900 hover:bg-white"
                                : "bg-purple-800 hover:text-purple-800 hover:border-purple-800 hover:bg-white" }
                            `}
                            onClick={ () => setIsModalNewProjectOpen(true) }
                        >
                            <PlusSquare
                                className="mr-2 h-5 w-5"
                            />
                            Nouveau projet
                        </button>
                    }
                />
            </div>

            <div className={`
                flex flex-wrap-reverse gap-2 border-y pt-2
                border-gray-200 pb-[8px] md:items-center
                ${isDarkMode ? "border-stroke-dark": "" }
                `}
            >
                <div className={`
                    flex flex-1 items-center gap-2 md:gap-4
                `}
                >
                    <TabButton
                        name="Board"
                        icon={<LayoutDashboard
                            className={`h-5 w-5`} />
                        }
                        setActiveTab={ setActiveTab }
                        activeTab={ activeTab }
                        className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                    />
                    <TabButton
                        name="List"
                        icon={<Logs
                            className={
                                `h-5 w-5
                                `
                            } />
                        }
                        setActiveTab={ setActiveTab }
                        activeTab={ activeTab }
                        className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                    />
                    <TabButton
                        name="Timeline"
                        icon={<History
                            className={
                                `h-5 w-5
                                `
                            } />
                        }
                        setActiveTab={ setActiveTab }
                        activeTab={ activeTab }
                        className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                    />
                    <TabButton
                        name="Table"
                        icon={<Table2
                            className={
                                `h-5 w-5
                                `
                            } />
                        }
                        setActiveTab={ setActiveTab }
                        activeTab={ activeTab }
                        className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className={` ${isDarkMode ? "text-gray-100 hover:text-gray-500" : "text-gray-900 hover:text-gray-500"} `}
                    >
                        <Filter className='h-5 w-5' />
                    </button>
                    <button
                        className={` ${isDarkMode ? "text-gray-100 hover:text-gray-500" : "text-gray-900 hover:text-gray-500"} `}
                    >
                        <Share2 className='h-5 w-5' />
                    </button>
                    <div className={`
                            relative transform cursor-pointer
                        `}
                    >
                        <input
                            type="text"
                            placeholder="Rechercher tâche"
                            className={`
                                rounded py-1 pl-10 pr-4 border-none
                                focus:border-transparent focus:outline-purple-900
                                ${isDarkMode ? "bg-gray-800 placeholder-gray-200 outline-2 outline-gray-200 " : "bg-gray-200 placeholder-gray-900 outline-2 outline-gray-900"}
                            `}
                        />
                        <LayoutDashboard className={`
                            absolute left-3 top-2 h-4 w-4 
                            ${isDarkMode ? "text-gray-200" : "text-gray-900"}
                        `} />
                    </div>
                </div>
            </div>
        </div>
    )
}

type TabButtonProps = {
    name: string;
    icon: React.ReactNode;
    setActiveTab: (tabName: string) => void;
    activeTab: string;
    className: any;
}

const TabButton = ({ name, icon, setActiveTab, activeTab, className }: TabButtonProps) => {
    const isActive = activeTab === name;
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    return (
        <button
            className={`
                relative flex items-center gap-2 px-1 py-2 sm:px-2
                text-gray-500 after:absolute after:-bottom-[9px] lg:px-4
                after:left-0 after:h-[5px] after:rounded-full after:-ml-1 after:w-[100%] hover:text-purple-800
                ${isDarkMode ? "text-white hover:text-white hover:bg-purple-900" : "text-gray-500 hover:bg-purple-800 hover:text-white"}
                ${isActive ? "text-gray-200 after:bg-purple-800" : "" }
                ${isActive && isDarkMode ? "text-gray-200" : "" }
                ${ className }
            `}
            onClick={() => setActiveTab(name)}
        >
            { icon }
            { name }
        </button>
    )
}

export default ProjectHeader;