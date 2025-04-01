"use client";

import React from 'react';
import { useAppSelector } from '../redux';
import { useGetTeamsQuery } from '@/state/api';
import Header from '@/components/Header';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

const CustomToolbar = () => (
    <GridToolbarContainer className="toolbar flex gap-2">
        <GridToolbarFilterButton />
        <GridToolbarExport />
    </GridToolbarContainer>
);

const columns: GridColDef[] = [
    { field: "id", headerName:"ID équipe", width: 100 },
    { field: "teamName", headerName:"Équipe", width: 200 },
    { field: "productOwnerUsername", headerName:"Product Owner", width: 200 },
    { field: "projectManagerUsername", headerName:"Manager", width: 200 },
]

const Teams = () => {
    const { data: teams, isLoading, isError } = useGetTeamsQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    console.log('isDarkMode', isDarkMode);

    if ( isLoading ) return <div className="p-8">Chargement...</div>
    if ( isError || !teams) return ( <div className='p-8'>Une erreur est survenue lors de la récupération des équipes</div> );

    return (
        <div
            className='flex w-full flex-col p-8'
        >
            <Header name="Équipes" />
            <div style={{ height: 650, width: "100%" }}>
                <DataGrid
                    rows={ teams || [] }
                    columns={ columns }
                    pagination
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    className={ dataGridClassNames(isDarkMode) }
                    sx={ dataGridSxStyles(isDarkMode) }
                />
            </div>
        </div>
    )
}

export default Teams;