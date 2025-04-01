import { useAppSelector } from '@/app/redux';
import Modal from '@/components/Modal';
import { Priority, Status, useCreateTaskMutation } from '@/state/api';
import React, { useState } from 'react';
import { formatISO } from 'date-fns';
import Select from "react-select";

type ModalNewTaskProps = {
    isOpen: boolean;
    onClose: () => void;
    id?: string | null;
}

const ModalNewTask = ({ isOpen, onClose, id = null }: ModalNewTaskProps) => {
    const [ createTask, { isLoading } ] = useCreateTaskMutation();
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ status, setStatus ] = useState<Status>(Status.ToDo);
    const [ priority, setPriority ] = useState<Priority>(Priority.Backlog);
    const [ tags, setTags ] = useState("");
    const [ startDate, setStartDate ] = useState("");
    const [ dueDate, setDueDate ] = useState("");
    const [ authorUserId, setAuthorUserId ] = useState("");
    const [ assignedUserId, setAssignedUserId ] = useState("");
    const [ projectId, setProjectId ] = useState("");

    const handleSubmit = async () => {
        if ( !title || !authorUserId || !(id !== null || projectId) ) return;

        const formattedStartDate = formatISO( new Date(startDate), { representation: 'complete' });
        const formattedDueDate = formatISO( new Date(dueDate), { representation: 'complete' });

        await createTask({
            title,
            description,
            status,
            priority,
            tags,
            startDate: formattedStartDate,
            dueDate: formattedDueDate,
            authorUserId: parseInt(authorUserId),
            assignedUserId: parseInt(assignedUserId),
            projectId: id !== null ? Number(id) : Number(projectId),
        });
    };

    const isFormValid = () => {
        return title && authorUserId && !(id !== null || projectId);
    };

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const selectStyles = `
        mb-4 block w-[93%] sm:w-[95%] rounded border border-gray-300 px-3 py-2 ml-4
        ${isDarkMode ? "bg-gray-900 text-white focus:outline-none hover:bg-purple-900" : "bg-gray-200 hover:bg-purple-800 hover:text-white" }
    `

    console.log('selectStyles', selectStyles);

    const inputStyles = `w-[93%] md:w-[95%] rounded border border-gray-300 m-4 h-10 shadow-sm p-2
        ${isDarkMode ? "text-white bg-gray-900 focus:outline-none" : "bg-gray-200 text-gray-900" }
    `
    console.log('createProject', createTask);

    const statusOptions = [
        { value: Status.ToDo, label: "À faire" },
        { value: Status.WorkInProgress, label: "En cours" },
        { value: Status.UnderReview, label: "À l'étude" },
        { value: Status.Completed, label: "Terminé" },
    ];

    const statusPriorities = [
        { value: Priority.Urgent, label: "Urgent" },
        { value: Priority.High, label: "Haute" },
        { value: Priority.Medium, label: "Moyenne" },
        { value: Priority.Low, label: "Basse" },
        { value: Priority.Backlog, label: "Retard" },
    ];

    return (
        <Modal
            isOpen={ isOpen }
            onClose={ onClose }
            name="Créer une nouvelle tâche"
        >
            <form
                className='mt-4 space-y-6'
                onSubmit={ (e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <input
                    type="text"
                    className={ inputStyles }
                    placeholder="Titre"
                    value={ title }
                    onChange={ (e) => setTitle( e.target.value )}
                />
                <textarea
                    className={ inputStyles }
                    placeholder="Description"
                    value={ description }
                    onChange={ (e) => setDescription( e.target.value )}
                />
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:w-[575px]'>
                    <Select
                        className="w-[93%] sm:w-[95%] ml-4"
                        value={statusOptions.find(option => option.value === status)}
                        onChange={(selectedOption) => setStatus(selectedOption?.value || Status.ToDo)}
                        options={statusOptions}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                backgroundColor: isDarkMode ? "#101828" : "#E5E7EB",
                                borderColor: isDarkMode ? "white" : "#D1D5DC",
                                borderWidth: isDarkMode ? "1px" : "2px",
                                boxShadow: state.isFocused ? "none" : provided.boxShadow,
                                "&:hover": {
                                    borderColor: isDarkMode ? "white" : "#D1D5DC",
                                },
                                color: isDarkMode ? "##E5E7EB" : "#101828",
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: isDarkMode ? "white" : "black",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? "#6E11B0" : "inherit",
                                color: state.isFocused ? "white" : isDarkMode ? "white" : "black",
                            }),
                            menu: (provided) => ({
                                ...provided,
                                backgroundColor: isDarkMode ? "#101828" : "#E5E7EB",
                            }),
                        }}
                    />
                    <Select
                        className="w-[93%] sm:w-[95%] ml-4"
                        value={statusPriorities.find(option => option.value === priority)}
                        onChange={(selectedOption) => setPriority(selectedOption?.value || Priority.Backlog)}
                        options={statusPriorities}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                backgroundColor: isDarkMode ? "#101828" : "#E5E7EB",
                                borderColor: isDarkMode ? "white" : "#D1D5DC",
                                borderWidth: isDarkMode ? "1px" : "2px",
                                boxShadow: state.isFocused ? "none" : provided.boxShadow,
                                "&:hover": {
                                    borderColor: isDarkMode ? "white" : "#D1D5DC",
                                },
                                color: isDarkMode ? "##E5E7EB" : "#101828",
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: isDarkMode ? "white" : "black",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? "#6E11B0" : "inherit",
                                color: state.isFocused ? "white" : isDarkMode ? "white" : "black",
                            }),
                            menu: (provided) => ({
                                ...provided,
                                backgroundColor: isDarkMode ? "#101828" : "#E5E7EB",
                            }),
                        }}
                    />
                </div>
                <input
                    type="text"
                    className={ inputStyles }
                    placeholder="Étiquettes (séparation par virgule)"
                    value={ tags }
                    onChange={ (e) => setTags( e.target.value )}
                />
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:w-[575px]'>
                    <input
                        type="date"
                        className={`
                            ${inputStyles}
                            ${isDarkMode ? "custom-date-input-dark" : "custom-date-input-light"}
                        `}
                        value={ startDate }
                        onChange={ (e) => setStartDate( e.target.value )}
                    />
                    <input
                        type="date"
                        className={`
                            ${inputStyles}
                            ${isDarkMode ? "custom-date-input-dark" : "custom-date-input-light"}
                        `}
                        value={ dueDate }
                        onChange={ (e) => setDueDate( e.target.value )}
                    />
                </div>
                <input
                    type="text"
                    className={ inputStyles }
                    placeholder="Auteur"
                    value={ authorUserId }
                    onChange={ (e) => setAuthorUserId( e.target.value )}
                />
                <input
                    type="text"
                    className={ inputStyles }
                    placeholder="Attribué"
                    value={ assignedUserId }
                    onChange={ (e) => setAssignedUserId( e.target.value )}
                />
                {id === null && (
                    <input
                        type="text"
                        className={ inputStyles }
                        placeholder="ID projet"
                        value={ projectId }
                        onChange={ (e) => setProjectId( e.target.value )}
                    />
                )}
                <div className='flex justify-center'>
                    <button
                        type='submit'
                        className={`
                            flex justify-center rounded-md border
                            border-transparent px-4 py-2 text-base font-medium
                            text-white shadow-sm hover:bg-purple-700
                            focus:outline-none focus:ring-2 focus:ring-purple-700
                            focus-offset-2 w-full
                            ${isDarkMode ? "bg-purple-900" : "bg-purple-800" }
                            ${ !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : "" }
                        `}
                        disabled={ !isFormValid() }
                    >
                        { isLoading ? "Création en cours..." : "Créer tâche" }
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNewTask;