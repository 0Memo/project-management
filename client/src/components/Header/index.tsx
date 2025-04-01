/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/app/redux';
import React from 'react'

type Props = {
    name: string;
    buttonComponent?: any;
    isSmallText?: boolean;
}

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    return (
        <div className='m-5 mb-10 flex items-center justify-between'>
            <h1
                className={`
                    font-semibold
                    ${isSmallText ? "text-lg" : "text-2xl"}
                    ${isDarkMode ? "text-gray-200" : "text-gray-900"}
                `}
            >
                { name }
            </h1>
            { buttonComponent }
        </div>
    )
}

export default Header