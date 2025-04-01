/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/state/api';
import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Task as TaskType } from '@/state/api';
import { useAppSelector } from '@/app/redux';
import { EllipsisVertical, MessageSquareText, Plus } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

type BoardProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
    const { data: tasks, isLoading, isError } = useGetTasksQuery({ projectId: Number(id) });

    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const moveTask = (taskId: number, toStatus: string) => {
        updateTaskStatus({ taskId, status: toStatus });
    };

    if ( isLoading ) return <div className="p-8">Chargement...</div>;
    if ( isError ) return <div className="p-8">Une erreur est survenue lors de la récupération des tâches</div>;


    return (
        <DndProvider
            backend={HTML5Backend}
        >
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols2 xl:grid-cols-4">
                { taskStatus.map((status) => (
                    <TaskColumn
                        key={ status }
                        status={ status }
                        tasks= { tasks || [] }
                        moveTask={ moveTask }
                        setIsModalNewTaskOpen={ setIsModalNewTaskOpen }
                    />
                )) }
            </div>
        </DndProvider>
    );
};

type TaskColumnProps = {
    status: string;
    tasks: TaskType[];
    moveTask: ( taskId: number, toStatus: string ) => void;
    setIsModalNewTaskOpen: ( isOpen: boolean ) => void;

};

const TaskColumn = ({
    status,
    tasks,
    moveTask,
    setIsModalNewTaskOpen,
}: TaskColumnProps) => {
    const [{ isOver }, drop ] = useDrop(() => ({
        accept: "task",
        drop: ( item: { id: number}) => moveTask( item.id, status),
        collect: ( monitor: any ) => ({
            isOver: !!monitor.isOver()
        })
    }));
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const tasksCount = tasks.filter(( task ) => task.status === status).length;

    const statusColor: any = {
        "To Do": "#2563EB",
        "Work In Progress": "#059669",
        "Under Review": "#D97706",
        "Completed": "#000",
    }

    return (
        <div
            ref={(instance) => {
                drop(instance);
            }}
            className={`
                sl:py-4 rounded-lg py-2 xl:px-2
                ${isOver && isDarkMode ? "bg-neutral-950" : "" }
                ${isOver && !isDarkMode? "bg-purple-100" : "" }
            `}
        >
            <div className="mb-3 flex w-full">
                <div className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
                    style={{ backgroundColor: statusColor[status] }}
                />
                <div className={`
                        flex w-full items-center justify-between rounded-e-lg px-5 py-4
                        ${isDarkMode ? "bg-white" : "bg-gray-200"}
                    `}
                >
                    <h3 className={`
                            flex items-center text-lg font-semibold text-gray-900
                        `}
                    >
                        { status } { " "}
                    
                        <span
                            className={`
                                ml-2 inline-block rounded-full p-1 text-sm
                                text-center leading-none bg-gray-50
                            `}
                            style={{ width: "1.5rem", height: "1.rem" }}
                        >
                            { tasksCount }
                        </span>
                    </h3>
                    <div className="flex items-center gap-1">
                        <button
                            className={`
                                flex h-6 w-5 items-center justify-center
                                ${isDarkMode ? "text-gray-900" : "" }
                            `}
                        >
                            <EllipsisVertical
                                size={ 26 }
                            />
                        </button>
                        <button
                            className={`
                                flex h-6 w-6 items-center
                                justify-center rounded
                                ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200" }
                            `}
                            onClick={() => setIsModalNewTaskOpen(true)}
                        >
                            <Plus
                                size={ 16 }
                            />
                        </button>
                    </div>
                </div>
            </div>

            { tasks
                .filter((task) => task.status === status)
                .map((task) => (
                    <Task
                        key={ task.id }
                        task={ task }
                    />
                ))
            }
        </div>
    );
};

type TaskProps = {
    task: TaskType
};

