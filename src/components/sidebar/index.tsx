import { getAuthUserDetails } from '@/lib/queries';
import React from 'react'
import MenuOptions from './menu-options';

interface Props {
    id: string;
    type: 'agency' | 'subaccount';
}

export default async function Sidebar({ id, type }: Props) {
    // check if user is logged in
    const user = await getAuthUserDetails();
    if (!user) return null;

    // check if user have agency
    if (!user.Agency) return null;

    // check if user have subaccount and get details
    const details = type === 'agency' ? user.Agency : user.Agency.SubAccount.find(sub => sub.id === id);

    // check is White label agency
    const isWhiteLabelAgency = user.Agency.whiteLabel;

    if (!details) return;

    let sideBarLogo = user.Agency.agencyLogo || "/assets/plura-logo.svg"

    if (!isWhiteLabelAgency) {
        if (type === 'subaccount') {
            sideBarLogo = user.Agency.SubAccount.find(sub => sub.id === id)?.subAccountLogo || user.Agency.agencyLogo;
        }
    }

    const sidebarOpt = type === 'agency' ? user.Agency.SidebarOption || [] : user.Agency.SubAccount.find(sub => sub.id === id)?.SidebarOption || [];
    const subAccounts = user.Agency.SubAccount.filter(
        (subAccount) => user.Permissions.find(
            (permission) => permission.subAccountId === subAccount.id && permission.access
        ));

    return (
        <>
            <MenuOptions
                details={details}
                id={id}
                sideBarLogo={sideBarLogo}
                sidebarOpt={sidebarOpt}
                subAccounts={subAccounts}
                user={user}
                defaultOpen={true}
            />
            <MenuOptions
                details={details}
                id={id}
                sideBarLogo={sideBarLogo}
                sidebarOpt={sidebarOpt}
                subAccounts={subAccounts}
                user={user}
            />
        </>
    )
}