"use client";

import { useSearchQuery } from '@/state/api';
import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import Header from '@/components/Header';
import { useAppSelector } from '../redux';
import TaskCard from '@/components/TaskCard';
import ProjectCard from '@/components/ProjectCard';
import UserCard from '@/components/UserCard';

const Search = () => {
    const [ searchTerm, setSearchTerm ] = useState("");
    const { data: searchResults, isLoading, isError } = useSearchQuery(searchTerm, {
        skip: searchTerm.length < 3
    });

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const handleSearch = debounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value)
        },
        500,
    );

    useEffect(() => {
        return handleSearch.cancel
    }, [ handleSearch.cancel ])

    return (
        <div className='p-8'>
            <Header name="Recherche"/>
            <div>
                <input
                    type="text"
                    placeholder="Recherche..."
                    className={`
                        w-1/2 rounded border p-3 shadow
                        ${isDarkMode ? "!text-white" : "!text-black" }
                    `}
                    onChange={ handleSearch }
                />
            </div>
            <div className='mt-15'>
                { isLoading && <p className="p-8">Chargement...</p>}
                { isError && <p>Une erreur est survenue lors de la recherche de résultats</p>}
                { !isLoading && !isError && searchResults && (
                    <div>
                        { searchResults.tasks && searchResults.tasks?.length > 0 && (
                            <h2>Tâches: </h2>
                        )}
                        { searchResults.tasks?.map(( task ) => (
                            <TaskCard key={ task.id } task={ task } />
                        ))}

                        { searchResults.projects && searchResults.projects?.length > 0 && (
                            <h2>Projets: </h2>
                        )}
                        { searchResults.projects?.map(( project ) => (
                            <ProjectCard key={ project.id } project={ project } />
                        ))}

                        { searchResults.users && searchResults.users?.length > 0 && (
                            <h2>Utilisateurs: </h2>
                        )}
                        { searchResults.users?.map(( user ) => (
                            <UserCard key={ user.userId } user={ user } />
                        ))}

                    </div>
                )}
            </div>
        </div>
    )
}


export default Search;