const Task = ({ task }: TaskProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const taskTagsSplit = task.tags ? task.tags.split(",") : [];

    const formattedStartDate = task.startDate ? format(new Date( task.startDate), "yyyy/MM/dd" ) : "";
    const formattedDueDate = task.dueDate ? format(new Date( task.dueDate), "yyyy/MM/dd" ) : "";
    const numberOfComments = ( task.comments && task.comments.length) || 0;

    const PriorityTag = ({ priority }: { priority: TaskType["priority"]}) => (
        <div
            className={`
                rounded-full px-2 py-1 text-xs font-semibold
                ${  priority === "Urgent" ? "bg-red-200 text-red-700"
                    : priority === "High" ? "bg-yellow-200 text-yellow-700" 
                    : priority === "Medium" ? "bg-green-200 text-green-700"
                    : priority === "Low" ? "bg-blue-200 text-blue-700"
                    : "bg-gray-200 text-gray-700"
                }
            `}
        >
            { priority }
        </div>
    );
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    return (
        <div
            ref={(instance) => {
                drag(instance)
            }}
            className={`
                mb-4 rounded-md shadow rounded-l-2xl
                ${isDarkMode ? "bg-gray-900" : "bg-gray-200" }
                ${isDragging ? "opacity-50" : "opacity-100" }
            `}
        >
            { task.attachments && task.attachments.length > 0 && (
                <Image
                    src={`https://pm-s3-images-memo.s3.us-east-1.amazonaws.com/${task.attachments[0].fileURL}`}
                    alt={task.attachments[0].fileName}
                    width={400}
                    height={200}
                    className='h-auto w-full rounded-tl-2xl'
                />
            ) }
            <div className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                        { task.priority && <PriorityTag priority={ task.priority } /> }
                        <div className="flex gap-2">
                            {taskTagsSplit.map((tag) => (
                                <div
                                    key={tag}
                                    className={`
                                        rounded-full  px-2 py-1 text-xs bg-blue-600 text-gray-200
                                    `}
                                >
                                    {" "}
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        className={`
                            flex h-6 w-4 flex-shrink-0
                            items-center justify-center
                            ${isDarkMode ? "text-gray-200": "text-gray-900" }
                        `}
                    >
                        <EllipsisVertical size={ 26 } />
                    </button>
                </div>

                <div className="my-3 flex justify-between">
                    <h4
                        className={`
                            text-md font-bold
                            ${isDarkMode ? "text-gray-200" : "text-gray-900" }
                        `}
                    >
                        { task.title }
                    </h4>
                    { typeof task.points === "number" && (
                        <div className={`
                            text-xs font-semibold
                            ${isDarkMode ? "text-gray-200" : "text-gray-900" }
                        `}>
                            { task.points } pts
                        </div>
                    )}
                </div>

                <div
                    className={`
                        text-xs italic
                        ${isDarkMode ? "text-neutral-400" : "text-gray-700"}
                    `}
                >
                    { formattedStartDate && <span>{ formattedStartDate } — </span> }
                    { formattedDueDate && <span>{ formattedDueDate }</span> }
                </div>
                <p
                    className={`
                        text-sm font-semibold pt-2
                        ${isDarkMode ? "text-gray-200" : "text-gray-600" }
                    `}
                >
                    { task.description }
                </p>
                <div
                    className={`
                        mt-4 border-t border-gray-200
                        ${isDarkMode ? "border-stroke-dark": "" }
                    `}
                >
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex -space-x-[6px] overflow-hidden">
                            { task.assignee && (
                                <Image
                                    key={ task.assignee.userId}
                                    src={`https://pm-s3-images-memo.s3.us-east-1.amazonaws.com/${task.assignee.profilePictureUrl!}`}
                                    alt={task.assignee.username}
                                    width={40}
                                    height={40}
                                    className={`
                                        h-10 w-10 rounded-tl-lg rounded-br-lg border-2 object-cover
                                        ${isDarkMode ? "border-gray-900" : "border-gray-200" }
                                    `}
                                />
                            ) }
                            { task.author && (
                                <Image
                                    key={ task.author.userId}
                                    src={`https://pm-s3-images-memo.s3.us-east-1.amazonaws.com/${task.author.profilePictureUrl!}`}
                                    alt={task.author.username}
                                    width={40}
                                    height={40}
                                    className={`
                                        h-10 w-10 rounded-tl-lg rounded-br-lg border-2 object-cover -ml-1
                                        ${isDarkMode ? "border-gray-900" : "border-gray-200" }
                                    `}
                                />
                            ) }
                        </div>
                        <div
                            className={`
                                flex items-center
                                ${isDarkMode ? "text-gray-200" : "text-gray-500" }
                            `}
                        >
                            <MessageSquareText size={20} />
                            <span
                                className={`
                                    ml-1 text-sm
                                    ${isDarkMode ? "text-gray-200" : "" }
                                `}
                            >
                                { numberOfComments }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BoardView;