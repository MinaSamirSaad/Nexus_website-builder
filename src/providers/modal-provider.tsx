'use client'

import { TicketDetails } from "@/lib/types";
import { Agency, Contact, User } from "@prisma/client"
import { createContext, useContext, useEffect, useState } from "react";

interface ModelProviderProps {
    children: React.ReactNode;
}

export type ModalData = {
    user?: User;
    agency?: Agency;
    ticket?: TicketDetails[0];
    contact?: Contact;
}

export type ModalContextType = {
    data: ModalData;
    isOpen: boolean;
    setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void;
    setClose: () => void;
}

export const ModalContext = createContext<ModalContextType>({
    data: {},
    isOpen: false,
    setOpen: (modal: React.ReactNode, fetch?: () => Promise<any>) => { },
    setClose: () => { },
});

const ModalProvider: React.FC<ModelProviderProps> = ({ children }: ModelProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<ModalData>({});
    const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    const setOpen = async (modal: React.ReactNode, fetchData?: () => Promise<any>) => {
        if (modal) {
            if (fetchData) {
                setData({ ...data, ...(await fetchData()) });
            }
            setShowingModal(modal);
            setIsOpen(true);
        }
    }

    const setClose = () => {
        setIsOpen(false);
        setData({});
    }

    if (!isMounted) return null;
    return (
        <ModalContext.Provider value={{ data, isOpen, setOpen, setClose }}>
            {children}
            {showingModal}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}

export default ModalProvider;
