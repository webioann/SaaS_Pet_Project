import React from 'react'
import Link from 'next/link'
import { fetchAllUsers } from '../../lib/fetchAllUsers'
import type { IUser } from "../../types/user.types"

export default async function User() {

    const data: Promise<IUser[]> = fetchAllUsers()
    const usersList = await data

    return (
        <section>
            <ul>
                {usersList.map(user => (
                    <Link href={`/users/${user.id}`}>
                        <li key={user.id}>{user.name}</li>
                    </Link>
                ))}
            </ul>
        </section>
    )
};
