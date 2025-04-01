import { useAppSelector } from '@/app/redux';
import { Task } from '@/state/api';
import { format } from 'date-fns';
import React from 'react';
import Image from 'next/image';

type TaskCardProps = {
    task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    return (
        <div
            className={`mb-3 mt-3 flex flex-row gap-8 rounded-3xl p-4 shadow ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200"} `}
        >
            {task.attachments && task.attachments.length > 0 ? (
                <>
                    <div>
                        <strong>Pièces jointes:</strong>
                        <div className="my-2 flex flex-wrap">
                            {task.attachments && task.attachments.length > 0 && (
                            <Image
                                src={`https://pm-s3-images-memo.s3.us-east-1.amazonaws.com/${task.attachments[0].fileURL}`}
                                alt={task.attachments[0].fileName}
                                width={350}
                                height={200}
                                className="rounded-bl-2xl"
                            />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col pt-6 text-[0.92em] md:text-[1em]">
                        <p className="md:pb-1.5 pb-0">
                            <strong>ID: </strong>
                            {task.id}
                        </p>
                        <p className="md:pb-1.5 pb-0">
                            <strong>Titre: </strong>
                            {task.title}
                        </p>
                        <p className="md:pb-1.5 pb-0">
                            <strong>Description:</strong>{" "}
                            {task.description || "Pas de description"}
                        </p>
                        <p className="md:pb-1.5 pb-0">
                            <strong>Statut: </strong>
                            {task.status}
                        </p>
                        <p className="md:pb-1.5 pb-0">
                            <strong>Priorité: </strong>
                            {task.priority}
                        </p>
                        <p className="md:pb-1.5 pb-0">
                            <strong>Étiquette: </strong>
                            {task.tags || "Pas d'étiquette"}
                        </p>
                        <p className="md:pb-1.5 pb-0">
                            <strong>Date début: </strong>{" "}
                            {task.startDate
                            ? format(new Date(task.startDate), "yyyy/MM/dd")
                            : "Non configurée"}
                        </p>
                        <p className="md:pb-1.5 pb-0">
                            <strong>Échéance: </strong>{" "}
                            {task.dueDate
                            ? format(new Date(task.dueDate), "yyyy/MM/dd")
                            : "Non configurée"}
                        </p>
                        <p className="md:pb-1.5 pb-0">
                            <strong>Auteur: </strong>
                            {task.author ? task.author.username : "Inconnu"}
                        </p>
                        <p className="md:pb-1.5 pb-0">
                            <strong>Attribution: </strong>
                            {task.assignee ? task.assignee.username : "Non attribuée"}
                        </p>
                    </div>
                </>
            ) : (
                <div className="flex flex-col pt-6">
                    <p className="pb-1.5">
                        <strong>ID: </strong>
                        {task.id}
                    </p>
                    <p className="pb-1.5">
                        <strong>Titre: </strong>
                        {task.title}
                    </p>
                    <p className="pb-1.5">
                        <strong>Description:</strong>{" "}
                        {task.description || "Pas de description"}
                    </p>
                    <p className="pb-1.5">
                        <strong>Statut: </strong>
                        {task.status}
                    </p>
                    <p className="pb-1.5">
                        <strong>Priorité: </strong>
                        {task.priority}
                    </p>
                    <p className="pb-1.5">
                        <strong>Étiquette: </strong>
                        {task.tags || "Pas d'étiquette"}
                    </p>
                    <p className="pb-1.5">
                        <strong>Date début: </strong>{" "}
                        {task.startDate
                        ? format(new Date(task.startDate), "yyyy/MM/dd")
                        : "Non configurée"}
                    </p>
                    <p className="pb-1.5">
                        <strong>Échéance: </strong>{" "}
                        {task.dueDate
                        ? format(new Date(task.dueDate), "yyyy/MM/dd")
                        : "Non configurée"}
                    </p>
                    <p className="pb-1.5">
                        <strong>Auteur: </strong>
                        {task.author ? task.author.username : "Inconnu"}
                    </p>
                    <p className="pb-1.5">
                        <strong>Attribution: </strong>
                        {task.assignee ? task.assignee.username : "Non attribuée"}
                    </p>
                </div>
            )}
        </div>
    );
}

export default TaskCard;