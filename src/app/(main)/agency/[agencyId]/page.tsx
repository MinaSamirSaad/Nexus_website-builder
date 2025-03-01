import React from 'react'

const AgencyId = ({ params }: { params: { agencyId: string } }) => {
    return (
        <div>{params.agencyId}</div>
    )
}

export default AgencyId