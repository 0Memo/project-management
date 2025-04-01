import { useAppSelector } from '@/app/redux';
import Modal from '@/components/Modal';
import { useCreateProjectMutation } from '@/state/api';
import React, { useState } from 'react';
import { formatISO } from 'date-fns';

type ModalNewProjectProps = {
    isOpen: boolean;
    onClose: () => void;
}

const ModalNewProject = ({ isOpen, onClose }: ModalNewProjectProps) => {
    const [ createProject, { isLoading } ] = useCreateProjectMutation();
    const [ projectName, setProjectName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ startDate, setStartDate ] = useState("");
    const [ endDate, setEndDate ] = useState("");

    const handleSubmit = async () => {
        if ( !projectName || !startDate || !endDate ) return;

        const formattedStartDate = formatISO( new Date(startDate), { representation: 'complete' });
        const formattedEndDate = formatISO( new Date(endDate), { representation: 'complete' });

        await createProject({
            name: projectName,
            description,
            startDate: formattedStartDate,
            endDate: formattedEndDate
        });
    };

    const isFormValid = () => {
        return projectName && description && startDate && endDate;
    };
    
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const inputStyles = `w-[93%] md:w-[95%] rounded border border-gray-300 m-4 h-10 shadow-sm p-2
        ${isDarkMode ? "text-white bg-gray-900 focus:outline-none" : "bg-gray-200 text-gray-900" }
    `
    console.log('createProject', createProject);

    return (
        <Modal
            isOpen={ isOpen }
            onClose={ onClose }
            name="Créer un nouveau projet"
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
                    placeholder="Nom du project"
                    value={ projectName }
                    onChange={ (e) => setProjectName( e.target.value )}
                />
                <textarea
                    className={ inputStyles }
                    placeholder="Description"
                    value={ description }
                    onChange={ (e) => setDescription( e.target.value )}
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
                        value={ endDate }
                        onChange={ (e) => setEndDate( e.target.value )}
                    />
                </div>
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
                        { isLoading ? "Création en cours..." : "Créer projet" }
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNewProject;