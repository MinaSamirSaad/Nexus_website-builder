'use client'

import { Agency, User } from "@prisma/client"
import { createContext, useState } from "react";

interface ModelProviderProps {
    children: React.ReactNode;
}

export type ModalData = {
    user?: User;
    agency?: Agency;    
}

export type ModalContextType = {
    data: ModalData;
    isOpen: boolean;
    setOpen: (modal: React.ReactNode, fetchData?: () =>Promise<any> ) => void;
    setClose: () => void;
}

export const ModalContext = createContext<ModalContextType>({
    data: {},
    isOpen: false,
    setOpen: () => {},
    setClose: () => {},
});

const ModalProvider = ({ children }: ModelProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<ModalData>({});
    const 
    // const [fetchData, setFetchData] = useState<() => Promise<any>>(() => Promise.resolve());

    // const setOpen = (modal: React.ReactNode, fetchData?: () => Promise<any>) => {
    //     setModal(modal);
    //     if(fetchData) setFetchData(fetchData);
    //     setIsOpen(true);
    // }

    // const setClose = () => {
    //     setModal(null);
    //     setIsOpen(false);
    // }

    return (
        <ModalContext.Provider value={{ data: {}, isOpen, setOpen, setClose }}>
            {children}
            {isOpen && modal}
        </ModalContext.Provider>
    )
}