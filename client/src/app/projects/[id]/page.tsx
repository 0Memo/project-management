"use client";

import React, { useState } from 'react';
import ProjectHeader from '@/app/projects/ProjectHeader';
import Board from '../BoardView';
import List from '../ListView';
import Timeline from '../TimelineView';
import Table from '../TableView';
import ModalNewTask from '@/components/ModalNewTask';

type Params = {
    id: string;
};

type Props = {
    params: Promise<Params>;
};

const Project = ( { params }: Props) => {
    const { id } = React.use(params);
    const [ activeTab, setActiveTab ] = useState("Board");
    const [ isModalNewTaskOpen, setIsModalNewTaskOpen ] = useState(false);
    console.log('isModalNewTaskOpen', isModalNewTaskOpen);


    return (
        <div>
            <ModalNewTask
                isOpen={ isModalNewTaskOpen }
                onClose={ () => setIsModalNewTaskOpen(false) }
                id={ id }
            />
            <ProjectHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            { activeTab === "Board" && (
                <Board
                    id={ id }
                    setIsModalNewTaskOpen={ setIsModalNewTaskOpen }
                />
            )}
            { activeTab === "List" && (
                <List
                    id={ id }
                    setIsModalNewTaskOpen={ setIsModalNewTaskOpen }
                />
            )}
            { activeTab === "Timeline" && (
                <Timeline
                    id={ id }
                    setIsModalNewTaskOpen={ setIsModalNewTaskOpen }
                />
            )}
            { activeTab === "Table" && (
                <Table
                    id={ id }
                    setIsModalNewTaskOpen={ setIsModalNewTaskOpen }
                />
            )}
        </div>
    );
};

export default Project;