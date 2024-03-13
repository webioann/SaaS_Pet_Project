import React from 'react'
import Link from 'next/link'
import { fetchUsersList } from '../../lib/fetchUsersList'
import type { IUser } from "../../types/user.types"
import styles from './user.module.scss'

export default async function User() {

    const data: Promise<IUser[]> = fetchUsersList()
    const usersList = await data

    return (
        <section>
            <ul>
                {usersList.map(user => (
                    <Link href={`/users/${user.id}`} className={styles.user_link}>
                        <li key={user.id}>{user.name}</li>
                    </Link>
                ))}
            </ul>
        </section>
    )
};
