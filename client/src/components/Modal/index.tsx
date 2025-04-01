import { useAppSelector } from '@/app/redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header';
import { SquareMinus } from 'lucide-react';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    name: string;
}

const Modal = ({
    children,
    isOpen,
    onClose,
    name}: Props) => {

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    if (!isOpen) return null;


    return ReactDOM.createPortal(
        <div
            className='fixed inset-0 z-100 flex h-full w-full items-center
            justify-center overflow-y-auto p-4'
        >
            <div className={`
                w-full max-w-2xl rounded-lg shadow-lg
                ${isDarkMode ? "bg-gray-900" : "bg-gray-200" }
            `}>
                <Header
                    name={ name }
                    buttonComponent={
                        <button
                            className={`
                                flex h-7 w-7 items-center justify-center rounded-full
                                text-white hover:bg-purple-700 transform cursor-pointer
                                ${isDarkMode ? "bg-purple-900" : "bg-purple-800" }
                            `}
                            onClick={ onClose }
                        >
                            <SquareMinus size={ 18 } />
                        </button>
                    }
                    isSmallText
                />
                { children }
            </div>
        </div>,
        document.body,
    );
}

export default Modal;