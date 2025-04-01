'use client'
import { AgencySidebarOption, SubAccountSidebarOption } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { CommandItem } from '../ui/command';

const MenuLink = ({ opt, val }: { opt: AgencySidebarOption | SubAccountSidebarOption, val: React.JSX.Element | undefined }) => {
    const [mounted, setMounted] = React.useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    const isActiveClassName = pathname === opt.link && "bg-primary data-[selected='true']:bg-primary text-white data-[selected=true]:text-white font-bold";
    return (
        <CommandItem className={twMerge('md:w-[320px] w-full', isActiveClassName)}>
            <Link href={opt.link} className='flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px] active:bg-transparent'>
                {val}
                <span>{opt.name}</span>
            </Link>
        </CommandItem>
    );
};
export default MenuLink;