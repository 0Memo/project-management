"use client";
import Header from '@/components/Header';
import React from 'react';
import { useAppSelector } from '../redux';

const Settings = () => {
    const userSettings = {
        username: "johndoe",
        email: "john.doe@example.com",
        teamName: "Développement",
        roleName: "Développeur"
    }

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const labelStyles = `
        block text-sm font-medium
        ${isDarkMode ? "text-white" : "text-gray-900"}
    `

    const textStyles = `
        mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2
        ${isDarkMode ? "text-white" : "text-gray-900" }
    `

    return (
        <div
            className="p-8"
        >
            <Header name="Paramètres" />
            <div className='space-y-4'>
                <div>
                    <label className={ labelStyles }>Nom d&apos;utilisateur</label>
                    <div className={ textStyles }>{ userSettings.username }</div>
                </div>
                <div>
                    <label className={ labelStyles }>E-mail</label>
                    <div className={ textStyles }>{ userSettings.email }</div>
                </div>
                <div>
                    <label className={ labelStyles }>Équipe</label>
                    <div className={ textStyles }>{ userSettings.teamName }</div>
                </div>
                <div>
                    <label className={ labelStyles }>Rôle</label>
                    <div className={ textStyles }>{ userSettings.roleName }</div>
                </div>
            </div>
        </div>
    )
}

export default Settings;