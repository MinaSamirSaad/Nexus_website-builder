import BlurPage from '@/components/global/blur-page';
import InfoBar from '@/components/global/infobar';
import Sidebar from '@/components/sidebar';
import Unauthorized from '@/components/unauthorized';
import { getNotificationAndUser, verifyAndAcceptInvitation } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    children: React.ReactNode;
    params: { agencyId: string; };
}

export default async function layout({ children, params }: Props) {
    const agencyId = await verifyAndAcceptInvitation();
    const user = await currentUser();

    if (!user) return redirect('/');
    if (!agencyId) return redirect('/agency');

    if (user.privateMetadata.role !== 'AGENCY_ADMIN' && user.privateMetadata.role !== 'AGENCY_OWNER') return <Unauthorized />
    let allNotifications: any = [];
    const notifications = await getNotificationAndUser(agencyId);
    if (notifications) allNotifications = notifications;

    return <div className='h-screen overflow-hidden'>
        <Sidebar id={agencyId} type='agency' />
        <div className='md:pl-[350px]'>
            <InfoBar notifications={allNotifications} />
            <div className='relative'>
                <BlurPage>
                    {children}
                </BlurPage>
            </div>

        </div>
    </div>
}