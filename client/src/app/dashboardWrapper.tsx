"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({ children } : { children: React.ReactNode}) => {
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    console.log('isSidebarCollapsed', isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div
            className={`flex min-h-screen w-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-900' }`}
        >
            <Sidebar />
            <main
                className={`flex w-full flex-col ${isSidebarCollapsed ? "" : "md:pl-64" }`}
            >
                <Navbar />
                {children}
            </main>
        </div>
    )
}

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <DashboardLayout>{ children }</DashboardLayout>
        </StoreProvider>
    );
};

export default DashboardWrapper;