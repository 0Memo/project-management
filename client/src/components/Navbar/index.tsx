import React from 'react';
import { SquareMenu, Moon, Settings, SunMedium, TextSearch } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';

const Navbar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    return (
        <div className={`
                flex h-[56px] px-4 py-3 items-center justify-between
                ${isDarkMode ? 'bg-black text-gray-200' : 'bg-white border-2 border-gray-50 border-b-gray-100 text-gray-900'}
            `}
        >
            {/** Search Bar */}
            <div className="flex items-center gap-8">
                { !isSidebarCollapsed ? null : (
                    <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                        <SquareMenu className={`h-8 w-8 transform cursor-pointer ${isDarkMode ? 'text-gray-200' : ' text-gray-900'}`} />
                    </button>
                ) }
                <div className="relative flex h-min w-[200px]">
                    <TextSearch className={`
                        absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer
                        ${isDarkMode ? 'text-gray-200' : ' text-gray-900'}`}
                    />
                    <input
                        className={`
                            w-full p-2 pl-8 rounded border-none focus:outline-none focus:border-transparent
                            ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 placeholder-gray-900 outline-2 outline-gray-900'}
                        `}
                        type="search"
                        placeholder="Rechercher..."
                    />
                </div>
            </div>

            {/** Icons */}
            <div className="flex items-center">
                <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                    className={
                        isDarkMode
                            ? `rounded p-2 dark:hover:bg-gray-700`
                            : `rounded p-2 hover:bg-gray-100`
                    }
                >
                    {isDarkMode ? (
                        <SunMedium className={`h-6 w-6 cursor-pointer ${isDarkMode ? 'text-white' : ''}`} />
                    ): (
                        <Moon className={`h6- w-6 cursor-pointer ${isDarkMode ? '' : 'bg-gray-50 text-black'}`} />
                    )}
                </button>
                <Link
                    href="/settings"
                    className={
                        isDarkMode
                            ? `h-min w-min rounded p-2 dark:hover:bg-gray-700`
                            : `h-min w-min rounded p-2 hover:bg-gray-100`
                    }
                >
                    <Settings
                        className={`h-6 w-6 cursor-pointer ${isDarkMode ? 'text-white' : 'bg-gray-50 text-black'}`}
                    />
                </Link>
                <div className={`ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] md:inline-block ${isDarkMode ? 'bg-gray-200' : 'bg-black'}`}></div>
            </div>
        </div>
    )
}

export default Navbar