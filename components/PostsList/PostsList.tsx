import React from 'react'
import style from './posts.module.scss'
import type { IPost } from '../../types/post.types'

type Props = {
    data: Promise<IPost[]>
} 

export default async function PostsList({ data }: Props) {

    const posts = await data

    return (
        <main>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
};
