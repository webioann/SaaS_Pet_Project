import React from 'react'

export default function SingleUserPage({ params }: { params: { userId: number }}) {

    const uid = params.userId

    return (
        <h1>{uid}</h1>
    )
}
