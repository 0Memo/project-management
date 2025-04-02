"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { AlertCircle, AlertOctagon, AlertTriangle, ChevronDown, ChevronUp, FileClock, FolderOpenDot, History, HousePlus, GlobeLock, LucideIcon, Settings, ShieldAlert, SquareMinus, TextSearch, User, UserRound, UsersRound } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Link from "next/link";
import { useGetProjectsQuery } from '@/state/api';
import { useGetAuthUserQuery } from '@/state/api';
import { signOut } from "aws-amplify/auth";

const Sidebar = () => {
    const [showProjects, setShowProjects] = useState(true);
    const [showPriority, setShowPriority] = useState(true);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const { data: projects } = useGetProjectsQuery();
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed,
    );

    const { data: currentUser } = useGetAuthUserQuery({});
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error: any) {
            console.error("Erreur lors de la déconnexion: ", error);
        }
    }

    if (!currentUser) return null;
    const currentUserDetails = currentUser?.userDetails;

    const sidebarClassNames=`fixed flex flex-col h-[100%] overflow-x-hidden justify-between shadow-xl transition-all duration-300 h-full z-40 overflow-y-auto
        ${isSidebarCollapsed ? 'w-0 hidden' : 'w-64'}
        ${isDarkMode ? 'bg-black text-white': 'bg-white text-gray-700'}`;
    

    return (
        <div className={sidebarClassNames}>
            <div className="flex h-[100%] w-full flex-col justify-start">
                {/** Top logo */}
                <div className={`z-50 flex min-h-[56px] w-64 items-center justify-between px-6 pt-3 ${isDarkMode ? 'bg-black' : 'bg-white' }`}>
                    <div className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        LISTE
                    </div>
                    {isSidebarCollapsed ? null : (
                        <button
                            className='py-3'
                            onClick={() => {dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}}
                        >
                            <SquareMinus
                                className={`h-6 w-6 transform cursor-pointer ${isDarkMode ? 'text-gray-200 hover:text-gray-50' : 'text-gray-900 hover:text-gray-500'}`}
                            />
                        </button>
                    )}
                </div>
                {/** Team */}
                <div className={`flex items-center gap-5 border-y-[1.5px] px-8 py-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-400' }`}>
                    <Image src="https://pm-s3-images-memo.s3.us-east-1.amazonaws.com/colombia.png" alt="logo" width={40} height={40} priority={false} />
                    <div>
                        <h3 className={`text-md font-bold tracking-wide ${isDarkMode ? 'text-gray-200' : 'text-gray-900' }`}>
                            ÉQUIPE MEMO
                        </h3>
                        <div className="mt-1 flex items-start gap-2">
                            <GlobeLock className={`mt-[0.1rem] h-5 w-5 ${isDarkMode ? 'text-gray-200' : 'text-gray-500'}`}/>
                            <p className={`text-md ${isDarkMode ? 'text-gray-200' : 'text-gray-500'}`}>Privé</p>
                        </div>
                    </div>
                </div>
                {/** Navbar links */}
                
                <nav className="z-10 w-full">
                    <SidebarLink icon={HousePlus} label="Accueil" href="/" />
                    <SidebarLink icon={History} label="Chronologie" href="/timeline" />
                    <SidebarLink icon={TextSearch} label="Rechercher" href="/search" />
                    <SidebarLink icon={Settings} label="Paramètres" href="/settings" />
                    <SidebarLink icon={UserRound} label="Utilisateurs" href="/users" />
                    <SidebarLink icon={UsersRound} label="Équipes" href="/teams" />
                </nav>

                {/** Projects links */}
                <button
                    onClick={() => setShowProjects((prev) => !prev)}
                    className={`flex w-full items-center justify-between px-8 py-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}
                >
                    <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Projets</span>
                    {showProjects ? (
                        <ChevronUp className='h-5 w-5' />
                    ) : (
                        <ChevronDown className='h-5 w-5' />
                    )}
                </button>
                    {/** Projects list */}
                    {showProjects &&
                        projects?.map((project) => (
                            <SidebarLink
                                key={project.id}
                                icon={FolderOpenDot}
                                label={project.name}
                                href={`/projects/${project.id}`}
                            />
                    ))}
                
                {/** Priorities links */}
                <button
                    onClick={() => setShowPriority((prev) => !prev)}
                    className={`flex w-full items-center justify-between px-8 py-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}
                >
                    <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Priorité</span>
                    {showPriority ? (
                        <ChevronUp className='h-5 w-5' />
                    ) : (
                        <ChevronDown className='h-5 w-5' />
                    )}
                </button>

                {showPriority && (
                    <>
                        <SidebarLink icon={ShieldAlert} label="Urgent" href="/priority/urgent" />
                        <SidebarLink icon={AlertTriangle} label="Haute" href="/priority/high" />
                        <SidebarLink icon={AlertOctagon} label="Moyenne" href="/priority/medium" />
                        <SidebarLink icon={AlertCircle} label="Basse" href="/priority/low" />
                        <SidebarLink icon={FileClock} label="Tâches" href="/priority/backlog" />
                    </>
                )}
            </div>
            <div
                className={`z-10 mt-32 flex w-full flex-col
                    items-center gap-4 px-8 py-4 md:hidden
                    ${isDarkMode ? "bg-gray-900" : "bg-gray-200" }
                `}
            >
                <div className="flex w-full items-center">
                    <div className="align-center flex h-9 w-9 justify-center">
                        { !!currentUserDetails?.profilePictureUrl ? (
                            <Image
                                src={`https://pm-s3-images-memo.s3.us-east-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                                alt={currentUserDetails?.username || "Image de profil"}
                                width={100}
                                height={50}
                                className='h-full rounded-full object-cover'
                            />
                        ) : (
                            <User
                                className={`
                                    h6 w-6 cursor-pointer self-center rounded-full
                                    ${isDarkMode ? "text-white" : "text-gray-900" }
                                `}
                            />
                        )}
                    </div>
                    <span
                        className={`
                            mx-3
                            ${isDarkMode ? "text-white" : "text-gray-900" }
                        `}
                    >
                        { currentUserDetails?.username}
                    </span>
                    <button
                        className={`self-start rounded px-4 py-2 text-xs font-bold md:block text-white border-2 border-transparent transform
                        cursor-pointer
                            ${isDarkMode ? "bg-purple-900 hover:bg-white hover:text-purple-900 hover:border-purple-900" : "bg-purple-800 hover:bg-white hover:text-purple-800 hover:border-purple-800" }
                        `}
                        onClick={ handleSignOut }
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
};

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

const SidebarLink = ({ href, icon: Icon, label } : SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive =
        pathname === href || (pathname === "/" && href === "/dashboard");

    const isDarkMode =
        useAppSelector((state) => state.global.isDarkMode);

    return (
        <Link href={href} className="w-full">
            <div
            className={`group relative flex cursor-pointer items-center justify-start gap-3 px-8 py-3 transition-colors ${isDarkMode ? "bg-gray-900 hover:bg-purple-900" : ""} ${!isDarkMode && !isActive ? "bg-gray-200 hover:bg-purple-800" : ""} ${!isDarkMode && isActive ? "bg-gray-500 hover:bg-purple-800" : ""} ${isDarkMode && isActive ? "bg-white text-gray-900 hover:text-gray-200" : ""} `}
            >
            {/* Icon - Handles both inactive and active states correctly */}
            <Icon
                className={`h-6 w-6 transition-colors ${isDarkMode && !isActive ? "text-white" : ""} ${!isDarkMode && isActive ? "text-white" : "text-gray-900"} group-hover:text-white`}
            />

            {/* Text - Handles inactive, active, and hover states correctly */}
            <span
                className={`font-medium transition-colors ${isDarkMode && !isActive ? "text-white" : ""} ${!isDarkMode && isActive ? "text-white" : "text-gray-900"} group-hover:text-white`}
            >
                {label}
            </span>
            </div>
        </Link>
    );
}

export default Sidebar;