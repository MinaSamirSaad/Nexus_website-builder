import { SubAccount, User } from '@prisma/client';
import React from 'react'

type Props = {
    type: 'agency' | 'subaccount';
    id: string | null;
    subAccounts?: SubAccount[];
    userData?: Partial<User>;
}

const UserDetails = (props: Props) => {
    return (
        <div>UserDetails</div>
    )
}

export default UserDetails